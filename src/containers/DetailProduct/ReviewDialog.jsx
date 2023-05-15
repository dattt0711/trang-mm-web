import React, { useEffect, useState, useRef } from 'react'
import { Box, Grid, Typography, Tabs, Tab, IconButton } from '@mui/material';
import styles from './styles.module.css'
import TextField from '@mui/material/TextField';
import DialogComponent from '../../components/DialogComponent';
import InputLabel from '@mui/material/InputLabel';

import clsx from 'clsx';
export default function ReviewDialog(props) {
    const { openDialog, handleOnChange, handleCloseDialog,
        dataInput, handleSubmit } = props;

    return (
        <DialogComponent
            handleSubmit={handleSubmit}
            open={openDialog}
            handleCloseDialog={handleCloseDialog}
            title={"Review"}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ marginBottom: "20px" }}>
                        <InputLabel id="demo-simple-select-label">Review Product</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="review"
                            onChange={(event) => handleOnChange(event)}
                            required
                            value={dataInput.review}
                        />
                    </Box>
                </Grid>
            </Grid>
        </DialogComponent>
    )
}