import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { config } from '../../Constants';

export default function DeleteGroupButton({ groupId }) {

    let url = config.url + '/api/group' + groupId;
    const navigate = useNavigate();

    // Calls Delete Group API and redirects to groups page
    const handleDeleteGroup = () => {
        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                navigate('/groups');
                return response.json();
            }
            throw new Error('Failed to delete group');
        })
    }

    return (
        <>
            <Button onClick={handleDeleteGroup}>Delete Group</Button>
        </>
    )
}