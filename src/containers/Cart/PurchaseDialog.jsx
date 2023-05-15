import React, { useEffect, useState, useRef } from 'react'
import { Box, Grid, Typography, Tabs, Tab, IconButton } from '@mui/material';
import styles from './styles.module.css'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CardComponent from '../../components/CardComponent';
import ButtonComponent from '../../components/ButtonComponent';
import DialogComponent from '../../components/DialogComponent';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Button from '@mui/material/Button';
import clsx from 'clsx';
export default function PurchaseDialog(props) {
    const { openDialog, handleOnChange, handleCloseDialog,
        dataInput, handlePurchase } = props;

    return (
        <DialogComponent
            handleSubmit={handlePurchase}
            open={openDialog}
            handleCloseDialog={handleCloseDialog}
            title={"Purchase"}
            isPurchase={true}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ marginBottom: "20px" }}>
                        <InputLabel id="demo-simple-select-label">Delivery Address</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="address"
                            onChange={(event) => handleOnChange(event)}
                            required
                            value={dataInput.address}
                        />
                    </Box>
                    <Box sx={{ marginBottom: "20px" }}>
                        <InputLabel id="demo-simple-select-label">Phone Number</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="number"
                            fullWidth
                            variant="standard"
                            name="phoneNumber"
                            onChange={(event) => handleOnChange(event)}
                            required
                            value={dataInput.phoneNumber}
                        />
                    </Box>
                    <Box sx={{ marginBottom: "20px" }}>
                        <InputLabel id="demo-simple-select-label">Receiver Name</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="receiverName"
                            onChange={(event) => handleOnChange(event)}
                            required
                            value={dataInput.receiverName}
                        />
                    </Box>

                </Grid>
            </Grid>
        </DialogComponent>
    )
}