import {
  Card,
  CardActions,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import React, { useState } from "react";

export default function FilterCard({ setSelectedCategory }) {
  const [Category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    setSelectedCategory(event.target.value); 
  };

  return (
    <Card>
      <CardContent>
        <Typography>Filter Job By Category</Typography>
      </CardContent>
      <CardActions>
        <FormControl sx={{ m: 1, minWidth: 400 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={Category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Engineering"}>Engineering</MenuItem>
            <MenuItem value={"Data Science"}>Data Science</MenuItem>
            <MenuItem value={"Account Management"}>Account Management</MenuItem>
            <MenuItem value={"Sales"}>Sales</MenuItem>
            <MenuItem value={"Frontend"}>Frontend</MenuItem>
            <MenuItem value={"Backend"}>Backend</MenuItem>
            <MenuItem value={"Fullstack"}>Fullstack</MenuItem>
            <MenuItem value={"Design"}>Design</MenuItem>
            <MenuItem value={"Product"}>Product</MenuItem>
          </Select>
        </FormControl>
      </CardActions>
    </Card>
  );
}
