import React from "react";
import { useState,useEffect} from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function UpdateJobDialog({ open, onClose, jobData, onUpdate }) {
  const [updatedJobData, setUpdatedJobData] = useState({ ...jobData });

  useEffect(() => {
    setUpdatedJobData({ ...jobData });
  }, [jobData]);

  const handleUpdate = () => {
    const updatedDataWithId = {
      _id: jobData._id, 
      ...updatedJobData,
    };
    onUpdate(updatedDataWithId);
    onClose();
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Job</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="Title"
          value={updatedJobData.Title}
          onChange={handleInputChange}
          sx={{ my: 2 }}
          fullWidth
        />
        <TextField
          label="Category"
          name="Category"
          value={updatedJobData.Category}
          onChange={handleInputChange}
          sx={{ my: 2 }}
          fullWidth
        />
        <TextField
          label="Company"
          name="Company"
          value={updatedJobData.Company}
          onChange={handleInputChange}
          sx={{ my: 2 }}
          fullWidth
        />
        <TextField
            id="fullWidth"
            label="ShortDescription"
            name="ShortDescription"
            value={updatedJobData.ShortDescription}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Description"
            name="Description"
            value={updatedJobData.Description}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Requirements"
            name="Requirements"
            value={updatedJobData.Requirements}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Benefits"
            name="Benefits"
            value={updatedJobData.Benefits}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Email"
            name="Email"
            value={updatedJobData.Email}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Website"
            name="Website"
            value={updatedJobData.Website}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
