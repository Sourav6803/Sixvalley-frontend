import React, { useEffect } from 'react'
import Login from "../components/Login/Login.jsx";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header.jsx';

const LoginPage = () => {
    const { isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/')
        }
    })
    return (
        <div >
            <Header />
            <Login />
            <Footer />
        </div>
    )
}

export default LoginPage