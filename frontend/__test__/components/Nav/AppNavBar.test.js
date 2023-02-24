import React from 'react';
import { expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppNavbar from '../../../src/components/Nav/AppNavbar';

describe('AppNavBar', () => {
  test('When logged out, check that groups button does not render', () => {
    const user = { authenticated: false };
    render(
      <BrowserRouter>
        <AppNavbar user={user} />
      </BrowserRouter>
    );

    expect(screen.queryByText('Groups')).toBeNull();
  });

  test('When logged in, check that groups button renders', () => {
    const user = { authenticated: true };
    render(
      <BrowserRouter>
        <AppNavbar user={user} />
      </BrowserRouter>
    );

    expect(screen.getByText('Groups'));
  });

  test('Check that the groups button redirects to /groups', () => {
    const user = { authenticated: true };
    render(
      <BrowserRouter>
        <AppNavbar user={user} />
      </BrowserRouter>
    );

    expect(screen.getByText('Groups')).toHaveAttribute('href', `/groups`);
  });
});
