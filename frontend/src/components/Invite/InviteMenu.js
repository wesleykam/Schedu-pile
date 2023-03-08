import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import InviteCard from "./InviteCard";
import { getInvites } from '../../lib/handleInvites';
import "./InviteMenu.css";


function InviteMenu({ user, setGroups }) {
    const [click, setClick] = useState(false);
    const [invites, setInvites] = useState([]);

    const handleClick = () => setClick(!click);

    useEffect(() => {
        getInvites(user).then((data) => {
            setInvites(data.invites);
        })
    }, [user])

    return (
        <>
            <div className="inviteDropdown">
                <div className="numNotifs">
                    {invites.length}
                </div>
                <Button variant="light" onClick={handleClick}>
                    {click && <>Invites <div className="arrow">&#x25B2;</div></>}{!click && <>Invites <div className="arrow">&#x25BC;</div></>}
                </Button>
                {click && <div className="dropdown-open">
                    {/* map over invites */}
                    {invites.map((invite, idx) => {
                        return (
                            <InviteCard user={user} groupId={invite[0]} groupName={invite[1]} setGroups={setGroups} setInvites={setInvites} />
                        )
                    })}
                </div>}
            </div>
        </>
    )
}

export default InviteMenu