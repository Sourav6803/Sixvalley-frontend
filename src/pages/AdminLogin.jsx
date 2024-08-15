import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header.jsx';
import AdminLogin from '../components/Admin/AdminLogin.jsx';

const AdminLoginPage = () => {
    const { isAdmin } = useSelector(state => state.admin)
    console.log("admin", isAdmin)

    const navigate = useNavigate()

    useEffect(() => {
        if (isAdmin === true) {
            navigate('/admin/dashboard')
        }
    })

    return (
        <div >
            <Header />
            <AdminLogin />
            <Footer />
        </div>
    )
}

export default AdminLoginPage