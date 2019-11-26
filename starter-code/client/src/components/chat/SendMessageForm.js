import React, { Component } from 'react';

import './SendMessageForm.css';

export default class SendMessageForm extends Component {

    state = {
        message: ''
    }

    handleChange = (e) => {
        
        this.setState({
            message: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        /** Send message to chatkit **/ 
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        });
    }

    render() {
        
        return(
            <form 
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input className="new-msg"
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    value={this.state.message}
                    type="text" placeholder="Type your message and hit ENTER"/>
            </form>
        )
    }
}