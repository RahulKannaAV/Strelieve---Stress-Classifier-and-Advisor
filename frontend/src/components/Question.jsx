
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Question = ({number, text}) => {
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
            {text} </InputLabel>
            <OutlinedInput
                fullWidth
                id="outlined-adornment-amount"
                placeholder={`Share your experience within 1 or 2 lines`}
                label="Amount"
            />
        </Grid>
    )
}

export default Question;