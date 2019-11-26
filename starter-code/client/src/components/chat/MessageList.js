import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Message from './Message';

import './MessageList.css';

export default class MessageList extends Component {

    UNSAFE_componentWillUpdate() {
        const node = ReactDom.findDOMNode(this);
        this.shoulScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    }
            
    componentDidUpdate() {
        if (this.shoulScrollToBottom) {
            const node = ReactDom.findDOMNode(this);
            node.scrollTop = node.scrollHeight;
        }
        
    }

    render() {
        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; You have to join a room first to send a message
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    
                    return (
                        <Message key={index} username={message.sender.name} 
                        text={message.parts[0].payload.content} />
                    )
                })}
            </div>
        )
    }
}