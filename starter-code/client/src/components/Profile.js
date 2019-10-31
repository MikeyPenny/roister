import React, { Component } from 'react';
import instance from "../auth/customAxios";

import {
    Button,
    Nav,
    TabPane,
    Container,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";

 import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
 import DefaultFooter from "components/Footers/DefaultFooter.js";

export default class Profile extends Component {
    constructor(props){
        super(props);
    }

    state = {
          user: "",
          projects:[]
        }

  componentDidMount(){
      instance({
        url: `${process.env.REACT_APP_Server_API}/Profile`,
        method: "GET"
    })
    .then((response)=>{
      this.setState({user: response.data.user, projects: response.data.projects})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

render(){
    return(           
    <>
    <ExamplesNavbar />
    <div className="wrapper">
      <div className="page-header clear-filter page-header-small" filter-color="blue">
        <div className="page-header-image" style={{backgroundImage: "url(" + require("assets/img/simone.jpg") + ")"}}
        ></div>
        <Container>
          <div>
            <img className="photo-container" alt="..." src={this.state.user.picture}></img>
          </div>
          <p className="title3">WELCOME {this.state.user.firstname}</p>
          <h3>{this.state.user.jobposition}</h3>
        </Container>
      </div>
      <div className="section">
        <Container>
          <div className="button-container">
    
            <div class="left">   
            <button class="social-signin messages">Connect</button>
            <button class="social-signin messages">Send a Message</button>
            <button class="social-signin messages">View All Projects</button>
          </div>

           <div class="right">   
            <button class="social-signin facebook">Follow me on Facebook</button>
            <button class="social-signin twitter">Follow me on Twitter</button>
            <button class="social-signin google">Follow me on Google+</button>
          </div>
          </div>        

          <div className='profile-details-container'>
          <h4 className='title text-center'>Location</h4>
          <h4>{this.state.user.location}</h4>
          <h4 className='title text-center'>Skills</h4>
          <h4>{this.state.user.skills}</h4>
          <h4 className='title text-center'>About me</h4>
          <h4>{this.state.user.aboutme}</h4>
          </div>
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <h4 className="title text-center">My Projects</h4>
              <div className="nav-align-center">
                <Nav
                  className="nav-pills-info nav-pills-just-icons"
                  pills
                  role="tablist"
                >
                </Nav>
              </div>
            </Col>
              <TabPane tabId="pills1">
                <Col className="ml-auto mr-auto" md="10">
                  <Row className="collections">
                    <Col md="6">
                      <a href="/createproject">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg8-faded.png")}
                        >
                        </img>
                      </a>
                    </Col>
                    <Col md="6">
                      <a href="/createproject">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/bg7-faded.png")}
                        >
                        </img>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </TabPane>
          </Row>
          <br></br>
        </Container>
      </div>
      <DefaultFooter/>
    </div>
  </>
    )  
}
}