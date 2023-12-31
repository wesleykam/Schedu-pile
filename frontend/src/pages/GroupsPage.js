import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateGroupButton from '../components/Buttons/CreateGroupButton';
import InviteMenu from '../components/Invite/InviteMenu';
import Groups from '../components/Group/Groups';
import GroupsPageLayout from '../layouts/GroupsPageLayout';
import { checkUser } from '../lib/fetchUser';
import { fetchGroups } from '../lib/handleGroup';
import '../style/GroupsPage.css';
export default function GroupsPage({ user }) {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    async function localCheckUser() {
      const user = await checkUser();
      if (user?.authenticated === false) navigate('/');
      setTimeout(async () => {
        const groups = await fetchGroups(user);
        setGroups(groups);
        setLoading(false);
      }, 100);
    }
    if (loading) {
      localCheckUser();
    }
  });

  return (
    <div className="backgroundColor">
      <GroupsPageLayout
        header={'Groups'}
        component={
          <>
            <InviteMenu
              user={user}
              setGroups={setGroups}
              style={{ zIndex: 999 }}
            />{' '}
            <CreateGroupButton user={user} />
          </>
        }
      >
        <Groups groups={groups} />
      </GroupsPageLayout>
    </div>
  );
}
