import * as React from 'react';
import Main from '../../pages/Main';
import { Box, Grid, Typography, ButtonGroup, Button, Avatar } from '@mui/material';
import { useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import TableComponent from '../../components/TableComponent';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import styled from 'styled-components'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchListOrders,
} from '../../reducers/orders';
import {
  fetchPurchase,
} from '../../reducers/orders';
import { convertFormatMoney } from '../../services/common.jsx';
import CartDialog from './CartDialog';
import moment from 'moment';
export default function OrderContainer(props) {

  const listOrders = useSelector((state) => state.orders.listOrders);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const dispatch = useDispatch();
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchListOrders({
      params: {}
    }))
  }, [isLoading])

  const handleOpenCartDialog = (listProducts) => {
    setListProducts(listProducts);
    setOpenCartDialog(true);
  }
  const handleCloseCartDialog = () => {
    setOpenCartDialog(false);
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
      Header: 'Username',
      accessor: 'userObjId.username',
      colorText: '#000',
    },
    {
      Header: 'Order Date',
      accessor: 'createdAt',
      colorText: '#000',
      Cell: (value) => {
        const content = value?.cell?.value ? moment(value.cell.value).format('DD/MM/YYYY') : '';
        return (
          <p>{content}</p>
        )
      }
    },
    {
      Header: 'Total Price',
      accessor: 'totalPrice',
      colorText: '#000',
      Cell: (value) => {
        return (
          <p>{convertFormatMoney(value.cell.value)}</p>
        )
      }
    },
    {
      Header: 'Address',
      accessor: 'address',
      colorText: '#000',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
      colorText: '#000',
    },
    {
      Header: 'Action',
      accessor: 'action',
      colorText: '#000',
      Cell: (value) => {
        const listProducts = value.row.original.productObjIds;
        return (
          <Box style={{ textAlign: 'center' }}>
            <Button>
              <RemoveRedEyeIcon
                onClick={() => handleOpenCartDialog(listProducts)}
                className={styles.colorWhite}
              />
            </Button>
          </Box>)
      }
    },
  ])
  return (
    <Main>
      <Typography class={styles.title} variant="h3" gutterBottom>
        ORDER MANAGEMENT
      </Typography>
      <Styles>
        <TableComponent columns={columns} data={listOrders} />
      </Styles>
      <CartDialog
        listData={listProducts}
        openDialog={openCartDialog}
        handleCloseDialog={handleCloseCartDialog}
      />
    </Main>
  );
}