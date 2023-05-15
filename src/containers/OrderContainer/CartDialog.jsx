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
import styled from 'styled-components'
import { convertFormatMoney } from '../../services/common.jsx';

import TableComponent from '../../components/TableComponent';
export default function CartDialog(props) {
  const { openDialog, handleCloseDialog, listData } = props;
  const Styles = styled.div`
        padding: 1rem;
      
        table {
        //   background-color: #FFEFEF;
          width: 100%;
          border-spacing: 0;
          border: 1px solid black;
          thead {
            //   background-color: #fff;
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

  ])
  return (
    <DialogComponent
      open={openDialog}
      handleCloseDialog={handleCloseDialog}
      title={"List Products in order"}
      onlyClose={true}
    >
      <Styles>
        <TableComponent
          columns={columns} data={listData}
        />
      </Styles>

    </DialogComponent>
  )
}