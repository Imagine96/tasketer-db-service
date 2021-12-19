export type Group = {
    groupName: string,
    owner_id: string,
    taskLog: string[],
    finishedTaskLog: string[],
    _id: string,
    users: string[],
    closed: boolean
}

export type GroupAllowedUpdate = {
    groupName?: string,
    closed?: boolean
}

