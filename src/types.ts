export default interface Action<T> {
    type: string;
    payload: T;
}

export interface StateInterface{
    newStoriesIds: Array<string>,
    newStories: Array<Story>,
    isStoryOpen: boolean,
    currentStory: Story,
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