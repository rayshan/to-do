import ToDo from "./model.js";

// =================================================================================================

export const ADD_TO_DO = "ADD_TO_DO";
export const REMOVE_TO_DO = "REMOVE_TO_DO";
export const TOGGLE_COMPLETION = "TOGGLE_COMPLETION";

export function addToDoWith(title, expiration) {
    return {
        type: ADD_TO_DO,
        toDo: new ToDo({
            title: title,
            expiration: expiration,
            isCompleted: false
        })
    };
}

export function removeToDoWith(id) {
    return {
        type: REMOVE_TO_DO,
        id: id
    };
}

export function toggleCompletionForToDoWith(id) {
    return {
        type: TOGGLE_COMPLETION,
        id: id
    };
}
