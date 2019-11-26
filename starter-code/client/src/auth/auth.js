import Axios from "axios";
import qs from "querystring";
import {createBrowserHistory} from 'history';

const axios = Axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_Server_API,
    headers: { 'content-type': 'application/x-www-form-urlencoded', "Access-Control-Allow-Origin": "http://localhost:3000" }
});

const history = createBrowserHistory()

export const login = function({username, password}) {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_Server_API}/auth/login`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({username, password}),
    })
    .then((response)=> {
        setUser(response.data)
        return response
    })
} 

export const signup = function(formData) {
    return axios({
        method: "POST",
        url: `${process.env.REACT_APP_Server_API}/auth/signup`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
            data: formData,
    })
    .then((response)=> {
        setUser(response.data);
        return response
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
        history.push('/')
        history.go(0)
    })
    .catch(err => console.log(err))
}    