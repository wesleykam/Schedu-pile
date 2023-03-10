import React from 'react'
import { render, screen } from '@testing-library/react'
import CreateGroupButton from '../components/Buttons/CreateGroupButton';

it('Should ',()=>{
    render(<CreateGroupButton />)
    const titleElement = screen.getByText(/Create/);
    expect(titleElement).toBeInTheDocument();
});