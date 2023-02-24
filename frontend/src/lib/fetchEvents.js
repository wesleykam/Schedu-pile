import { config } from '../Constants';

export async function fetchGroupEvents(groupId) {
  const response = await fetch(config.url + `/api/group/${groupId}`);
  const { groupMembers } = await response.json();
  let events = [];
  for (const member of groupMembers) {
    const userResponse = await fetch(config.url + `/api/user/${member[0]}`);
    const userData = await userResponse.json();
    const userEvents = userData.map((event, idx) => {
      return {
        id: idx,
        text: member[1] + "'s Event",
        start: event[1],
        end: event[2],
      };
    });
    events = [...events, ...userEvents];
  }

  return events;
}

export async function updateGroupEvents(groupId) {
  const response = await fetch(config.url + `/api/group/${groupId}`);
  const { groupMembers } = await response.json();
  let eventList = [];
  for (const member of groupMembers) {
    const userResponse = await fetch(config.url + '/api/user', {
      method: 'PATCH',
      body: JSON.stringify({ id: member[0] }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { events } = await userResponse.json();
    const userEvents = events.map((event, idx) => {
      return {
        id: idx,
        text: member[1] + "'s Event",
        start: event[1],
        end: event[2],
      };
    });
    eventList = [...eventList, ...userEvents];
  }
  console.log(eventList);

  return eventList;
}

export async function updateGroupMemberEvents(groupId, userId) {
  const response = await fetch(
    config.url + '/api/group/events/member' + groupId,
    {
      method: 'PATCH',
      body: JSON.stringify({ id: userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const { events } = await response.json();
  console.log(events);
  return;
  const eventList = events.map((event, idx) => {
    return {
      id: idx,
      text: 'My Event',
      start: event[1],
      end: event[2],
    };
  });
  return eventList;
}
