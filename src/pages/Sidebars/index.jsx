import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import styles from './styles.module.css'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchListCarts
} from '../../reducers/carts';
import Sidebar from './Drawer';
export default function MenuAppBar() {
  const listProducts = useSelector((state) => state.carts.listProducts);
  const isLoading = useSelector((state) => state.carts.isLoading);
  const infoLogin = useSelector((state) => state.login.infoLogin);

  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  }
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  }
  const [auth, setAuth] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
  }, [isLoading])

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!token) setAuth(false);
    const userInfo = JSON.parse(localStorage.getItem('USER_INFO'));
    if (userInfo) {
      if (userInfo.isAdmin) setIsAdmin(true);
    }
    // console.log(infoLogin, 'infoLogin')
    // if (infoLogin) {
    //   setAuth(true);
    //   if (infoLogin.isAdmin) setIsAdmin(true);
    // }
  }, [])
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  }
  const handleInfo = () => {
    navigate("/info");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawer}
          >
            <MenuIcon className={styles.link} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={'/home'} className={styles.link}>
              Homepage
            </Link>
          </Typography>
          <Sidebar
            isAdmin={isAdmin}
            openDrawer={openDrawer}
            handleCloseDrawer={handleCloseDrawer}
          />
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="cart"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link to={'/cart'} className={styles.link}>
                  <Badge className={styles.badgeStyle} badgeContent={listProducts.length}>
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle className={styles.link} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleInfo}>Info</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}