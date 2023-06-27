import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './JobCard.css'

function JobCard({ title, type, company, closingDate, district,link }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box className="wrapper">
            <Grid container style={{ borderRadius: "12px" }} onClick={handleOpen}>
                <Grid item xs>
                    <Typography variant="subtitle1">{title}</Typography>
                    <Typography variant='subtitle2'>{company}</Typography>
                </Grid>
                <Grid item xs>
                    <Grid>{type}</Grid>
                    <Grid>{district}</Grid>
                </Grid>
                <Grid item xs alignItems='flex-end'>
                    <Typography variant='subtitle2'>
                        Closing Date:
                    </Typography>
                    <Typography>
                        {closingDate}
                    </Typography>
                </Grid>
            </Grid>

            {open && (
                <Box className="popup" onClick={handleClose}>
                    <Box className="popup-content">
                        <CloseOutlinedIcon className='closeIcon' />
                        <Typography variant="h6" className='job-title'>{title}</Typography>
                        <Typography variant='subtitle2'>Company: {company}</Typography>
                        <Typography variant='subtitle2'>Job Type: {type}</Typography>
                        <Typography variant='subtitle2'>District: {district}</Typography>
                        <Typography variant='subtitle2'>Deadline: {closingDate}</Typography>
                        <Typography variant='subtitle2' className='btn'><a href={link} target="_blank" >Get application now</a></Typography>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default JobCard;
