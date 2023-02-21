import React from 'react';
import { expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateGroupButton from '../../../src/components/Buttons/CreateGroupButton';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('CreateGroupButton', () => {
  test('Button renders', () => {
    //render the CreateGroupButton
    render(
      <BrowserRouter>
        <CreateGroupButton />
      </BrowserRouter>
    );
    //Check if the button is rendered as expected
    expect(screen.getByText('+ Create Group')).toBeInTheDocument();
  });

  test('when clicked, navigate to /create', async () => {
    //render the CreateGroupButton
    render(
      <BrowserRouter>
        <CreateGroupButton />
      </BrowserRouter>
    );

    //find the CreateGroupButton and stimulate a user click
    await userEvent.click(screen.getByText('+ Create Group'));

    //Check if the button click correctly navigates the user to /create
    expect(navigate).toHaveBeenCalledWith('/create');
  });
});
