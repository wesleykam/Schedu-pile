import React from "react";
import { Container } from "react-bootstrap";
import AddGroupMembersForm from "../components/forms/AddGroupMembersForm";



const GroupPage = () => {
    return (
        <Container expand="xl" className="pt-4 flex-grow-1">
            <AddGroupMembersForm></AddGroupMembersForm>
        </Container>
    );
};

export default GroupPage;