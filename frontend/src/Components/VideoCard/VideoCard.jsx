import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";

const VideoCard = ({ thumbnail, title, description, videoUrl }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ Width: 150, Height: 150 }} style={{ borderRadius: "15px" }}>
        <CardActionArea style={{ height: "200px" }} onClick={handleOpen}>
          <CardMedia
            component="img"
            height="120"
            src={thumbnail}
            alt="SLLC"
            className="videoImage"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h12"
              component="div"
              color="#FF7C78"
              className="noOfQuizzes"
            >
              {title}
            </Typography>
            <Typography
              variant="h8"
              color="#041083"
              fontWeight={500}
              className="newExamTitle"
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backdropFilter: "blur(1px)" },
        }}
      >
        <Box
          className="popup-player"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900
          }}
        >
          <Box sx={{ mt: 2 }}>
            <video controls width="100%" height="auto">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default VideoCard;
