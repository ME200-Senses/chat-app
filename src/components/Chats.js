import React, { useRef, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'
import axios from 'axios';
import logo from "../assets/thunderchat_logo.jpg";

import { useAuth } from '../contexts/AuthContext';
const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true); 
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/')
    }
    const getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }
    useEffect(() => {
        if(!user){
            history.push('/');
            return;
        }   

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id" : "528cd404-5236-4e21-9cbd-74aa8829c717",
                "user-name" : user.email,
                "user-secret": user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username',user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar', avatar, avatar.name)
                    axios.post('https://api.chatengine.io/users', 
                    formdata,
                    {
                        headers: {"private-key": "4351aca2-6b0b-43f5-b512-4b121e38ce8f"}
                    })
                    .then(()=> setLoading(false))
                    .catch((error)=> console.log(error))
                })
        })
    }, [user, history]);
    if(!user || loading) return 'Loading...'
  return (
    <div className='chats-page'>
        <div className='nav-bar'>
            <div className='logo-tab'>
                <img src={logo} className ="logo-img" ></img> ThunderChat
            </div>
            <div onClick={ handleLogout} className='logout-tab'>
                Logout
            </div>
        </div>
        <ChatEngine 
            height ="calc(100vh - 66px)"
            projectID = "528cd404-5236-4e21-9cbd-74aa8829c717"
            userName = {user.email}
            userSecret = {user.uid}
        />
    </div>
  );
}

export default Chats
