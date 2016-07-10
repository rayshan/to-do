import * as actions from "./actions.js";
import ToDo from "./model.js";
import moment from "moment";

// =================================================================================================

const initialState = [
    new ToDo({
        title: "Photograph Twin Peaks at night",
        isCompleted: false,
        expiration: moment().subtract(7, "days")
    }),
    new ToDo({
        title: "Read Creativity Inc.",
        isCompleted: false,
        expiration: moment().endOf("day")
    }),
    new ToDo({
        title: "Sketch with Apple Pencil",
        isCompleted: false,
        expiration: moment().add(1, "days")
    }),
    new ToDo({
        title: "Submit article to Hacker News",
        isCompleted: false,
        expiration: moment().add(1, "months")
    }),
    new ToDo({
        title:
            "This is a to-do with a super long title. This is a to-do with a super long title. This is a to-do with a super long title.",
        isCompleted: true,
        expiration: moment().add(1, "years")
    })
];

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.ADD_TO_DO:
            return [action.toDo, ...state]
                .sort((a, b) => a.isCompleted - b.isCompleted);
        case actions.REMOVE_TO_DO:
            return state
                .filter((toDo) => toDo.id !== action.id);
        case actions.TOGGLE_COMPLETION:
            return state
                .map(function (toDo) {
                    if (toDo.id === action.id) {
                        toDo.isCompleted = !toDo.isCompleted
                    }
                    return toDo;
                })
                .filter((toDo) => !(toDo.isCompleted && toDo.isExpired))
                .sort((a, b) => a.isCompleted - b.isCompleted);
        default:
            return state;
    }
}

