import * as React from 'react';
import styles from './styles.module.css'
import { Box } from '@mui/material';

export default function Main(props) {
    const { children } = props;
    return (
        <Box className={styles.container}>
            {children}
        </Box>
    );
}