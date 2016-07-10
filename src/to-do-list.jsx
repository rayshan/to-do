import "./to-do-list.css";

import React from "react";
import {connect} from "react-redux";
import ToDoItem from "./to-do-item.jsx";

// =================================================================================================

const ConnectedToDoItem = connect()(ToDoItem);

class ToDoList extends React.Component {
    get items() {
        return this.props.data.map((datum) => <ConnectedToDoItem key={datum.id} {...datum} />);
    }
    render() {
        const isEmpty = this.props.data.length === 0;
        return (
            <ul id="to-do-list" className={isEmpty ? 'is-empty' : ''}>
                {this.items}
            </ul>
        );
    }
}

export default ToDoList;
