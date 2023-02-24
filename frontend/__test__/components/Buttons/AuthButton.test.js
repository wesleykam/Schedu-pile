import React from 'react';
import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthButton from '../../../src/components/Buttons/AuthButton';
import { config } from '../../../src/Constants';

describe('AuthButton', () => {
  test('If user logged in, render log out button', () => {
    const user = { authenticated: true };

    render(
      <BrowserRouter>
        <AuthButton user={user} />
      </BrowserRouter>
    );
    expect(user.authenticated).toBe(true);
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  test('If user logged out, render sign in button', () => {
    const user = { authenticated: false };
    render(
      <BrowserRouter>
        <AuthButton user={user} />
      </BrowserRouter>
    );
    expect(user.authenticated).toBe(false);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  test('If user not logged in, button directs to /auth/google', () => {
    const user = { authenticated: false };
    render(
      <BrowserRouter>
        <AuthButton user={user} />
      </BrowserRouter>
    );

    expect(screen.getByRole('button')).toHaveAttribute(
      'href',
      `${config.url}/auth/google`
    );
  });

  test('If user logged in, button directs to /auth/logout', () => {
    const user = { authenticated: true };
    render(
      <BrowserRouter>
        <AuthButton user={user} />
      </BrowserRouter>
    );

    expect(screen.getByRole('button')).toHaveAttribute(
      'href',
      `${config.url}/auth/logout`
    );
  });
});
