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
export default function FormCreate(props) {
    const { openDialog, handleOnChange, handleCloseDialog, selectedImage, handleSubmit,
        handleUploadImage, dataInput } = props;
    const fileInputRef = useRef();

    return (
        <DialogComponent
            handleSubmit={handleSubmit}
            open={openDialog}
            handleCloseDialog={handleCloseDialog}
            title={"Create new product"}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box sx={{ marginBottom: "20px" }}>
                        <InputLabel id="demo-simple-select-label">Product Name</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="productName"
                            onChange={(event) => handleOnChange(event)}
                            required
                            value={dataInput.productName}
                        />
                    </Box>
                    <Box sx={{ marginBottom: "20px" }}>
                        <InputLabel id="demo-simple-select-label" sx={{ marginBottom: "10px" }}>Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={dataInput.category}
                            label="Age"
                            variant="standard"
                            sx={{ minWidth: "100px" }}
                            name="category"
                            onChange={(event) => handleOnChange(event)}
                            required
                        >
                            <MenuItem value={"Health and Beauty"}>Health and Beauty</MenuItem>
                            <MenuItem value={"Housewares"}>Housewares</MenuItem>
                            <MenuItem value={"Personal Care"}>Personal Care</MenuItem>
                            <MenuItem value={"Baby Care"}>Baby Care</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ marginBottom: "20px" }}>
                        <InputLabel id="demo-simple-select-label">Description</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="description"
                            onChange={(event) => handleOnChange(event)}
                            required
                            value={dataInput.description}
                        />
                    </Box>
                    <Box sx={{ marginBottom: "20px" }}>
                        <InputLabel id="demo-simple-select-label">Price</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="number"
                            fullWidth
                            variant="standard"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            name="price"
                            onChange={(event) => handleOnChange(event)}
                            required
                            value={dataInput.price}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        {selectedImage && (
                            <div>
                                <img alt="not fount" width={"90%"} height={"60%"} style={{ objectFit: 'cover' }} src={URL.createObjectURL(selectedImage)} />
                                <br />
                            </div>
                        )}
                        <br />
                        <Button
                            variant="contained"
                            endIcon={<DriveFolderUploadIcon />}
                            onClick={(event) => {
                                event.preventDefault();
                                console.log(event)
                                fileInputRef.current.click();
                            }}
                        >
                            Upload image
                        </Button>
                        <br />
                        <input
                            type="file"
                            name="myImage"
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                console.log(selectedImage);
                                handleUploadImage(event.target.files[0]);
                            }}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            required
                        />
                    </Box>
                </Grid>
            </Grid>
        </DialogComponent>
    )
}