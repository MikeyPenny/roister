import React, { Component } from 'react';
import instance from "../auth/customAxios";
import {Link} from 'react-router-dom';

import {
    Nav,
    TabPane,
    Container,
    Row,
    Col,
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
        url: `${process.env.REACT_APP_Server_API}/Profile/${this.props.match.params.userId}`,
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
          <p className="title3">Welcome {this.state.user.firstname}</p>
          <h3>{this.state.user.jobposition}</h3>
        </Container>
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
          <h4 className='title text-center'>Location </h4>
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
                          src={require("assets/img/create.png")}
                        >
                        </img>
                      </a>
                    </Col>
                    <Col md="6">
                      <a href="/project">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("assets/img/see.png")}
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