import { useEffect, useState } from 'react';
import CreateGroupButton from '../components/Buttons/CreateGroupButton';
import UpdateUserEventsButton from '../components/Buttons/UpdateUserEventsButton';
import Groups from '../components/Group/Groups';
import DefaultLayout from '../layouts/DefaultLayout';

export default function GroupsPage({ user }) {
  const [events, setEvents] = useState([]);

  const updateEvents = () => {
    fetch(`http://localhost:8000/api/user/${user.user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('failed to fetch events');
    }).then((responseJson) => {
      setEvents(responseJson);
    })
  }

  return (
    <DefaultLayout header={'Groups'} component={<CreateGroupButton />}>
      <Groups />
      <UpdateUserEventsButton user={user} handler={updateEvents}/>
      {events.map((event, i) => {
        return (
          <div>
            <div>{i}</div>
            <div>{event[0]}</div>
            <div>{event[1]}</div>
            <div>{event[2]}</div>
          </div>
        )
      })}
    </DefaultLayout>
  );
}
