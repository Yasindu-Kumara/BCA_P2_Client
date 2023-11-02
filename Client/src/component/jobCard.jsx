import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddLocationIcon from "@mui/icons-material/AddLocation";

export default function JobCard(props) {
  const [openDialog, setOpenDialog] = useState(false);

  const imageURL =
    "https://www.monlife.co.uk/wp-content/uploads/2022/12/Homepage-Sidebar-01-1.png";

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Card elevation={2}>
        <CardContent>
          <Typography>
            <AddLocationIcon sx={{ fontSize: "small" }} />
            Remote
          </Typography>
          <Typography variant="h6">{props.title}</Typography>
          <Typography variant="body1">{props.sDiscription}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
          >
            MORE DETAILS
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle variant="h4" align="center">
          Job Details
        </DialogTitle>
        <DialogContent>
          <img
            src={imageURL}
            alt="Image"
            style={{
              width: "100%",
              height: "30%",
              objectFit: "cover",
            }}
          />

          <Typography align="center" variant="h6">{props.title}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>Company Name:</Typography>
          <Typography variant="body1">{props.Company}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>Description:</Typography>
          <Typography variant="body1">{props.Description}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>Requirements:</Typography>
          <Typography variant="body1">{props.Requirements}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>Benefits:</Typography>
          <Typography variant="body1"> {props.Benefits}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>Email:</Typography>
          <Typography variant="body1"> {props.Email}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>Website:</Typography>
          <Typography variant="body1"> {props.Website}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
