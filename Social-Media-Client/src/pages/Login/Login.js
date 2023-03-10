import React, { useState } from 'react'
import './Login.scss'
import {Link, useNavigate} from "react-router-dom"
import { axiosClient } from '../../utils/axiosClient';
import {
    KEY_ACCESS_TOKEN,
    setItem,
} from "../../utils/localStorageManager";


function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [e, setE] = useState();
    const navigate = useNavigate();

    async function handleClick(e) {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/auth/login', {
                email,
                password
            });
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            navigate('/');

            console.log("response " ,response)
            

        } catch (error) {

            // if(e.data.statusCode == 404){
            //     console.log(response.data.message)
            // }
            
            console.log("error" ,error);
        }
    }

    return (
        <div className="Login">
            <div className="login-box">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleClick}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        />

                    <input type="submit" className="submit" />
                </form>
                <p className="subheading">
                    Do not have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login