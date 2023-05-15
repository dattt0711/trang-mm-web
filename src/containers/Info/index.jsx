import React, { useEffect, useState, useRef } from 'react'
import { Box, Grid } from '@mui/material';
import styles from './styles.module.css'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCreateImage
} from '../../reducers/images';
import Avatar from '@mui/material/Avatar';
import Main from '../../pages/Main';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmailIcon from '@mui/icons-material/Email';
import WcIcon from '@mui/icons-material/Wc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {
    fetchInfoUser,
    fetchUpdateUser,
} from '../../reducers/users';
import moment from 'moment';
const initialValue = {
    fullName: '',
    email: '',
    sex: 'female',
    address: '',
}
const InfoContainer = (props) => {
    const userData = useSelector((state) => state.users.dataInfo);
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const [dataInput, setDataInput] = useState(initialValue);
    const userObjId = JSON.parse(localStorage.getItem('USER_INFO'))._id;



    useEffect(() => {
        // Call api user info
        dispatch(fetchInfoUser({
            params: userObjId,
        }))
    }, [])
    useEffect(() => {
        // Check data from api, set into input
        if (userData) {
            setDataInput({
                fullName: userData?.fullName,
                email: userData?.email,
                sex: userData?.sex,
                address: userData?.address,
            })
            if (userData.dob) {
                const formatDate = moment(userData.dob, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
                setDate(new Date(formatDate));
            }
        }
    }, [userData])
    // Send data update
    const handleSave = () => {
        const paramsSubmit = {};
        paramsSubmit.userObjId = userObjId;
        paramsSubmit.fullName = dataInput.fullName;
        paramsSubmit.email = dataInput.email;
        paramsSubmit.sex = dataInput.sex;
        paramsSubmit.address = dataInput.address;
        paramsSubmit.dob = moment(date).format('DD/MM/YYYY');
        dispatch(fetchUpdateUser({
            params: paramsSubmit,
        }))
    }
    // Watch change of user on input
    const handleOnChange = (event) => {
        setDataInput({
            ...dataInput,
            [event.target.name]: event.target.value,
        })
    }
    return (
        <Main>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box display='flex' alignItems="center" mb={3}>
                        <Box mr={2}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </Box>
                        <Box>
                            <Typography className={styles.usernameAvt} variant="h6" gutterBottom>
                                {userData.username}
                            </Typography>
                            <Typography className={styles.subtitleAvt} variant="subtitle1" gutterBottom>
                                Edit profile
                            </Typography>
                        </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <PersonIcon className={styles.icon} />
                        <Typography ml={2} className={styles.usernameAvt} variant="h5">
                            My Account
                        </Typography>
                    </Box>

                </Grid>
                <Grid item xs={9}>
                    <Box className={styles.formContainer}>
                        <Typography ml={2} className={styles.titleForm} variant="h5" mb={4}>
                            My Profile
                        </Typography>
                        <Grid container spacing={2} className={styles.fullWidth}>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={10}>
                                <FormControl variant="standard" sx={{ display: 'block', width: '100%', marginBottom: '30px' }}>
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Name
                                    </InputLabel>
                                    <Input
                                        sx={{ width: '80%' }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <InsertEmoticonIcon />
                                            </InputAdornment>
                                        }
                                        name='fullName'
                                        value={dataInput.fullName}
                                        onChange={(event) => handleOnChange(event)}
                                    />
                                </FormControl>
                                <FormControl variant="standard" sx={{ display: 'block', width: '100%', marginBottom: '30px' }}>
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Email
                                    </InputLabel>
                                    <Input
                                        sx={{ width: '80%' }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        }
                                        name='email'
                                        value={dataInput.email}
                                        onChange={(event) => handleOnChange(event)}
                                    />
                                </FormControl>
                                <FormControl variant="standard" sx={{ display: 'block', width: '100%', marginBottom: '30px' }}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        defaultValue="female"
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        name="sex"
                                        onChange={(event) => handleOnChange(event)}
                                        value={dataInput.sex}
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl variant="standard" sx={{ display: 'block', width: '100%', marginBottom: '30px' }}>
                                    <p>Dob</p>
                                    <DatePicker
                                        className={styles.datePicker}
                                        selected={date}
                                        name="dob"
                                        onChange={(date) => setDate(date)}
                                    // onChange={(date) => setStartDate(date)} 
                                    />
                                    {/* <InputLabel htmlFor="input-with-icon-adornment">
                                    </InputLabel> */}
                                    {/* <Input
                                        sx={{ width: '80%' }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <CalendarMonthIcon />
                                            </InputAdornment>
                                        }
                                    /> */}
                                </FormControl>
                                <FormControl variant="standard" sx={{ display: 'block', width: '100%', marginBottom: '30px' }}>
                                    <InputLabel htmlFor="input-with-icon-adornment">
                                        Address
                                    </InputLabel>
                                    <Input
                                        sx={{ width: '80%' }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <HomeIcon />
                                            </InputAdornment>
                                        }
                                        name='address'
                                        value={dataInput.address}
                                        onChange={(event) => handleOnChange(event)}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box sx={{ textAlign: 'right' }}>
                            <Button
                                className={styles.btn}
                                onClick={handleSave}
                                variant="contained">Save</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Main>
    )
}

export default InfoContainer;