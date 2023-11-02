import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import UpdateJobDialog from "./updateJobDialog";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const columns = [
  { id: "_id", label: "ID", minWidth: 170 },
  { id: "Title", label: "Title", minWidth: 100 },
  {
    id: "Category",
    label: "Category",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Company",
    label: "Company",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ShortDescription",
    label: "ShortDescription",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Description",
    label: "Description",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Requirements",
    label: "Requirements",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Benefits",
    label: "Benefits",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Email",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Website",
    label: "Website",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "actions",
    label: "Actions",
    align: "right",
    minWidth: 100,
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [jobs, setJobs] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false);
  const [selectedJobData, setSelectedJobData] = React.useState("");
  const [newJobData, setNewJobData] = React.useState({
    Title: "",
    Category: "",
    Company: "",
    ShortDescription: "",
    Description: "",
    Requirements: "",
    Benefits: "",
    Email: "",
    Website: "",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://bca-p1.onrender.com/adminpanel");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJobData({ ...newJobData, [name]: value });
  };

  const handleCreateNewJob = async () => {
    try {
      await axios.post("https://bca-p1.onrender.com/adminpanel", {
        newJobData,
      });
      setIsDialogOpen(false);
    } catch (e) {
      alert("Error");
      console.log(e);
    }
  };

  const handleEdit = (row) => {
    setSelectedJobData(row);
    setIsUpdateDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bca-p1.onrender.com/adminpanel?id=${id}`);
      alert("Data is deleted");
    } catch (e) {
      alert("Error");
      console.log(e);
    }
  };

  const handleUpdate = async (updatedData) => {
   await axios
      .put(`https://bca-p1.onrender.com/adminpanel/${updatedData._id}`, updatedData)
      .then((response) => {
        alert("Data is updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddBoxIcon />}
        sx={{ mb: 2 }}
        onClick={handleOpenDialog}
      >
        Add New Job
      </Button>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "actions" ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <IconButton
                                  aria-label="edit"
                                  color="primary"
                                  onClick={() => handleEdit(row)}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  color="secondary"
                                  onClick={() => handleDelete(row._id)}
                                >
                                  <Delete />
                                </IconButton>
                              </div>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={jobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Job</DialogTitle>
        <DialogContent>
          <TextField
            id="fullWidth"
            label="Title"
            name="Title"
            value={newJobData.Title}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Category"
            name="Category"
            value={newJobData.Category}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Company"
            name="Company"
            value={newJobData.Company}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="ShortDescription"
            name="ShortDescription"
            value={newJobData.ShortDescription}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Description"
            name="Description"
            value={newJobData.Description}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Requirements"
            name="Requirements"
            value={newJobData.Requirements}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Benefits"
            name="Benefits"
            value={newJobData.Benefits}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Email"
            name="Email"
            value={newJobData.Email}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
          <TextField
            id="fullWidth"
            label="Website"
            name="Website"
            value={newJobData.Website}
            onChange={handleInputChange}
            sx={{ my: 2 }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateNewJob} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <UpdateJobDialog
        open={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        jobData={selectedJobData} 
        onUpdate={handleUpdate}
      />
    </>
  );
}
