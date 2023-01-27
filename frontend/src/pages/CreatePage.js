import React from "react";
import { Container, Form } from 'react-bootstrap';
import CreateGroupForm from "../components/forms/CreateGroupForm";



const CreateGroupPage = () => {
    return (
        <Container expand="xl" className="pt-4 flex-grow-1">
            <div className = "">
                <h1 className = "text-decoration-underline d-flex justify-content-center align-items-center" style={{ height: "300px", fontSize: "75px" }}>Create a Group</h1>
            </div>
            <CreateGroupForm></CreateGroupForm>
        </Container>

    );
};

export default CreateGroupPage;