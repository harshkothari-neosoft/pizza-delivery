import axios from 'axios';
import { MAIN_URL } from './Url';


export function getPost(){
    return axios.get(`${MAIN_URL}posts/getpost`)
}

export function fetchdata(){
    return axios.get(`${MAIN_URL}posts/fetchdata`)
}

export function addPost(data){
    return axios.post(`${MAIN_URL}posts/addpost`,data)
}

export function placeOrder(data){
    return axios.post(`${MAIN_URL}posts/placeorder`,data) 
}

export function allorders(){
    return axios.get(`${MAIN_URL}posts/allorders`) 
}

export function validation(data){
    return axios.post(`${MAIN_URL}posts/validate`,data) 
}