import { React, useState } from "react";
import { ClipLoader } from 'react-spinners';

import { Card, Row, Col, Button } from 'react-bootstrap';

import { acceptInvites, declineInvites } from '../../lib/handleInvites';


function InviteCard({ user, groupId, groupName, setGroups, setInvites }) {
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [loadingDecline, setLoadingDecline] = useState(false);

    function acceptInvite() {
        acceptInvites(user, groupId).then((data) => {
            setGroups(data.groups);
            setInvites(data.user.invites);
            setLoadingAccept(false);
        })
    }

    function declineInvite() {
        declineInvites(user, groupId).then((data) => {
            setInvites(data.user.invites);
            setLoadingDecline(false);
        })
    }

    return (
        <Card className="m-2">
            <Card.Body style={{ width: '100%', cursor: 'pointer' }}>
                <Row>
                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                        <Card.Title>{groupName}</Card.Title>
                    </Col>
                    <Col style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button className='m-1' variant='success' style={{ width: '40px'}} onClick={() => { setLoadingAccept(true); acceptInvite(); }}>
                            {loadingAccept ? <ClipLoader color="#FFFFFF" size={13} /> : <span>&#x2713;</span>}
                        </Button>
                        <Button className='m-1' variant='danger' style={{ width: '40px'}} onClick={() => { setLoadingDecline(true); declineInvite(); }}>
                            {loadingDecline ? <ClipLoader color="#FFFFFF" size={13} /> : <span>&#x2715;</span>}
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default InviteCard