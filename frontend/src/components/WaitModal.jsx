import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const WaitModal = ({shouldOpen, message}) => {
    
  const [open, setOpen] = React.useState(shouldOpen);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


    return (
        <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  sx={{
    borderRadius: "20px",
  }}
>
  <Box sx={style}>
  <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }}>
                <img src={"stress.jpg"} style={{
                    width: "80px",
                    height: "80px",
                    marginRight: "20px"
                }} />
                <Typography variant='h2' sx={{
                textAlign: "center",
                color: "blue",
                fontWeight: "bold",
                fontFamily: "Segoe UI",
                paddingBottom: "25px"
            }}>                         
                
                STRELIEVE
                </Typography>
            </div>

    <Typography variant="h4" sx={{
      textAlign: "center"
    }}component="h2">
      {message}
    </Typography>
  </Box>
</Modal>
    )
}

export default WaitModal;