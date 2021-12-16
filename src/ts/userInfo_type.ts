export type UserInfo = {
    uid: string;
    username: string;
    activeTasks?: string[];
    finishedTask?: string[];
    groups?: string[],
    userImg?: string;
    _id: any
}

export type UserInfoAllowedUpdateFields = {
    username: string;
    activeTasks?: string[];
    finishedTask?: string[];
    groups?: string[],
    userImg?: string;
}
