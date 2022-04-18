import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TableBody,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Switch from "@mui/material/Switch";
import ArticleIcon from "@mui/icons-material/Article";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoIosPaper, IoIosSearch, IoIosBusiness } from "react-icons/io";
import {
  getAllCompany,
  statusChange,
  viewAllContacts,
} from "../API Models/contact";
import { useState } from "react";
import { initialSearch } from "../DB Models/contact";
import SuccessFailureAlert from "../Resources/SuccessFailureAlert";
import SubContactsDialog from "./SubContactsDialog";

const ownerType = [{ label: "Company" }, { label: "Individual" }];

// modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "50vh",
  overflowY: "scroll",

  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// modal table head style
const tableHeadStyle = {
  backgroundColor: "#aaa",
  position: "sticky",
  top: 0,
};
const ViewContacts = ({ setValue, setSentContact }) => {
  // state for all contacts
  const [allContacts, setAllContacts] = useState([]);
  const [searchContact, setSearchContact] = useState(initialSearch);
  const [open, setOpen] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openFailureAlert, setOpenFailureAlert] = useState(false);
  const [message, setMessage] = useState("");

  // success and failure message
  const openFailure = (message) => {
    setMessage("");
    setOpenSuccessAlert(false);
    setOpenFailureAlert(true);
    setMessage(message);
  };
  const openSuccess = (message) => {
    setMessage("");
    setOpenSuccessAlert(true);
    setOpenFailureAlert(false);
    setMessage(message);
  };
  // modal handler
  const handleOpen = (id) => {
    const companyFilter = {
      companyref: id,
      companyrefisused: true,
    };
    setOpen(true);
    getAllCompany(companyFilter).then((res) => {
      if (res[0]) {
        res[1] ? setCompanyData(res[1]) : setCompanyData([]);
        setOpen(true);
      }
    });
  };

  // end of modal handler
  const handleSearch = () => {
    let copyData = { ...searchContact };
    // condition on customer type
    if (searchContact?.type === "Customer") {
      copyData.iscustomer = true;
    } else if (searchContact?.type === "Supplier") {
      copyData.iscustomer = false;
    }

    // condition on status type
    if (searchContact?.statustype === "Active") {
      copyData.status = true;
    } else if (searchContact?.statustype === "Inactive") {
      copyData.status = false;
    }
    getAllCompany(copyData).then((res) => {
      if (res[0]) {
        res[1] ? setAllContacts(res[1]) : setAllContacts([]);
      }
    });
  };

  // status change function

  const handleStatusChange = (id, status) => {
    const isActive = status ? "active" : "inactive";
    statusChange(id, isActive).then((res) => {
      if (res[0]) {
        console.log(res[1]);
        getAllContacts();
      } else {
        console.log(res[1]);
      }
    });
  };

  // get all contacts from backend
  const getAllContacts = () => {
    viewAllContacts().then((res) => {
      if (res[0]) {
        console.log(res[1]);
        // for error handling we use condition
        res[1] ? setAllContacts(res[1]) : setAllContacts([]);
      } else {
        console.log(res[1]);
      }
    });
  };

  // useEffect for fetching data on page load
  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <Grid container spacing={2}>
      <SuccessFailureAlert
        openSuccessAlert={openSuccessAlert}
        message={message}
        openFailureAlert={openFailureAlert}
        setopenSuccessAlert={setOpenSuccessAlert}
        setopenFailureAlert={setOpenFailureAlert}
      />
      {/* upper search fields */}
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
                value={searchContact?.name}
                onChange={(e) =>
                  setSearchContact({
                    ...searchContact,
                    name: e.target.value,
                    nameisused: Boolean(e.target.value),
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                id="outlined-basic"
                label="Search By Mobile"
                variant="outlined"
                size="small"
                fullWidth
                value={searchContact?.mobile}
                onChange={(e) =>
                  setSearchContact({
                    ...searchContact,
                    mobile: e.target.value,
                    mobileisused: Boolean(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={6} md={2}>
              {" "}
              <TextField
                id="outlined-basic"
                label="Search By Email"
                variant="outlined"
                size="small"
                fullWidth
                value={searchContact?.email}
                onChange={(e) =>
                  setSearchContact({
                    ...searchContact,
                    email: e.target.value,
                    emailisused: Boolean(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={6} md={2}>
              {" "}
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={["Customer", "Supplier"]}
                getOptionLabel={(option) => option}
                value={searchContact?.type}
                onChange={(e, newValue) =>
                  setSearchContact({
                    ...searchContact,
                    type: newValue,
                    iscustomerisused: Boolean(newValue),
                  })
                }
                renderInput={(params) => <TextField {...params} label="Type" />}
                size="small"
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={["Active", "Inactive"]}
                getOptionLabel={(option) => option}
                value={searchContact?.statustype}
                onChange={(e, newValue) =>
                  setSearchContact({
                    ...searchContact,
                    statustype: newValue,
                    statusisused: Boolean(newValue),
                  })
                }
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
                options={["Company", "Individual"]}
                renderInput={(params) => (
                  <TextField {...params} label="Owner" />
                )}
                size="small"
                value={searchContact?.ownertype}
                onChange={(e, newValue) =>
                  setSearchContact({
                    ...searchContact,
                    ownertype: newValue,
                    iscompanyisused: Boolean(newValue),
                    iscompany: newValue === "Company" ? true : false,
                  })
                }
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                id="outlined-basic"
                label="Search By Serial"
                variant="outlined"
                size="small"
                fullWidth
                value={searchContact?.serial}
                onChange={(e) =>
                  setSearchContact({
                    ...searchContact,
                    serial: e.target.value,
                    serialnumberisused: Boolean(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Box sx={{ display: "flex" }}>
                {/* <FormGroup> */}
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox
                      size="small"
                      value={searchContact?.islocal}
                      onChange={(e) =>
                        setSearchContact({
                          ...searchContact,
                          islocal: e.target.checked,
                          islocalisused: e.target.checked,
                        })
                      }
                      color="success"
                    />
                  }
                  label="Local"
                />
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox
                      size="small"
                      value={searchContact?.isglobal}
                      onChange={(e) =>
                        setSearchContact({
                          ...searchContact,
                          isglobal: e.target.checked,
                          isglobalisused: e.target.checked,
                        })
                      }
                      color="success"
                    />
                  }
                  label="Global"
                />
                {/* </FormGroup> */}
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                onClick={handleSearch}
                variant="contained"
                sx={{ marginRight: 1 }}
              >
                <IoIosSearch size="1.5rem" />
              </Button>
              <Button
                onClick={() => {
                  setSearchContact(initialSearch);
                  getAllContacts();
                }}
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
      {/* end of upper search fields */}
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
              {allContacts?.map((contact) => (
                <TableRow
                  key={contact?._id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {/* manage contact button */}
                      <Tooltip title="Manage Contact">
                        <Button
                          onClick={() => {
                            setValue(0);
                            setSentContact(contact);
                          }}
                          sx={{ marginRight: 0.5 }}
                          variant="contained"
                        >
                          <IoIosPaper />
                        </Button>
                      </Tooltip>
                      {/* show customer button */}
                      <Tooltip title="Show Customers">
                        <Button
                          disabled={!contact?.iscompany}
                          variant="contained"
                          color="error"
                          onClick={() => handleOpen(contact?._id)}
                        >
                          <IoIosBusiness />
                        </Button>
                      </Tooltip>

                      {/* action switch */}
                      <Switch
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                        checked={contact?.status}
                        onChange={(e) =>
                          handleStatusChange(contact?._id, e.target.checked)
                        }
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {contact?.iscompany
                      ? `${contact?.name} (C)`
                      : contact?.name}
                  </TableCell>
                  <TableCell align="right">{contact?.serial}</TableCell>
                  <TableCell align="right">{contact?.phone}</TableCell>
                  <TableCell align="right">{contact?.mobile}</TableCell>
                  <TableCell align="right">{contact?.email}</TableCell>
                  <TableCell align="right">
                    {contact?.iscustomer ? "Customer" : "Supplier"}
                  </TableCell>
                  <TableCell align="right">
                    <span
                      style={
                        contact?.status ? { color: "green" } : { color: "red" }
                      }
                    >
                      {contact?.status ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* dialogue*/}
      <SubContactsDialog
        open={open}
        setOpen={setOpen}
        companyData={companyData}
      />
      {/* end of modal */}
    </Grid>
  );
};

export default ViewContacts;
