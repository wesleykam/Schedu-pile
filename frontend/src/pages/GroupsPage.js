import CreateGroupButton from '../components/Buttons/CreateGroupButton';
import UpdateUserEventsButton from '../components/Buttons/UpdateUserEventsButton';
import Groups from '../components/Group/Groups';
import DefaultLayout from '../layouts/DefaultLayout';

export default function GroupsPage({ user }) {
  return (
    <DefaultLayout header={'Groups'} component={<CreateGroupButton />}>
      <Groups />
      <UpdateUserEventsButton user={user} />
    </DefaultLayout>
  );
}
