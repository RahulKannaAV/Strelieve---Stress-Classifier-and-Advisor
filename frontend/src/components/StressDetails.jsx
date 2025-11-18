import Typography from '@mui/material/Typography';
import '../css/Survey.css';
import './QuestionProgress';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

const StressDetails = ({stress}) => {
    const [stressType, setStressType] = useState(stress);

    return (
    <div className="survey-card">
        <Grid sx={{
            margin: "20px 0px 0px 20px" 
        }}> 
            <Typography variant='h3' sx={{
                                fontWeight: "bolder",
            }}>
                Type of Stress
            </Typography>
            <Typography variant='h2' sx={{
                textAlign: "center",
                fontWeight: "bolder",
                color: stressType == "Eustress" ? "green" : (stressType == "Distress" ? "red" : "black")
            }}>
                {stressType}
            </Typography>
            <Box sx={{
                width: "100vw",
                height: "60px"
            }}>

            </Box>
            <Typography variant='h3' sx={{
                fontWeight: "bolder"
            }}>
                Why is it caused?
            </Typography>
            <Typography variant='h5' sx={{paddingTop: "20px"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your rapid heartbeat is caused by the stimulating situations you\'re facing, which are exciting and engaging for you
            </Typography>

            <Box sx={{
                width: "100vw",
                height: "60px"
            }}>

            </Box>
            <Typography variant='h3' sx={{
                fontWeight: "bolder"
            }}>
                Advantages of this Stress
            </Typography>
            <Typography variant='h5' sx={{paddingTop: "20px"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Increased energy and motivation
            </Typography>
            <Typography variant='h5' sx={{paddingTop: "20px"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Improved focus and concentration
            </Typography>

            <Box sx={{
                width: "100vw",
                height: "60px"
            }}>

            </Box>
            <Typography variant='h3' sx={{
                fontWeight: "bolder"
            }}>
                Disadvantages of this Stress
            </Typography>
                <Typography variant='h5' sx={{paddingTop: "20px"}}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Potential burnout if not managed
                </Typography>
                <Typography variant='h5' sx={{paddingTop: "20px"}}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Possible decreased performance under pressure
                </Typography>
                <Typography variant='h5' sx={{paddingTop: "20px"}}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Negative impact on relationships and overall well-being
                </Typography>
            
                <Box sx={{
                width: "100vw",
                height: "60px"
            }}>

            </Box>
            <Typography variant='h3' sx={{
                fontWeight: "bolder"
            }}>
                Stress Score
            </Typography>
            <Typography variant='h4' sx={{textAlign: "center",
                color: "orange",
                fontWeight: "bolder"
            }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Moderate (4/10)
            </Typography>

            <Box sx={{
                width: "100vw",
                height: "60px"
            }}>

            </Box>
            <Typography variant='h3' sx={{
                fontWeight: "bolder"
            }}>
                Ways to Overcome / Cope with the Stress
            </Typography>
            <Typography variant='h5' sx={{paddingTop: "20px"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Take regular breaks to relax and recharge
            </Typography>
            <Typography variant='h5' sx={{paddingTop: "20px"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Prioritize self-care activities, such as exercise or meditation
            </Typography>
            <Typography variant='h5' sx={{paddingTop: "20px"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Set realistic goals and deadlines to manage expectations
            </Typography>

            <Box sx={{
                width: "100vw",
                height: "60px"
            }}>

            </Box>

            <div style={{
                display: "flex"
            }}>
            <Button color='primary' variant='contained' sx={{
                marginLeft: "45%"
            }}>
                GO Back
            </Button>
            </div>
        </Grid>
    </div>);
}

export default StressDetails;