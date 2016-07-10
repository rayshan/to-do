import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import {createStore, applyMiddleware} from "redux";
import {Provider, connect} from "react-redux";
import {reducer} from "./reducers.js";

import ToDoForm from "./to-do-form.jsx";
import ToDoList from "./to-do-list.jsx";

// =================================================================================================

function ToDoListSelector(state) {
    return {data: state};
}
const ConnectedToDoList = connect(ToDoListSelector)(ToDoList);

const ConnectedToDoInput = connect()(ToDoForm);

class App extends React.Component {
    render() {
        return (
            <div id="app-container">
                <ConnectedToDoInput />
                <ConnectedToDoList />
            </div>
        );
    }
}

// =================================================================================================

const store = createStore(reducer);

// =================================================================================================

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app-root")
);
