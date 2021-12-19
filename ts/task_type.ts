export type Task = {
    name: string;
    shortDescription: string;
    description: string;
    open?: boolean;
    directed?: false | string[];
    finished?: boolean;
    marks?: null | 'bookmark' | 'star';
    _id: string;
    group: string;
    closed: boolean
}

export type TaskDefaultAllowedFields = {
    name?: string;
    shortDescription?: string;
    description?: string;
    marks?:  Array<null | 'bookmark' | 'star'>
}

export type TaskUpdateOptions = 'STATUS_UPDATE'| 'USERS_UPDATE' | 'DEFAULT' | undefined

export type TaskStateUpdateAllowedFields = {
    open?: boolean;
    finished?: boolean;
    closed?: boolean
}

export type TaskUsersUpdateAllowedFields = false | string[];