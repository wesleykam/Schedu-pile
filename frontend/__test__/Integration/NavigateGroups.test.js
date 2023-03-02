import * as userController from '../../../backend/controllers/userController';
import * as groupController from '../../../backend/controllers/groupController';
import React from 'react';
import { expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Groups from '../../src/components/Group/Groups';
import AppNavbar from '../../src/components/Nav/AppNavbar';
import AuthButton from '../../src/components/Buttons/AuthButton';
import { config } from '../../src/Constants';
import MemberList from '../../src/components/Group/MemberList';

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

const group1 = {
  name: 'Test Group 1',
  groupMembers: [
    ['113574185962134136891', 'Luke Li', 'lukewoolly02@gmail.com'],
  ],
  _id: '1357134815',
};

const group2 = {
  name: 'Test Group 2',
  groupMembers: [
    ['113574185962134136891', 'Luke Li', 'lukewoolly02@gmail.com'],
    ['105952455626559313361', 'Yongtak Chung', 'yongtak@ucsb.edu'],
  ],
  _id: '94918238124',
};

const mockedGetUserGroupsInfo = jest
  .spyOn(userController, 'getUserGroupsInfo')
  .mockReturnValue([group1, group2]);

const mockedGetGroup = jest
  .spyOn(groupController, 'getGroup')
  .mockReturnValue(group1);

describe('User flow to log in and view their groups', () => {
  test('Check if the user can log in', () => {
    const user = { authenticated: false };
    render(
      <BrowserRouter>
        <AuthButton user={user} />
      </BrowserRouter>
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute(
      'href',
      `${config.url}/auth/google`
    );
  });

  test('Once logged in, check if the user can navigate to and look at their groups', () => {
    const user = { authenticated: true };
    render(
      <BrowserRouter>
        <AppNavbar user={user} />
      </BrowserRouter>
    );
    expect(screen.getByText('Groups'));
    expect(screen.getByText('Groups')).toHaveAttribute('href', `/groups`);
  });

  test('Once on the groups page, check if the app fetched the correct group info', () => {
    const expectedGroupInfo = [group1, group2];

    expect(userController.getUserGroupsInfo('Jest')).toEqual(expectedGroupInfo);
  });

  test('Check if the group cards renders and redirects to /groups/${group1._id}', async () => {
    render(
      <BrowserRouter>
        <Groups groups={[group1, group2]} />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByText('Test Group 1'));
    await userEvent.click(screen.getByText('Test Group 2'));

    expect(screen.getByText('Test Group 1')).toBeInTheDocument();
    expect(screen.getByText('Test Group 2')).toBeInTheDocument();
    expect(screen.getByText('Luke Li')).toBeInTheDocument();
    expect(screen.getByText('Luke Li, Yongtak Chung')).toBeInTheDocument();
    expect(navigate).toHaveBeenCalledWith(`/groups/${group1._id}`);
    expect(navigate).toHaveBeenCalledWith(`/groups/${group2._id}`);
  });

  test('After clicking a group card, check if the app fetches the correct group members', () => {
    const expectedGroupMembers = group1.groupMembers;
    const fetchedGroup = groupController.getGroup('Jest');

    expect(fetchedGroup.groupMembers).toEqual(expectedGroupMembers);
  });

  test("Check if the group's detail page renders the group members list", () => {
    const user = { authenticated: true };
    render(
      <BrowserRouter>
        <MemberList members={group2.groupMembers} />
      </BrowserRouter>
    );

    expect(screen.getByText('Luke Li')).toBeInTheDocument();
  });
});
