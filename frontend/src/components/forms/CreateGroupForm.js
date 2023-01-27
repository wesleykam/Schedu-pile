import { Button, Form } from "react-bootstrap";
// import { useForm } from "react-hook-form";

function CreateGroupForm( {submitAction} ) {

    // const {
    //   handleSubmit,
    // } = useForm(
    // );

    return (
      // <Form onSubmit={handleSubmit(submitAction)}>
      <div >
        <Form style={{fontSize: "25px"}} className = "d-flex justify-content-center align-items-center">
          <fieldset>
            <label>
              <p>Name</p>
              <input name="name" style={{width:"500px"}}/>
            </label>
          </fieldset>
        </Form>
        <Form style={{fontSize: "25px", marginBottom: "30px", marginTop: "30px"}} className = "d-flex justify-content-center align-items-center">
          <fieldset>
            <label>
              <p>Group Description</p>
              <input name="name" style={{width:"500px"}}/>
            </label>
          </fieldset>
        </Form>
        <Form className = "text-decoration-underline d-flex justify-content-center align-items-center">
          <Button type="submit" data-testid="CreateGroupForm-Create-Button" style={{fontSize: "30px"}}>Create!</Button>
        </Form>
      </div>
    );
  }
  
  export default CreateGroupForm;
  
