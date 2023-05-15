import * as React from 'react';
import Main from '../../pages/Main';
import { Box, Grid, Typography, ButtonGroup, Button, Avatar } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import CommentIcon from '@mui/icons-material/Comment';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchInfoProduct
} from '../../reducers/products';
import {
    fetchAddToCart
} from '../../reducers/carts';
import {
    fetchListComments,
    fetchCreateComment
} from '../../reducers/comments';
import { convertFormatMoney } from '../../services/common.jsx';
import ReviewDialog from './ReviewDialog';

const initialValue = {
    review: ''
}
export default function DetailProduct(props) {
    const data = useSelector((state) => state.products.dataInfo);
    const comments = useSelector((state) => state.comments.listComment);
    const isLoading = useSelector((state) => state.comments.isLoading);
    const dispatch = useDispatch();
    const { id } = useParams();
    const dataInfo = localStorage.getItem('USER_INFO');
    const userObjId = JSON.parse(dataInfo)._id;
    const [openDialog, setOpenDialog] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const [reviewForm, setReviewForm] = useState(initialValue);

    const handleOnChange = (event) => {
        setReviewForm({
            ...reviewForm,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = () => {
        dispatch(fetchCreateComment({
            params: {
                ...reviewForm,
                userObjId,
                productObjId: id,
            }
        }))
        setOpenDialog(false);
        setReviewForm(initialValue);
    }
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const handleChangeQuantity = (value, type) => {
        switch (type) {
            case 'minus': {
                if (quantity <= 1) break;
                setQuantity(prev => prev - 1);
                break;
            }
            case 'plus': {
                setQuantity(prev => prev + 1);
                break;
            }
            default:
                break;
        }
    }
    React.useEffect(() => {
        dispatch(fetchInfoProduct({
            params: id,
        }));
        dispatch(fetchListComments({
            params: {
                productObjId: id,
            },
        }));
    }, [isLoading])
    const handleAddToCart = () => {
        const userInfo = localStorage.getItem('USER_INFO');
        const userObjId = JSON.parse(userInfo)._id;
        const paramsSubmit = {};
        paramsSubmit.userObjId = userObjId;
        paramsSubmit.productObjIds = [];
        paramsSubmit.productObjIds.push({
            productObjId: id,
            quantity,
        })
        dispatch(fetchAddToCart({
            params: paramsSubmit,
        }))
        setQuantity(1);
    }
    return (
        <Main>
            <Box>
                <Grid container>
                    <Grid item xs={3}>
                        <Box display="flex" >
                            <img className={styles.imageProduct} src={data.image} alt="" />
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h3" gutterBottom className={styles.title}>
                            {data.productName} - {data.category}
                        </Typography>
                        <Typography className={styles.price} variant="h6" gutterBottom mt={5}>
                            {convertFormatMoney(data.price)} Đ
                        </Typography>
                        <Box display="flex" alignItems="center" mt={5}>
                            <Typography className={styles.label} variant="subtitle1" mr={3}>
                                Quantity
                            </Typography>
                            <ButtonGroup className={styles.yellowBorder} variant="outlined" aria-label="outlined button group">
                                <Button className={styles.yellowBorder} onClick={() => handleChangeQuantity(1, 'minus')}>
                                    <RemoveIcon className={styles.colorWhite} />
                                </Button>
                                <Button className={clsx(styles.colorWhite, styles.yellowBorder)}>{quantity}</Button>
                                <Button className={styles.yellowBorder} onClick={() => handleChangeQuantity(1, 'plus')}>
                                    <AddIcon className={styles.colorWhite} />
                                </Button>
                            </ButtonGroup>
                        </Box>
                        <Box mt={7}>
                            <Button
                                onClick={handleAddToCart}
                                className={styles.btnCart}
                                variant="outlined"
                                startIcon={<ShoppingCartIcon />}>
                                Add to cart
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={8}>
                    <Typography className={styles.colorWhite} variant="h4" gutterBottom mb={4}>
                        Product Description
                    </Typography>
                    <Box className={styles.boxDescription}>
                        <Typography className={styles.colorWhite} variant="body1" gutterBottom>
                            {data.description}
                        </Typography>
                    </Box>
                </Box>
                <Box mt={8}>
                    <Box display='flex' justifyContent="space-between" alignItem="center">
                        <Typography className={styles.colorWhite} variant="h4" gutterBottom mb={4}>
                            Product Review
                        </Typography>
                        <Button
                            onClick={handleOpenDialog}
                            size="small"
                            className={styles.btnCart}
                            variant="outlined">
                            <CommentIcon />
                        </Button>
                    </Box>

                    <Box>
                        {comments.map((item, index) => (
                            <Box mb={5} key={index}>
                                <Box display="flex" alignItems="center" mb={4}>
                                    <Avatar
                                        sx={{ width: 56, height: 56, marginRight: '20px' }}
                                        src={item.image}
                                        alt="Remy Sharp"
                                    />
                                    <Typography className={styles.colorWhite} variant="h5" gutterBottom>
                                        {item.userObjId.username}
                                    </Typography>
                                </Box>
                                <Box className={styles.boxDescription}>
                                    <Typography className={styles.colorWhite} variant="body1" gutterBottom>
                                        {item.review}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <ReviewDialog
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleOnChange={handleOnChange}
                dataInput={reviewForm}
                handleSubmit={handleSubmit}
            />
        </Main>
    );
}