import { config } from '../Constants';

export async function addGroupMember(url, email) {
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(email),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200)
    return { success: true, response: response.json() };
  else return { success: false, response: null };
}

export async function deleteGroupMember(url, deleteEmail) {
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify(deleteEmail),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200)
    return { success: true, events: response.json() };
  else return { success: false, events: null };
}

export async function fetchGroups(user) {
  const response = await fetch(
    config.url + `/api/user/groupsinfo/${user.user.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  if (response.status === 200) return response.json();
  else return [];
}

export async function deleteGroup(url) {
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200)
    return { success: true, response: response.json() };
  else return { success: false, response: null };
}
