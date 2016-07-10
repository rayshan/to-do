import "react-date-picker/index.css"

import React from "react";
import moment from "moment";
import {DateField, Calendar} from "react-date-picker"
import {addToDoWith} from "./actions.js";

// =================================================================================================

class ToDoForm extends React.Component {
    get tomorrow() {
        return moment().add(1, "days");
    }
    clear() {
        this.setState({title: "", expiration: this.tomorrow});
    }
    handleSubmit(event) {
        event.preventDefault();
        // HTML5 input validation doesn't work in Safari, need to check in JavaScript
        // https://bugs.webkit.org/show_bug.cgi?id=28649
        if (this.state.title.length && this.state.expiration) {
            this.props.dispatch(
                addToDoWith(this.state.title, this.state.expiration)
            );
        }
        this.clear();
    }
    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }
    handleDateChange(dateString, {dateMoment, timestamp}) {
        this.setState({expiration: dateMoment});
    }
    constructor() {
        super();
        this.state = {title: "", expiration: this.tomorrow};
    }
    render() {
        return (
            <form id="to-do-form" onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    placeholder="New to-do..."
                    value={this.state.title}
                    onChange={this.handleTitleChange.bind(this)}
                    required
                />
                <DateField
                    forceValidDate
                    value={this.state.expiration}
                    dateFormat="YYYY-MM-DD HH:mm a"
                    onChange={this.handleDateChange.bind(this)}
                >
                    <Calendar
                        weekNumbers={false}
                        clearButton={false}
                        style={{padding: "0 .5rem 0 .5rem"}}
                    />
                </DateField>
                <button type="submit" className="btn">
                    <svg height="36" viewBox="0 0 24 24" width="36">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button>
            </form>
        );
    }
}

export default ToDoForm;
