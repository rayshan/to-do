import React from "react";
import {toggleCompletionForToDoWith, removeToDoWith} from "./actions.js";

// =================================================================================================

class ToDoItem extends React.Component {
    get expirationLabel() {
        return (
            <span className={`expiration ${this.props.isExpired ? 'is-expired' : ''}`}>
                {this.props.humanizedExpirationFromNow}
            </span>
        );
    }
    get deleteButton() {
        return (
            <button className="delete-button btn" onClick={this.handleClick.bind(this)}>
                <svg height="36" viewBox="0 0 24 24" width="36">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </button>
        )
    }
    handleChange(event) {
        event.stopPropagation();
        this.props.dispatch(toggleCompletionForToDoWith(this.props.id));
    }
    handleClick(event) {
        event.stopPropagation();
        this.props.dispatch(removeToDoWith(this.props.id));
    }
    render() {
        return (
            <li className="to-do-item">
                <input
                    id={this.props.id}
                    className="checkbox btn"
                    type="checkbox"
                    checked={this.props.isCompleted}
                    onChange={this.handleChange.bind(this)}
                />
                <label className="checkbox-label" htmlFor={this.props.id}>{this.props.title}</label>
                {this.expirationLabel}
                {this.deleteButton}
            </li>
        );
    }
}

export default ToDoItem;
