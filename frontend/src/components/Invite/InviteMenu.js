import { React, useState } from "react";
import { Button } from "react-bootstrap";
import InviteCard from "./InviteCard";
import "./InviteMenu.css";


function InviteMenu() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
            <div className="inviteDropdown">
                <div className="numNotifs">
                    1
                </div>
                <Button variant="light" onClick={handleClick}>
                    {click && <>Invites <div className="arrow">&#x25B2;</div></>}{!click && <>Invites <div className="arrow">&#x25BC;</div></>}
                </Button>
                {click && <div className="dropdown-open">
                    <InviteCard groupName="Group 1" />
                    <InviteCard groupName="Group 1" />
                    <InviteCard groupName="Group 1" />
                    <InviteCard groupName="Group 1" />
                    <InviteCard groupName="Group 1" />
                    <InviteCard groupName="Group 1" />

                </div>}
                
            </div>

        </>
    )
}

export default InviteMenu