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
