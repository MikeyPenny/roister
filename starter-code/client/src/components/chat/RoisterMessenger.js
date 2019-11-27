import React, { Component } from 'react';
import { getUser } from "../../auth/auth";
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import RoomList from './RoomList';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import NewRoomForm from './NewRoomForm';
import './RoisterMessenger.css';
import ExamplesNavbar from '../Navbars/ExamplesNavbar';
import DefaultFooter from "components/Footers/DefaultFooter.js";

import {
    Nav,
    TabPane,
    Container,
    Row,
    Col,
  } from "reactstrap";
export default class RoisterMessenger extends Component {

    

    constructor(props) {
        super();
        this.state = {
            user: getUser(),
            messages: [],
            joinableRooms: [],
            joinedRooms: [],
            roomId: null
        }
    }

    

    componentDidMount() {
        
        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:424e8026-a896-4dcc-b93b-2c29904741a9',
            userId: this.state.user._id,
            tokenProvider: new TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/424e8026-a896-4dcc-b93b-2c29904741a9/token'
            })
        });
        
        chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser;
                this.getRooms();
            })
            .catch(err => {
                console.log(`Error on connect: ${err}`);
            });

    }

    getRooms = () => {
        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            
            this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
            })
        })
        .catch(err => {
            console.log(`Error on joinable rooms: ${err}`);
        });
    }

    subscribeToRoom = (room) => {
        this.setState({
            messages: []
        });
        this.currentUser.subscribeToRoomMultipart({
            roomId: room,
            hooks: {
            onMessage: message => {
                
                this.setState({
                messages: [...this.state.messages, message]
                })
            }
            },
            messageLimit: 10
        })
        .then(room => {
            this.setState({roomId: room.id})
        })
        .catch(err => {
            console.log(`Error on subscribe to rooms: ${err}`);
        });
    }

    sendMessage = (text) => {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        });
    }

    createRoom(name) {
        
        this.currentUser.createRoom({
            name,
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log('Error creating room', err));
    }

    render () {
        return (
            <div className="chat-container">
                <ExamplesNavbar />
                <div className="wrapper ">
                    <div className="page-header clear-filter page-header-small" filter-color="blue">
                        <div className="page-header-image" style={{backgroundImage: 
                            "url(" + require("assets/img/simone.jpg") + ")"}}>
                        </div>
                        <div className="chat-section">
                            <div className="row-container msg-row">
                                <div className="cell-left">
                                    <RoomList
                                        roomId={this.state.roomId} 
                                        subscribeToRoom={this.subscribeToRoom} 
                                        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
                                </div>
                                <div className="cell-right">
                                <MessageList 
                                    roomId={this.state.roomId}
                                    messages={this.state.messages} />
                                </div>
                            </div>
                            <div className="row-container">
                                <div className="cell-left">
                                    <NewRoomForm createRoom={this.createRoom} />
                                </div>
                                <div className="cell-right">
                                    <SendMessageForm 
                                        disabled={!this.state.roomId}
                                        sendMessage={this.sendMessage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <Container>
                        <div className="button-container">
                    
                            <div className="left">   
                            <button className="social-signin messages">Connect</button>
                            <button className="social-signin messages">Send a Message</button>
                            <button className="social-signin messages">View All Projects</button>
                        </div>

                        <div className="right">   
                        <a href='https://www.facebook.com/'>
                            <button className="social-signin facebook">Follow me on Facebook</button>
                        </a>
                        
                        <a href="https://www.twitter.com">
                            <button className="social-signin twitter">Follow me on Twitter</button>
                        </a>
                        <a href="https://aboutme.google.com/">
                            <button className="social-signin google">Follow me on Google+</button>
                            </a>
                        </div>
                        </div>        
                        <div className='profile-details-container'>
                        
                        </div>
                        
                        <br></br>
                    </Container>
                </div>
                <div className="footer">
                    <DefaultFooter/>
                </div>
                
            </div>
            
        )
    }
}