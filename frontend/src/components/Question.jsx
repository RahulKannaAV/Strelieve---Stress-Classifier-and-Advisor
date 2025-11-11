
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";


const Question = ({ number, qKey, questionText, responseHandler, prevVal}) => {
    const [value, setValue] = useState(prevVal);

    useEffect(() => {
      setValue(prevVal);  
    })

    const handleTextChange = (evt) => {
        setValue(evt.target.value);
        responseHandler(qKey, evt.target.value);
    }

   

    return (
        <Grid sx={{
            margin: "20px 0px 0px 20px" 
        }}>{}
          <InputLabel
          sx={{
            fontWeight: "bold",
            fontSize: 25,
            marginBottom: "10px"
          }}
          > 
            <Typography display="inline" variant="h3" fontWeight="bold">
                {number})&nbsp;
            </Typography>
            {questionText} </InputLabel>
            <OutlinedInput
                key={qKey}
                fullWidth
                id="outlined-adornment-amount"
                value={value}
                onChange={handleTextChange}
                placeholder={`Share your experience within 1 or 2 lines`}
                label="Amount"
            />
        </Grid>
    )
}

export default Question;