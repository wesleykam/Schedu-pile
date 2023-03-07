const Group = require('../models/groupModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const passport = require('passport');
const { calendar } = require('googleapis/build/src/apis/calendar');
const config = require('../config');
const { google } = require('googleapis');

const getGroup = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such group' });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: 'No such group' });
  }

  res.status(200).json(group);
};

const createGroup = async (req, res) => {
  const groupName = req.body.groupName;
  const email = req.body.email;
  const username = req.body.username;
  const googleId = req.body.googleId;

  // add to the database
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }

    const group = await Group.create({
      name: groupName,
      groupMembers: [[googleId, username, email]],
      calendarEvents: [],
      admin: googleId,
    });

    user.groupIds.push(group._id);
    user.save();

    group.calendarEvents = await updateGroupEventsHelper(group.groupMembers);
    group.save();

    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete group and remove group from all members
const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' });
  }

  const user = await User.findOne({ googleId: userId });

  const group = await Group.findOne({ _id: id });

  if (user.googleId !== group.admin) {
    return res.status(400).json({ error: 'Not admin' });
  }

  for (let i = 0; i < group.groupMembers.length; i++) {
    let user = await User.findOne({ email: group.groupMembers[i][2] });

    user.groupIds.splice(user.groupIds.indexOf(id), 1);
    user.save();
  }

  if (!group) {
    return res.status(400).json({ error: 'No such group' });
  }

  await Group.deleteOne({ _id: id });

  res.status(200).json(group);
};

// Functionality: Add member to group and add group to member
const updateGroup = async (req, res) => {
  const { id } = req.params;
  const email = req.body.email;
  const googleId = req.body.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' });
  }

  let group = await Group.findOne({ _id: id });

  if (googleId !== group.admin) {
    return res.status(400).json({ error: 'Not admin' });
  }

  let user = await User.findOneAndUpdate(
    { email: email },
    { $addToSet: { groupIds: id } },
    { new: true }
  );

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  const userId = user.googleId;

  if (!group) {
    return res.status(400).json({ error: 'No such group' });
  }

  if (!group.groupMembers.some((member) => member[0] === userId)) {
    const newMemberEvents = await addGroupEventsHelper(userId);
    if (newMemberEvents) {
      group.calendarEvents = [...group.calendarEvents, ...newMemberEvents];
    }
  }

  const uniqueValues = [];
  group.groupMembers.push([user.googleId, user.name, email]);
  group.groupMembers = group.groupMembers.filter((element) => {
    if (uniqueValues.some((value) => value === element[0])) {
      return false;
    } else {
      uniqueValues.push(element[0]);
      return true;
    }
  });

  group.save();

  res.status(200).json(group);
};

const updateGroupDeleteMember = async (req, res) => {
  const { id } = req.params;
  const email = req.body.email;
  const googleId = req.body.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' });
  }
  let group = await Group.findOne({ _id: id });

  if (googleId !== group.admin) {
    return res.status(400).json({ error: 'Not admin' });
  }

  let user = await User.findOne({ email: email });

  if (user.googleId === group.admin) {
    return res.status(400).json({ error: 'Cannot delete admin' });
  }

  const userId = user.googleId;

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  //delete groupId from specific user
  let index = user.groupIds.indexOf(id);
  user.groupIds.splice(index, 1);
  user.save();

  if (!group) {
    return res.status(400).json({ error: 'No such group' });
  }

  //delete email of that person from groupMembers
  for (let i = 0; i < group.groupMembers.length; i++) {
    if (group.groupMembers[i][2] === email) {
      group.groupMembers.splice(i, 1);
    }
  }

  console.log(group.calendarEvents);

  group.calendarEvents = group.calendarEvents.filter((event) => {
    console.log(event[4]);
    console.log(userId);
    return event[4] !== userId;
  });

  console.log('after filter: ', group.calendarEvents);

  group.save();

  res.status(200).json(group.calendarEvents);
};

const getGroupEvents = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such group' });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: 'No such group' });
  }

  const groupEvents = group.calendarEvents;

  res.status(200).json(groupEvents);
};

// May be deprecated
const updateGroupEvents = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such group' });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: 'No such group' });
  }
  const updatedEvents = await updateGroupEventsHelper(group.groupMembers);

  const userEventsResponse = await Group.findOneAndUpdate(
    { groupId: id },
    {
      calendarEvents: updatedEvents,
    }
  );

  res.status(200).json({
    message: 'Group Events successfully updated',
    calendarEvents: updatedEvents,
  });
};

const updateGroupMemberEvents = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such group' });
  }

  let user = await User.findOne({ googleId: userId });

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  let group = await Group.findOne({ _id: id });

  if (!group) {
    return res.status(400).json({ error: 'No such group' });
  }

  group.calendarEvents = group.calendarEvents.filter((event) => {
    return event[4] !== userId;
  });

  const credentials = {
    type: 'authorized_user',
    client_id: config.googleClientID,
    client_secret: config.googleClientSecret,
    refresh_token: user.refreshToken,
  };

  auth = google.auth.fromJSON(credentials);

  const calendar = google.calendar({ version: 'v3', auth });

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = response.data.items;
  let userEvents = [];
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
  } else {
    console.log('Upcoming 10 events:');
    events.map((event, i) => {
      var options = { hour12: false };

      const start = event.start.dateTime || event.start.date;
      const end = event.end.dateTime;

      if (!start.includes('T')) {
        return;
      }

      if (end)
        userEvents.push([
          event.summary,
          start.substring(0, start.lastIndexOf('-')),
          end.substring(0, end.lastIndexOf('-')),
          user.name,
          user.googleId,
        ]);
    });
  }

  user.events = userEvents;
  console.log(userEvents);

  if (group.groupMembers.some((member) => member[0] === userId)) {
    if (userEvents) {
      group.calendarEvents = [...group.calendarEvents, ...userEvents];
    }
  }

  group.save();

  res.status(200).json(group.calendarEvents);
};

const getFreeTime = async (req, res) => {
  const { id } = req.params;
  const {
    startDateStr,
    endDateStr,
    startTimeStr,
    endTimeStr,
    duration,
    hideId,
  } = req.body;

  // Create an array of all the start and end times of the events within the date range

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such group' });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: 'No such group' });
  }

  let events = group.calendarEvents;

  let len = 0;
  {
    hideId ? (len = hideId.length) : (len = 0);
  }
  console.log(len);
  for (let i = 0; i < len; i++) {
    events = events.filter((event) => {
      return event[4] !== hideId[i];
    });
  }

  const startDate = new Date(`${startDateStr}T00:00:00`);
  const endDate = new Date(`${endDateStr}T00:00:00`);
  const startTime = new Date(`1970-01-01T${startTimeStr}:00`);
  const endTime = new Date(`1970-01-01T${endTimeStr}:00`);

  const calendarEvents = events.map((event) => {
    return { start: new Date(`${event[1]}`), end: new Date(`${event[2]}`) };
  });

  const availableBlocks = [];

  // Loop through each day and add full blocks to the availableBlocks array
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const blockStart = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      startTime.getHours(),
      startTime.getMinutes()
    );
    const blockEnd = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      endTime.getHours(),
      endTime.getMinutes()
    );
    const blockDuration = (blockEnd.getTime() - blockStart.getTime()) / 60000; // Convert to minutes

    if (blockDuration >= duration) {
      availableBlocks.push({ start: blockStart, end: blockEnd });
    }
  }

  // Loop through each event and shorten any overlapping blocks
  calendarEvents.forEach((event) => {
    availableBlocks.forEach((block, i) => {
      const blockStart = block.start.getTime();
      const blockEnd = block.end.getTime();

      if (
        event.end.getTime() > blockStart &&
        event.start.getTime() < blockEnd
      ) {
        // The event overlaps with this block
        if (
          event.start.getTime() <= blockStart &&
          event.end.getTime() >= blockEnd
        ) {
          // The event completely overlaps with this block, so exclude the whole block
          availableBlocks.splice(i, 1);
        } else if (
          event.start.getTime() > blockStart &&
          event.end.getTime() < blockEnd
        ) {
          // The event is entirely within this block, so split the block into two parts
          const newBlock = { start: block.start, end: block.end };
          availableBlocks.splice(i, 1, newBlock);

          // shorten the first part of the block
          if (event.start.getTime() > block.start.getTime()) {
            newBlock.end = new Date(event.start.getTime());
          }

          // shorten the second part of the block
          if (event.end.getTime() < block.end.getTime()) {
            availableBlocks.splice(i + 1, 0, {
              start: new Date(event.end.getTime()),
              end: block.end,
            });
            newBlock.end = new Date(event.start.getTime());
          }
        } else if (
          event.start.getTime() <= blockStart &&
          event.end.getTime() < blockEnd
        ) {
          // The event starts before this block, so shorten the first part of the block
          block.start = new Date(event.end.getTime());
        } else if (
          event.start.getTime() > blockStart &&
          event.end.getTime() >= blockEnd
        ) {
          // The event ends after this block, so shorten the second part of the block
          block.end = new Date(event.start.getTime());
        }
      }
    });
  });

  // Loop through each available block and add it to the result
  const result = availableBlocks
    .filter((block) => {
      const blockDuration =
        (block.end.getTime() - block.start.getTime()) / 60000; // Convert to minutes
      return blockDuration >= duration;
    })
    .map((block, id) => {
      // Convert block start and end times tolocal time
      const localStart = block.start;
      const localEnd = block.end;
      return { id, text: 'Available Time', start: localStart, end: localEnd };
    });

  // Return the result array
  return res.status(200).json(result);
};

async function addGroupEventsHelper(memberGoogleId) {
  let user = await User.findOne({ googleId: memberGoogleId });

  const credentials = {
    type: 'authorized_user',
    client_id: config.googleClientID,
    client_secret: config.googleClientSecret,
    refresh_token: user.refreshToken,
  };

  auth = google.auth.fromJSON(credentials);

  const calendar = google.calendar({ version: 'v3', auth });

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = response.data.items;
  console.log('events: ');
  console.log(events);
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');
  let userEvents = [];
  events.map((event, i) => {
    var options = { hour12: false };

    const start = event.start.dateTime || event.start.date;
    const end = event.end.dateTime;

    if (!start.includes('T')) {
      return;
    }

    if (end)
      userEvents.push([
        event.summary,
        start.substring(0, start.lastIndexOf('-')),
        end.substring(0, end.lastIndexOf('-')),
        user.name,
        memberGoogleId,
      ]);
  });

  console.log(userEvents);
  user.events = userEvents;
  user.save();
  return userEvents;
}

async function updateGroupEventsHelper(groupMembers) {
  let allUserEvents = [];
  for (const member of groupMembers) {
    let user = await User.findOne({ googleId: member[0] });

    const credentials = {
      type: 'authorized_user',
      client_id: config.googleClientID,
      client_secret: config.googleClientSecret,
      refresh_token: user.refreshToken,
    };

    auth = google.auth.fromJSON(credentials);

    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = response.data.items;
    console.log('events: ');
    console.log(events);
    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return [];
    }
    console.log('Upcoming 10 events:');
    let userEvents = [];
    events.map((event, i) => {
      var options = { hour12: false };

      const start = event.start.dateTime || event.start.date;
      const end = event.end.dateTime;

      if (!start.includes('T')) {
        return;
      }

      if (end)
        userEvents.push([
          event.summary,
          start.substring(0, start.lastIndexOf('-')),
          end.substring(0, end.lastIndexOf('-')),
          member[1],
          member[0],
        ]);
    });

    const userEventsResponse = await User.findOneAndUpdate(
      { googleId: member[0] },
      {
        events: userEvents,
      }
    );

    allUserEvents = [...allUserEvents, ...userEvents];
  }

  return allUserEvents;
}

module.exports = {
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup,
  updateGroupDeleteMember,
  getGroupEvents,
  updateGroupEvents,
  updateGroupMemberEvents,
  getFreeTime,
};
