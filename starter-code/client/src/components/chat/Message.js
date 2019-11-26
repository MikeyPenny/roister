import React from 'react';

import './Message.css';

export default function Message(props) {
        return(
            <div className="message">
                <div className="message-username">{ props.username }</div>
                <div className="message-text">{ props.text }</div>
            </div>
        )
}