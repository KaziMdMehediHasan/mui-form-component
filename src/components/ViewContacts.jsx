import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TableBody,
  TextField,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Switch from "@mui/material/Switch";
import ArticleIcon from "@mui/icons-material/Article";
import { Box } from "@mui/system";
import { IoIosPaper, IoIosSearch } from "react-icons/io";

const customerType = [{ label: "Customer" }, { label: "Supplier" }];

const statusType = [{ label: "Active" }, { label: "Inactive" }];

const ownerType = [{ label: "Company" }, { label: "Individual" }];
// table data creation

function createData(name, serial, phone, mobile, email, type, status) {
  return { name, serial, phone, mobile, email, type, status };
}

// row static data
const rows = [
  createData(
    "Uber",
    1,
    "Uber Phone",
    "01154584",
    "uber@gmail.com",
    "supplier",
    "active"
  ),
  createData(
    "Pathao",
    2,
    "Pathao Phone",
    "2856548",
    "pathao@gmail.com",
    "supplier",
    "active"
  ),
  createData(
    "HungryNaki",
    3,
    "Hungry",
    "987874",
    "hungry@gmail.com",
    "supplier",
    "inactive"
  ),
  createData(
    "Evaly",
    4,
    "ePhone",
    "545521",
    "evaly@gmail.com",
    "customer",
    "inactive"
  ),
  createData(
    "Daraz",
    5,
    " Daraz Phone",
    "9645774",
    "daraz@gmail.com",
    "supplier",
    "active"
  ),
];
const ViewContacts = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{ padding: 2, display: "flex", flexWrap: "wrap" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} md={2}>
              <TextField
                id="outlined-basic"
                label="Search By Name"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                id="outlined-basic"
                label="Search By Phone"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={2}>
              {" "}
              <TextField
                id="outlined-basic"
                label="Search By Mobile"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={2}>
              {" "}
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={customerType}
                renderInput={(params) => <TextField {...params} label="Type" />}
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={statusType}
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={ownerType}
                renderInput={(params) => (
                  <TextField {...params} label="Owner" />
                )}
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                id="outlined-basic"
                label="Search By Serial"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Box sx={{ display: "flex" }}>
                {/* <FormGroup> */}
                <FormControlLabel
                  size="small"
                  control={<Checkbox color="success" />}
                  label="Label"
                />
                <FormControlLabel
                  size="small"
                  control={<Checkbox color="success" />}
                  label="Global"
                />
                {/* </FormGroup> */}
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button variant="contained" sx={{ marginRight: 1 }}>
                <IoIosSearch size="1.5rem" />
              </Button>
              <Button
                variant="outlined"
                sx={{ backgroundColor: "secondary" }}
                size="medium"
              >
                X
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "#aaa" }}>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Serial</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Mobile</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.serial}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button variant="contained">
                        <IoIosPaper />
                      </Button>

                      <Switch
                        inputProps={{ "aria-label": "controlled" }}
                        defaultChecked
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.serial}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.mobile}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ViewContacts;
