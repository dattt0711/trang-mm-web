import React, { useEffect, useState, useRef } from 'react'
import { Box, Grid } from '@mui/material';
import styles from './styles.module.css'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ButtonComponent from '../../components/ButtonComponent';
import ProductComponent from '../../components/ProductComponent';
import PaginationComponent from '../../components/PaginationComponent/index.jsx';
import FormCreate from './FormCreate';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCreateImage
} from '../../reducers/images';

import {
    fetchCreateProduct, fetchListProduct, fetchDeleteProduct,
    fetchInfoProduct, fetchUpdateProduct
} from '../../reducers/products';
import { makeStyles } from '@mui/styles';
import EditForm from './EditForm';
const useStyles = makeStyles({
    root: {
        '& .MuiFormLabel-root': {
            color: '#000 !important',
        },
        '& .css-v4u5dn-MuiInputBase-root-MuiInput-root:before': {
            borderBottom: '1px solid #000 !important',
        },
        '& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after': {
            borderBottom: '1px solid #000 !important',
        }
    },
    iconSelect: {
        '& .MuiSvgIcon-root': {
            color: '#000 !important',
        },
        '& .MuiInputBase-root': {
            '&:before': {
                borderBottom: '1px solid #000 !important',
            },
        },
        '& .css-qaihwf-MuiInputBase-root-MuiInput-root-MuiSelect-root:before': {
            borderBottom: '1px solid #000 !important',
        }
    }
});
const initialFilters = {
    search: '',
    category: 'All',
    page: 1,
}

const HomePage = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [productObjId, setProductObjId] = useState(null);
    const [isAdmin, setIsAdmin] = React.useState(false);

    const imageUrl = useSelector((state) => state.images.data);
    const productList = useSelector((state) => state.products.dataList);
    const isLoading = useSelector((state) => state.products.isLoading);
    const productInfo = useSelector((state) => state.products.dataInfo);
    const pagination = useSelector((state) => state.products.pagination);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [filters, setFilters] = useState(initialFilters);
    const initialValue = {
        productName: '',
        category: 'Housewares',
        description: '',
        price: '',
    }
    const [dataInput, setDataInput] = useState(initialValue);
    const [editParams, setEditParams] = useState(initialValue);
    const handleOnChangeEdit = (event) => {
        setEditParams({
            ...editParams,
            [event.target.name]: event.target.value,
        })
    }
    useEffect(() => {
        dispatch(fetchListProduct({
            params: filters,
        }));
    }, [filters, isLoading])

    useEffect(() => {
        if (productInfo) {
            setEditParams({
                productName: productInfo.productName,
                category: productInfo.category,
                description: productInfo.description,
                price: productInfo.price
            })
        }
    }, [productInfo])
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('USER_INFO'));
        if (userInfo) {
            if (userInfo.isAdmin) setIsAdmin(true);
        }
    }, [])
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const handleOpenEditDialog = (productObjId) => {
        dispatch(fetchInfoProduct({
            params: productObjId,
        }))
        setProductObjId(productObjId);
        setOpenEditDialog(true);
    }
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    }
    const handClickAdd = () => {
        setOpenDialog(true);
    }
    const handleUploadImage = async (file) => {
        setSelectedImage(file);
        const dataForm = new FormData();
        dataForm.append('file', file);
        dispatch(fetchCreateImage({ params: dataForm }));
    }
    const handleSaveEdit = () => {
        if (productObjId) {
            dispatch(fetchUpdateProduct({
                params: {
                    ...editParams,
                    productObjId,
                }
            }));
        }
    }
    const handleSubmit = () => {
        const dataForm = {
            ...dataInput,
            image: imageUrl,
        }
        dispatch(fetchCreateProduct({ params: dataForm }));
        setDataInput(initialValue);
        setSelectedImage(null);
        setOpenDialog(false);
    }
    const handleOnChange = (event) => {
        setDataInput({
            ...dataInput,
            [event.target.name]: event.target.value,
        })
    }
    const handleFilter = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        })
    }
    const handlePagination = (event, value) => {
        setFilters({
            ...filters,
            page: value,
        })
    }
    const handleDeleteProduct = (productObjId) => {
        dispatch(fetchDeleteProduct({
            params: { productObjId }
        }))
    }
    return (
        <Box className={styles.container}>
            <Grid container spacing={2} className="mt-5" >
                <Grid item xs={2}>
                    {isAdmin && <ButtonComponent
                        styles={styles.yellowBtn}
                        text={"Create new product"}
                        handleClick={handClickAdd}
                    />}
                </Grid>
                <Grid item xs={8} >
                    <Box sx={{ marginBottom: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <InputLabel id="demo-simple-select-label" sx={{ paddingRight: '20px', color: "#000" }}>Category: </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={filters.category}
                            label="Age"
                            variant="standard"
                            sx={{ minWidth: "100px", color: "#000" }}
                            name="category"
                            onChange={(event) => handleFilter(event)}
                            required
                            className={clsx(classes.iconSelect, styles.categoryText)}
                        >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"Health and Beauty"}>Health and Beauty</MenuItem>
                            <MenuItem value={"Housewares"}>Housewares</MenuItem>
                            <MenuItem value={"Personal Care"}>Personal Care</MenuItem>
                            <MenuItem value={"Baby Care"}>Baby Care</MenuItem>
                        </Select>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <SearchIcon sx={{ color: '#000', mr: 1, my: 0.5 }} />
                        <TextField
                            className={classes.root}
                            sx={{ color: '#000' }}
                            id="input-with-sx" label="Search"
                            inputProps={{ style: { color: "#000" } }}
                            variant="standard"
                            value={filters.search}
                            name="search"
                            onChange={(event) => handleFilter(event)}
                        />
                    </Box>
                </Grid>
            </Grid>
            <ProductComponent
                isAdmin={isAdmin}
                handleOpenEditDialog={handleOpenEditDialog}
                handleDeleteProduct={handleDeleteProduct}
                productList={productList}
                filters={filters} />
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "50px" }}>
                <PaginationComponent pagination={pagination} handlePagination={handlePagination} />
            </Box>
            <FormCreate
                dataInput={dataInput}
                handleOnChange={handleOnChange}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleSubmit={handleSubmit}
                handleUploadImage={handleUploadImage}
            />
            <EditForm
                dataInput={editParams}
                handleOnChange={handleOnChangeEdit}
                openDialog={openEditDialog}
                handleCloseDialog={handleCloseEditDialog}
                handleSubmit={handleSaveEdit}
            />
        </Box >
    )
}

export default HomePage;