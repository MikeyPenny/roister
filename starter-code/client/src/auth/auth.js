import Axios from "axios";
import qs from "querystring";
import {createBrowserHistory} from 'history';

const axios = Axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_Server_API,
    headers: { 'content-type': 'application/x-www-form-urlencoded', "Access-Control-Allow-Origin": "http://localhost:3000" }
});


const history = createBrowserHistory()

export const login = function(username, password) {
        return axios({
            method: "POST",
            url: "/auth/login",
            headers: { 'content-type': 'application/x-www-form-urlencoded', "Access-Control-Allow-Origin": "http://localhost:3000" },
            data: qs.stringify({username, password}),
        })
        .then((response)=> {
            this.setUser(response.data)
        })
    }

export const signup = function({username, password, firstname, lastname, email}) {
        return axios({
            method: "POST",
            url: "/auth/signup",
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({username, password, firstname, lastname, email}),
        })
        .then((response)=> {
            this.setUser(response.data);
            return
        })
    }

export const setUser = function(user){
        localStorage.setItem('user', JSON.stringify(user));
    }

export const getUser = function(){
        return JSON.parse(localStorage.getItem('user'));
    }

export const loggedIn = function(){
        const user = getUser()
        return !!user; 
    }

export const logout = function(){
       return axios({
            url: "/auth/logout"
        })
        .then((response)=> {
            localStorage.removeItem('user');
            history.push('/Login')
            history.go(0)
        })
        .catch(err => console.log(err))
    }    