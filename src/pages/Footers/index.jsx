import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './styles.module.css'
import { Grid, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
export default function Footers(props) {
    const { children, value, index, ...other } = props;
    return (
        <Box>
            <Box className={styles.containerFooter}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant="h6" gutterBottom className={styles.headerFooter}>
                            CUSTOMER SERVICE
                        </Typography>
                        <Typography variant="body2" gutterBottom className={styles.subTitle}>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" gutterBottom className={styles.subTitle}>
                            Leave a Feedback
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom className={styles.headerFooter}>
                            ABOUT US
                        </Typography>
                        <Typography variant="body2" gutterBottom className={styles.subTitle}>
                            Sakura JDG Introduction
                        </Typography>
                        <Box className={styles.flexBox} sx={{ marginBottom: '20px' }}>
                            <LocationOnIcon sx={{ width: '30px', height: '18px' }} className={styles.subTitle} />
                            <Box>
                                <Typography variant="body2" gutterBottom className={styles.subTitle}>
                                    Address:
                                </Typography>
                                <Typography variant="body2" gutterBottom className={styles.subTitle}>
                                    Sample Address
                                </Typography>
                            </Box>
                        </Box>
                        <Box className={styles.flexBox}>
                            <LocalPhoneIcon sx={{ width: '30px', height: '18px' }} className={styles.subTitle} />
                            <Box>
                                <Typography variant="body2" gutterBottom className={styles.subTitle}>
                                    Phone:
                                </Typography>
                                <Typography variant="body2" gutterBottom className={styles.subTitle}>
                                    Sample Phone Number
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" gutterBottom className={styles.headerFooter}>
                            FOLLOW US
                        </Typography>
                        <Box className={styles.flexBox}>
                            <FacebookIcon className={styles.subTitle} />
                        </Box>
                    </Grid>
                    <Grid item xs={4} alignItems="center">
                        <Typography variant="h5" gutterBottom className={styles.headerFooter}>
                            NEWSLETTER
                        </Typography>
                        <Typography variant="body1" gutterBottom className={styles.redText}>
                            Get latest new!
                        </Typography>
                    </Grid>
                </Grid>
            </Box >
        </Box >
    )
}
