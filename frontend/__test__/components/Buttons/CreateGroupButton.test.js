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

test('Button renders', () => {
  render(
    <BrowserRouter>
      <CreateGroupButton />
    </BrowserRouter>
  );
  expect(screen.getByText('+ Create Group')).toBeInTheDocument();
});

test('when clicked, navigate', async () => {
  render(
    <BrowserRouter>
      <CreateGroupButton />
    </BrowserRouter>
  );

  await userEvent.click(screen.getByText('+ Create Group'));

  expect(navigate).toHaveBeenCalledWith('/create');
});
