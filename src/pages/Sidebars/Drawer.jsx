import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './styles.module.css'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Logo from '../../images/charging.jpg';
export default function Sidebar(props) {
    const { openDrawer, handleCloseDrawer, isAdmin } = props;
    const drawerWidth = 240;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));
    const menu = [
        {
            path: '/order',
            icon: <LocalShippingIcon />,
            name: 'Order',
            havePermission: isAdmin ? true : false,
        },
        {
            path: '/home',
            icon: <HomeIcon />,
            name: 'Home',
            havePermission: true,
        }
    ]
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                '& .MuiPaper-root': {
                    backgroundColor: '#fff !important',
                }
            }}
            variant="persistent"
            anchor="left"
            open={openDrawer}
            className={styles.appBar}
        >
            <DrawerHeader>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    Hanu E-commerce
                </Box>
                <IconButton onClick={handleCloseDrawer} className={styles.linkBlack}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List >
                {menu.filter((data) => data.havePermission).map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <Link to={item.path} className={styles.linkBlack}>
                            <ListItemButton>
                                <ListItemIcon className={styles.linkBlack}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}