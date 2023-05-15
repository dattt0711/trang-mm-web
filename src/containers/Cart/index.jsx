import * as React from 'react';
import Main from '../../pages/Main';
import { Box, Grid, Typography, ButtonGroup, Button, Avatar } from '@mui/material';
import { useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import TableComponent from '../../components/TableComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchListCarts,
  fetchDeleteInCart,
} from '../../reducers/carts';
import {
  fetchPurchase,
} from '../../reducers/orders';
import { convertFormatMoney } from '../../services/common.jsx';
import PurchaseDialog from './PurchaseDialog';

export default function CartContainer(props) {
  const initialValue = {
    address: '',
    phoneNumber: '',
    receiverName: '',
  }
  const listProducts = useSelector((state) => state.carts.listProducts);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const isLoadingCart = useSelector((state) => state.carts.isLoading);
  const dispatch = useDispatch();
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [dataInput, setDataInput] = useState(initialValue);
  const handleOnChange = (event) => {
    setDataInput({
      ...dataInput,
      [event.target.name]: event.target.value,
    })
  }
  const handlePurchase = () => {
    const dataInfo = localStorage.getItem('USER_INFO');
    const userObjId = JSON.parse(dataInfo)._id;
    const submitParams = {};
    submitParams.address = dataInput.address;
    submitParams.phoneNumber = dataInput.phoneNumber;
    submitParams.receiverName = dataInput.receiverName;
    submitParams.totalPrice = calToltalPrice();
    submitParams.productObjIds = listProducts;
    submitParams.userObjId = userObjId;
    dispatch(fetchPurchase({
      params: submitParams,
    }))
    setOpenPurchaseDialog(false);
    setDataInput(initialValue);
  }
  useEffect(() => {
    const dataInfo = localStorage.getItem('USER_INFO');
    if (dataInfo) {
      const userObjId = JSON.parse(dataInfo)._id;
      dispatch(fetchListCarts({
        params: {
          userObjId,
        }
      }))
    }
  }, [isLoading, isLoadingCart])
  const handleDeleteInCart = (productObjId) => {
    const deleteParams = {};
    const dataInfo = localStorage.getItem('USER_INFO');
    if (dataInfo) {
      const userObjId = JSON.parse(dataInfo)._id;
      deleteParams.userObjId = userObjId;
      deleteParams.productObjId = productObjId;
      dispatch(fetchDeleteInCart({
        params: deleteParams,
      }))
    }
  }
  const handleOpenPurchaseDialog = () => {
    setOpenPurchaseDialog(true);
  }
  const handleClosePurchaseDialog = () => {
    setDataInput(initialValue);
    setOpenPurchaseDialog(false);

  }
  const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    thead {
        background-color: #FFEFEF;
        color: #000;
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-align: center;
      font-size: 1.4em;
      :first-child {
        text-align: center;
      }
      :last-child {
        border-right: 0;
      }
    }
  }
`
  const columns = React.useMemo(() => [
    {
      Header: 'Product',
      accessor: 'productObjId.productName',
      colorText: '#000',
    },
    {
      Header: 'Category',
      accessor: 'productObjId.category',
      colorText: '#000',
    },
    {
      Header: 'Price',
      accessor: 'productObjId.price',
      colorText: '#000',
      Cell: (value) => {
        return (
          <p>{convertFormatMoney(value.cell.value)}</p>
        )
      }
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      colorText: '#000',
    },
    {
      Header: 'Action',
      accessor: 'action',
      colorText: '#000',
      Cell: (value) => {
        const productObjId = value.row.original.productObjId._id;
        return (
          <Box style={{ textAlign: 'center' }}>
            <Button onClick={() => handleDeleteInCart(productObjId)}>
              <DeleteIcon className={styles.colorWhite} />
            </Button>
          </Box>)
      }
    },
  ])
  // const data = [
  //   {
  //     productName: "12",
  //     category: "visits",
  //     price: "status",
  //     quantity: "progress",
  //     action: "progress",
  //   },
  //   {
  //     productName: "12",
  //     category: "visits",
  //     price: "status",
  //     quantity: "progress",
  //     action: "progress",
  //   },
  //   {
  //     productName: "12",
  //     category: "visits",
  //     price: "status",
  //     quantity: "progress",
  //     action: "progress",
  //   },
  // ]
  const calToltalPrice = () => {
    return listProducts.reduce((prev, curr) => prev + curr.productObjId.price * curr.quantity, 0)
  }
  return (
    <Main>
      <Typography class={styles.title} variant="h3" gutterBottom>
        YOUR CART
      </Typography>
      <Styles>
        <TableComponent columns={columns} data={listProducts} />
      </Styles>
      <Typography class={styles.colorWhite} variant="h3" gutterBottom>
        TOTAL PRICE: {convertFormatMoney(calToltalPrice())} VND
      </Typography>
      <Box textAlign="right" mr={3} mt={4}>
        <Button
          onClick={handleOpenPurchaseDialog}
          variant="contained"
          className={styles.btnPurchase}>Purchase
        </Button>
      </Box>
      <PurchaseDialog
        handlePurchase={handlePurchase}
        dataInput={dataInput}
        handleOnChange={handleOnChange}
        openDialog={openPurchaseDialog}
        handleCloseDialog={handleClosePurchaseDialog}
      />
    </Main>
  );
}