import { config } from '../Constants';

export async function getInvites(user) {
    const response = await fetch(`${config.url}/api/invite/${user.user.id}`);
    const data = await response.json();
    return data;
}

export async function acceptInvites(user, groupId) {
    const response = await fetch(`${config.url}/api/invite/accept`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: user.user.id,
            groupId: groupId
        }),
    })
    const data = await response.json();
    return data
}

export async function declineInvites(user, groupId) {
    const response = await fetch(`${config.url}/api/invite/decline`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: user.user.id,
            groupId: groupId,
        }),
    })
    const data = await response.json();
    return data
}


