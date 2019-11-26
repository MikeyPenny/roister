import React, { Component } from 'react';
import './RoomList.css';


export default class RoomList extends Component {
    render() {
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
        return(
            <div className="rooms-list">
                <h3 className="room-title" >Project Rooms:</h3>
                <ul className="list" >
                        {orderedRooms.map(room => {
                            const active = this.props.roomId === room.id ? 'active' : '';
                            return (
                                <li key={room.id} className={"room " + active} >
                                    <button className="btn-room"
                                        onClick={() => this.props.subscribeToRoom(room.id)}>
                                        # {room.name}    
                                    </button>
                                </li>
                            )
                        })}
                </ul>
            </div>
        )
    }
}