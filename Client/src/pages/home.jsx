import React, { useState, useEffect } from "react";
import DrawerAppBar from "../component/appBar";
import JobCard from "../component/jobCard";
import FilterCard from "../component/filterCard";
import { Grid, Stack} from "@mui/material";
import axios from "axios";

export default function Home() {
  const [Data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = selectedCategory
    ? Data.filter((job) => job.Category === selectedCategory)
    : Data;

  return (
    <>
      <DrawerAppBar />
      <Grid container spacing={5} paddingX={10}>
        <Grid item xs={4}>
          <FilterCard setSelectedCategory={setSelectedCategory} />
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            {filteredData.map((job) => (
              <JobCard
                key={job._id}
                title={job.Title}
                sDiscription={job.ShortDescription}
                Company={job.Company}
                Description={job.Description}
                Requirements={job.Requirements}
                Benefits={job.Benefits}
                Email={job.Email}
                Website={job.Website}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
