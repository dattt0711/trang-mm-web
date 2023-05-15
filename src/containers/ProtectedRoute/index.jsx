import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Tabs, Tab, IconButton } from '@mui/material';
// import styles from './styles.module.css'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CardComponent from '../../components/CardComponent';
import clsx from 'clsx';
import { Navigate } from 'react-router-dom'
const ProtectedRoute = (props) => {
    const { component: Component, isAuthenticated } = props;
    const token = localStorage.getItem('TOKEN');
    return (
        token ?
            <Component /> :
            <Navigate to="/login" replace={true} />

    )
}

export default ProtectedRoute;