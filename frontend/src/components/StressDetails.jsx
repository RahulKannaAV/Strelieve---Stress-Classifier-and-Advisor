import Typography from '@mui/material/Typography';
import '../css/Survey.css';
import './QuestionProgress';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

const StressDetails = ({stress, llmObject}) => {
    const [stressType, setStressType] = useState(stress);
    const [llmResponse ,setLLMResponse] = useState(JSON.parse(llmObject));

    console.log(stressType, llmResponse);
    console.log(typeof(llmResponse))

    return (
    <div className="survey-card">
        <Grid sx={{
            margin: "20px 0px 0px 20px" 
        }}> 
            <Typography variant='h4' sx={{
                                fontWeight: "bolder",
            }}>
                Type of Stress
            </Typography>
            <Typography variant='h3' sx={{
                textAlign: "center",
                fontWeight: "bolder",
                color: stressType.split(" ")[0] === "Eustress" ? "green" : (stressType.split(" ")[0] == "Distress" ? "red" : "black")
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
                {llmResponse["why_is_it_caused"]}
            </Typography>
            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your rapid heartbeat is caused by the stimulating situations you\'re facing, which are exciting and engaging for you */}

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
            {llmResponse['advantages_of_this_stress'].map((adv) => (
                <Typography variant='h5' sx={{paddingTop: "20px"}}>
                    {adv["positives"]}
                </Typography>
            ))}

            {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Increased energy and motivation*/}
         

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

                {llmResponse['disadvantages_of_this_stress'].map((disadv) => (
                    <Typography variant='h5' sx={{paddingTop: "20px"}}>
                        {disadv['negatives']}
                    </Typography>
                ))}

                {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Potential burnout if not managed*/}
                
            
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
                {llmResponse['stress_score']}
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

            {llmResponse['overcome/cope_with_this_stress'].map((tip) => (
            <Typography variant='h5' sx={{paddingTop: "20px"}}>
                {tip['tip']}
            </Typography>
            ))}

            {/*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Take regular breaks to relax and recharge*/}
            <Box sx={{
                width: "100vw",
                height: "60px"
            }}>

            </Box>

            <div style={{
                display: "flex"
            }}>
            <Button color='primary'
            onClick={() => window.location.reload()}
            variant='contained' sx={{
                marginLeft: "45%"
            }}>
                GO Back
            </Button>
            </div>
        </Grid>
    </div>);
}

export default StressDetails;