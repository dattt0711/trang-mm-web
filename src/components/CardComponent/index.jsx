import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { convertFormatMoney } from '../../services/common.jsx';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
export default function CardComponent(props) {
    const { data, handleDeleteProduct, handleOpenEditDialog, isAdmin } = props;
    return (
        <Card sx={{ maxWidth: 300 }} className={styles.cardContainer}>
            <CardMedia
                sx={{ height: 200 }}
                image={data.image}
                title="green iguana"
            />
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography className={styles.yellowColor} mb={1}>
                    {data.productName}
                </Typography>
                <span className={styles.category}>
                    {data.category}
                </span>
                <Typography mt={1} variant="subtitle2" gutterBottom className={styles.yellowColor} sx={{ fontWeight: 'bold' }}>
                    {convertFormatMoney(data.price)} VND
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to={`/product/info/${data?._id}`}>
                    <Button className={styles.yellowBtn} size="small"><VisibilityIcon /></Button>
                </Link>
                {isAdmin && <Button
                    onClick={() => handleOpenEditDialog(data?._id)}
                    className={styles.yellowBtn} size="small">
                    <EditIcon />
                </Button>}
                {isAdmin && <Button
                    onClick={() => handleDeleteProduct(data?._id)}
                    className={styles.yellowBtn} size="small"><DeleteIcon /></Button>}
            </CardActions>
        </Card>
    );
}