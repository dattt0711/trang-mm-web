import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Tabs, Tab, IconButton } from '@mui/material';
import styles from './styles.module.css'
import { Form } from './Form';
import { fetchLogin, fetchRegister } from '../../api/login';
import { useNavigate, Navigate } from "react-router-dom";

const RegisterContainer = (props) => {
  const navigate = useNavigate();

  const initialForm = {
    userName: "",
    password: "",
    email: "",
    rePassword: "",
  }
  const [registerForm, setRegisterForm] = useState(initialForm);
  const handleInputChange = event => {
    setRegisterForm(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (registerForm.password !== registerForm.rePassword) {
      console.log("Password and Confirm Password must be the same")
    }
    const rs = await fetchRegister(registerForm);
    if (rs?.data?.success) {
      // localStorage.setItem('TOKEN', rs.data.data.token);
      // localStorage.setItem('USER_INFO', JSON.stringify(rs.data));
      navigate("/login");
    }
  }
  const token = localStorage.getItem('TOKEN');

  return !token ? (
    <Box className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box sx={{ paddingLeft: '10px' }}>
            <Typography className={styles.textWhite} variant="h2" gutterBottom>
              WELCOME TO HANU
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={styles.description}>
              Register to update latest products and promotion information
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Form handleInputChange={handleInputChange} handleSubmit={handleSubmit} registerForm={registerForm} />
        </Grid>
      </Grid>
    </Box>) : <Navigate to="/home" />
}

export default RegisterContainer;