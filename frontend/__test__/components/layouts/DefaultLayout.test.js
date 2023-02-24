import React from 'react';
import { expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DefaultLayout from '../../../src/layouts/DefaultLayout';
import { BrowserRouter } from 'react-router-dom';
import * as router from 'react-router';

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('DefaultLayout', () => {
  test('Check if navigate redirects to /groups', async () => {
    render(
      <BrowserRouter>
        <DefaultLayout />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByText('Go back'));

    expect(navigate).toHaveBeenCalledWith('/groups');
  });
});
