import * as React from 'react';
import CardComponent from '../../components/CardComponent';
import { Box, Grid, Typography, Tabs, Tab, IconButton } from '@mui/material';
import clsx from 'clsx';
import styles from './styles.module.css'

export default function ProductComponent(props) {
  const { productList, filters, handleDeleteProduct, handleOpenEditDialog, isAdmin } = props;

  return (
    <Grid container spacing={2} sx={{ mt: 3, mb: 4 }} style={{ display: "flex", justifyContent: "center" }}>
      <Grid item xs={12}>
        <Typography className={clsx(styles.yellowText, styles.categoryText)} variant="h6" gutterBottom>
          {filters.category}
        </Typography>
      </Grid>
      {productList.map(item => (
        <Grid item xs={3} mb={4} >
          <CardComponent
            isAdmin={isAdmin}
            handleOpenEditDialog={handleOpenEditDialog}
            handleDeleteProduct={handleDeleteProduct}
            data={item} />
        </Grid>
      ))}
    </Grid>
  );
}