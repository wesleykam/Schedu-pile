export const fetchUserGroups = () => {
  fetch(`http://localhost:8000/api/user/groups/${user.user.id}`, {
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
      console.log(responseJson);
    });
};
