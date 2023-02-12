import React from 'react'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import "firebase/app";

import { auth } from "../firebase";
import firebase from 'firebase/app';
const login = () => {
  return (
    <div id="login-page">
        <div id='login-card'>
            <h2>Welcome to ThunderChat</h2>
            <h5>Get Started by logging in to the app</h5>
            <div 
                className='login-button google'
                onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
            >
                <GoogleOutlined /> Google
            </div>
            <br /> <br />
            <div 
                className='login-button facebook'
                onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}

            >
                <FacebookOutlined /> Facebook
            </div>
        </div>
      
    </div>
  )
}

export default login
