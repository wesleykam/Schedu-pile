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
  const { startDate, endDate, startTime, endTime, duration } = req.body;
  // Create an array of all the start and end times of the events within the date range

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such group' });
  }

  const group = await Group.findById(id);

  if (!group) {
    return res.status(404).json({ error: 'No such group' });
  }

  let times = [];
  for (let event of events) {
    if (event.startDate >= startDate && event.startDate <= endDate) {
      times.push({ time: event.startTime, isStart: true });
    }
    if (event.endDate >= startDate && event.endDate <= endDate) {
      times.push({ time: event.endTime, isStart: false });
    }
  }
  // Sort the times array by time
  times.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  });
  // Loop through the times array to find free time slots
  let freeTimes = [];
  let prevTime = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    startTime.getHours(),
    startTime.getMinutes()
  );
  for (let i = 0; i < times.length; i++) {
    let currTime = new Date(prevTime);
    let event = times[i];
    if (event.isStart) {
      // The current event starts, so check if there's a free time slot
      if (
        event.time > prevTime &&
        event.time.getTime() - prevTime.getTime() >= duration * 60000
      ) {
        // There's a free time slot between prevTime and event.time
        let freeTime = {
          startDate: new Date(prevTime),
          startTime: new Date(prevTime),
          endDate: new Date(prevTime),
          endTime: new Date(event.time),
        };
        freeTime.endDate.setDate(freeTime.startDate.getDate());
        freeTime.endTime.setDate(freeTime.startDate.getDate());
        freeTimes.push(freeTime);
      }
      // Move prevTime to the start of the event
      currTime.setHours(event.time.getHours());
      currTime.setMinutes(event.time.getMinutes());
      prevTime = currTime;
    } else {
      // The current event ends, so move prevTime to the end of the event
      currTime.setHours(event.time.getHours());
      currTime.setMinutes(event.time.getMinutes());
      prevTime = currTime;
    }
  }
  // Check if there's a free time slot at the end of the day
  let lastTime = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
    endTime.getHours(),
    endTime.getMinutes()
  );
  if (
    lastTime > prevTime &&
    lastTime.getTime() - prevTime.getTime() >= duration * 60000
  ) {
    // There's a free time slot between prevTime and lastTime
    let freeTime = {
      startDate: new Date(prevTime),
      startTime: new Date(prevTime),
      endDate: new Date(endDate),
      endTime: new Date(lastTime),
    };
    freeTime.endDate.setDate(freeTime.startDate.getDate());
    freeTime.endTime.setDate(freeTime.startDate.getDate());
    freeTimes.push(freeTime);
  }
  // Return the array of free time slots
  return res.status(200).json(freeTimes);
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
