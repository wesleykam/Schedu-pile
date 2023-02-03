import { Button } from 'react-bootstrap';

export default function UpdateUserEventsButton({ user }) {
    const updateEvents = async () => {
        fetch('http://localhost:8000/api/user', {
            method: 'PATCH',
            body: JSON.stringify(user.user),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error('failed to fetch events');
        }).then((responseJson) => {
            console.log(responseJson);
        })
    }

    return (
        <>
            <Button className='ml-auto' onClick={updateEvents}>Update Events</Button>
        </>
    );
}