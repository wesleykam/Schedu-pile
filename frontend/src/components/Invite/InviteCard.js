import React from "react";
import { Card, Col } from 'react-bootstrap';

function inviteCard( { groupName }) {
    return (
        <Card className="m-2">
            <Card.Body style={{ width: '100%', cursor: 'pointer' }}>
                <Card.Title>{groupName}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default inviteCard