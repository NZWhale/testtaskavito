export default interface Action<T> {
    type: string;
    payload: T;
}

export interface StateInterface {
    newStoriesIds: Array<string>,
    newStories: Array<Story>,
    isStoryOpen: boolean,
    currentStory: Story,
    isContentLoaded: boolean,
    currentComments: Array<Comment_> | null,
}

export interface Comment_ {
    deleted?: boolean,
    by?: string,
    id?: number,
    kids?: Array<number>,
    parent?: number,
    text: string,
    time?: number,
    type?: string
}

export interface Story {
    by?: string,
    descendants?: number,
    id?: number,
    kids?: Array<number>,
    score?: number,
    time?: number,
    title?: string,
    type?: string,
    url?: string
}