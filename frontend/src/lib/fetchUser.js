import { config } from '../Constants';
export const fetchUserGroups = (user) => {
  fetch(config.url + `/api/user/groups/${user.user.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('failed to fetch events');
    })
    .then((responseJson) => {
      return responseJson;
    });
};

export async function checkUser() {
  const response = await fetch(config.url + '/check', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
  if (response.status === 200) {
    const responseJson = await response.json();
    return { authenticated: true, user: responseJson.user };
  } else {
    return { authenticated: false, user: null };
  }
}
