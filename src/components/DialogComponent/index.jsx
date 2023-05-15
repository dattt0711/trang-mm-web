import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogComponent(props) {
  const { children, open, handleCloseDialog,
    title, handleSubmit, isPurchase, onlyClose, isEdit } = props;

  const submitBtn = isPurchase ? 'Purchase' : isEdit ? 'Save' : 'Create';
  const closeBtn = onlyClose ? 'Close' : 'Cancel';
  return (
    <div>
      <Dialog fullWidth={true} open={open} onClose={handleCloseDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{closeBtn}</Button>
          {!onlyClose && <Button onClick={() => handleSubmit()}>{submitBtn}</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}