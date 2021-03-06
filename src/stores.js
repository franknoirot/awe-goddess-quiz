import { writable } from 'svelte/store';

export const currQuestionIndex = writable(0);

export const personality = writable({})

export const debug = writable(false)

export const quiz = writable({})

const stores = {
    currQuestionIndex,
    personality,
    debug,
    quiz,
}

export default stores