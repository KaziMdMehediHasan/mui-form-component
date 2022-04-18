import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { IoCalendar } from "react-icons/io5";
import { initialContact } from "../DB Models/contact";
import {
  createNewContact,
  getAllCompany,
  modifyContact,
} from "../API Models/contact";
import { clear } from "@testing-library/user-event/dist/clear";
import SuccessFailureAlert from "../Resources/SuccessFailureAlert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// states for disabling
const viewModeView = "view";
const viewModeEdit = "edit";
const viewModeSave = "save";
const viewModeNew = "new";

const ManageContacts = ({ sentContact, setSentContact }) => {
  // view State

  const [viewMode, setViewMode] = useState(viewModeView);
  const [currentContact, setCurrentContact] = useState(initialContact);
  const [filteredCompany, setFilteredCompany] = useState([]);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openFailureAlert, setOpenFailureAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [subCompany, setSubCompany] = useState([]);

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
  // create a new contact function
  const handleCreateNew = () => {
    // extracting the company id
    const copyData = { ...currentContact };
    copyData.companyref = currentContact?.companyref?._id;

    console.log(copyData);
    createNewContact(copyData).then((res) => {
      if (res[0]) {
        openSuccess(res[1]);
      } else {
        openFailure(res[1]);
      }
    });
  };

  const clear = () => {
    setViewMode(viewModeView);
    setCurrentContact(initialContact);
  };
  const handleEdit = () => {
    const copyData = { ...currentContact };
    copyData.companyref = currentContact?.companyref?._id;

    console.log(copyData);
    modifyContact(copyData).then((res) => {
      if (res[0]) {
        openSuccess(res[1]);
      } else {
        openFailure(res[1]);
      }
    });
  };
  // save button action
  const handleSave = () => {
    let isValid = validateContact();
    if (isValid !== "") {
      openFailure(isValid);
      // console.log("Invalid Input");
      return;
    } else {
      if (viewMode === viewModeNew) {
        handleCreateNew();
      } else if (viewMode === viewModeSave) {
        handleEdit();
      }
      clear();
    }
  };

  // validation function

  const validateContact = () => {
    if (!currentContact?.name) {
      return "Please Insert Your Name";
    }
    if (!currentContact?.phone) {
      return "Please Insert Your Phone Number";
    }
    if (!currentContact?.email) {
      return "Please Insert Your Email";
    }
    return "";
  };

  // load all companies
  useEffect(() => {
    // filter
    const companyFilter = {
      iscustomer: currentContact.iscustomer,
      iscustomerisused: true,
      iscompany: true,
      iscompanyisused: true,
      status: true,
      statusisused: true,
    };
    getAllCompany(companyFilter).then((res) => {
      if (res[0]) {
        // console.log(res[1]);
        res[1] ? setFilteredCompany(res[1]) : setFilteredCompany([]);
      } else {
        console.log(res[1]);
      }
    });
  }, [currentContact.iscustomer]);

  // when clicking on the manage contact button this data loads
  useEffect(() => {
    if (sentContact) {
      const subCompanyFilter = {
        companyrefisused: true,
        companyref: sentContact?._id,
      };
      setCurrentContact(sentContact);
      setViewMode(viewModeEdit);
      getAllCompany(subCompanyFilter).then((res) => {
        if (res[0]) {
          res[1] ? setSubCompany(res[1]) : setSubCompany([]);
        } else {
          console.log(res[1]);
        }
      });
      setSentContact(null);
    }
  }, []);
  // to show the data
  useEffect(() => {
    console.log(currentContact);
  }, [currentContact]);

  return (
    <Grid container spacing={3}>
      <SuccessFailureAlert
        openSuccessAlert={openSuccessAlert}
        message={message}
        openFailureAlert={openFailureAlert}
        setopenSuccessAlert={setOpenSuccessAlert}
        setopenFailureAlert={setOpenFailureAlert}
      />
      {/* start of first row */}
      {/* grid item for buttons */}
      <Grid item xs={12}>
        <Box>
          <Button
            disabled={viewMode !== viewModeView}
            sx={{ margin: 1 }}
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => setViewMode(viewModeNew)}
          >
            Create New
          </Button>
          <Button
            disabled={viewMode !== viewModeEdit}
            sx={{ margin: 1 }}
            variant="contained"
            size="small"
            onClick={() => setViewMode(viewModeSave)}
          >
            Edit
          </Button>
          <Button
            disabled={viewMode === viewModeView || viewMode === viewModeEdit}
            onClick={handleSave}
            sx={{ margin: 1 }}
            variant="contained"
            size="small"
            color="success"
          >
            Save
          </Button>
          <Button
            onClick={() => clear()}
            sx={{ margin: 1 }}
            variant="contained"
            size="small"
            color="inherit"
          >
            Cancel
          </Button>
        </Box>
      </Grid>
      {/* grid for occupying extra space */}
      {/* <Grid item xs={8}></Grid> */}
      {/* end of first row */}
      {/* start of second row */}
      {/* serial number */}
      <Grid item xs={6}>
        <TextField
          // disabled={view === viewWhenLoaded || view === viewWhenSave}
          fullWidth
          size="small"
          id="outlined-read-only-input"
          value={currentContact?.serial}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      {/* checkbox */}
      <Grid item xs={6}>
        <Box sx={{ display: "flex" }}>
          {/* <FormGroup> */}
          <FormControlLabel
            disabled={viewMode === viewModeView || viewMode === viewModeEdit}
            size="small"
            control={<Checkbox color="success" />}
            label="Local"
            value={currentContact?.islocal}
            onChange={(e) =>
              setCurrentContact({
                ...currentContact,
                islocal: e.target.checked,
              })
            }
          />
          <FormControlLabel
            disabled={viewMode === viewModeView || viewMode === viewModeEdit}
            size="small"
            control={<Checkbox color="success" />}
            label="Global"
            value={currentContact?.isglobal}
            onChange={(e) =>
              setCurrentContact({
                ...currentContact,
                isglobal: e.target.checked,
              })
            }
          />
          {/* </FormGroup> */}
        </Box>
      </Grid>
      {/* end of second row */}
      {/* third row starts here */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Grid container spacing={1}>
            {/* first nested row starts here */}
            <Grid item xs={5}></Grid>
            <Grid
              item
              xs={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {" "}
              <FormControlLabel
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                control={
                  <Switch
                    size="small"
                    checked={currentContact?.status}
                    onChange={(e) =>
                      setCurrentContact({
                        ...currentContact,
                        status: e.target.checked,
                      })
                    }
                    color="success"
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={5}></Grid>
            {/* first nested row ends here */}
            {/* second nested row starts here */}
            <Grid item xs={6}>
              {/* name field */}
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                required
                id="outlined-basic"
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.name}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setCurrentContact({
                    ...currentContact,
                    name: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disabled={
                  viewMode === viewModeView ||
                  viewMode === viewModeEdit ||
                  currentContact.iscompany === true
                }
                fullWidth
                disablePortal
                id="combo-box-demo"
                value={currentContact.companyref}
                options={filteredCompany}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Company" />
                )}
                size="small"
                onChange={(e, newValue) => {
                  // console.log(newValue);
                  setCurrentContact({
                    ...currentContact,
                    companyref: newValue,
                  });
                }}
              />
            </Grid>
            {/* second nested row ends here */}
            {/* 3rd nested row starts here */}
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <FormControl
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
              >
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Customer or Supplier
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={currentContact?.iscustomer ? "customer" : "supplier"}
                  onChange={(e) => {
                    setCurrentContact({
                      ...currentContact,
                      iscustomer: e.target.value === "customer" ? true : false,
                    });
                    // console.log(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="customer"
                    control={<Radio color="success" />}
                    label="Customer"
                  />
                  <FormControlLabel
                    value="supplier"
                    control={<Radio color="success" />}
                    label="Supplier"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <FormControl
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
              >
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Company or Individual
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={currentContact?.iscompany ? "company" : "individual"}
                  onChange={(e) =>
                    setCurrentContact({
                      ...currentContact,
                      iscompany: e.target.value === "company" ? true : false,
                      companyref: null,
                    })
                  }
                >
                  <FormControlLabel
                    value="company"
                    control={<Radio color="success" />}
                    label="Company"
                  />
                  <FormControlLabel
                    value="individual"
                    control={<Radio color="success" />}
                    label="Individual"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* 3rd nested row ends here */}
            {/* 4th nested row starts here */}
            <Grid item xs={4}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.phone}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    phone: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Mobile"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.mobile}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    mobile: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.email}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    email: e.target.value,
                  })
                }
              />
            </Grid>
            {/* 4th nested row ends here */}
            {/* 5th nested row starts here */}
            <Grid item xs={12}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Website"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.website}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    website: e.target.value,
                  })
                }
              />
            </Grid>
            {/* 5th nested row ends here */}
            {/* 6th nested row ends here */}
            <Grid item xs={12}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Address"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.address}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    address: e.target.value,
                  })
                }
              />
            </Grid>
            {/* 6th nested row ends here */}
            {/* 7th nested row starts here */}
            <Grid item xs={6}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Government"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.government}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    government: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Area"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.area}
                onChange={(e) =>
                  setCurrentContact({ ...currentContact, area: e.target.value })
                }
              />
            </Grid>
            {/* 7th nested row ends here */}
            {/* 8th nested row starts here */}
            <Grid item xs={12}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Taxes Number"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.taxesnumber}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    taxesnumber: e.target.value,
                  })
                }
              />
            </Grid>
            {/* 8th nested row ends here */}
            {/* 9th nested row starts here */}
            <Grid item xs={6}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Job Title"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.jobtitle}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    jobtitle: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Title"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.title}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    title: e.target.value,
                  })
                }
              />
            </Grid>
            {/* 9th nested row ends here */}
            {/* 10th nested row starts here */}
            <Grid item xs={12}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-basic"
                label="Registration Number"
                variant="outlined"
                fullWidth
                size="small"
                value={currentContact?.registrationnumber}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    registrationnumber: e.target.value,
                  })
                }
              />
            </Grid>
            {/* 10th nested row ends here */}
            {/* 11th nested row starts here */}
            <Grid item xs={4}>
              <FormControl
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                fullWidth
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Maximum Debt Limit
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={currentContact?.maxdebitlimit}
                  onChange={(e) =>
                    setCurrentContact({
                      ...currentContact,
                      maxdebitlimit: parseFloat(e.target.value),
                    })
                  }
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Maximum Debt Limit"
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                fullWidth
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Invoice Due Period
                </InputLabel>
                <OutlinedInput
                  inputProps={{ min: 0 }}
                  type="number"
                  id="outlined-adornment-amount"
                  value={currentContact?.invoicedueperiod}
                  onChange={(e) =>
                    setCurrentContact({
                      ...currentContact,
                      invoicedueperiod: parseInt(e.target.value),
                    })
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <IoCalendar />
                    </InputAdornment>
                  }
                  label="Invoice Due Period"
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                fullWidth
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Discount Percentage
                </InputLabel>
                <OutlinedInput
                  inputProps={{ min: 0 }}
                  type="number"
                  id="outlined-adornment-amount"
                  value={currentContact?.discountpercentage}
                  onChange={(e) =>
                    setCurrentContact({
                      ...currentContact,
                      discountpercentage: parseInt(e.target.value),
                    })
                  }
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Discount Percentage"
                />
              </FormControl>
            </Grid>
            {/* 11th nested row ends here */}
            {/* 12th nested row starts here */}
            <Grid item xs={12}>
              <TextField
                disabled={
                  viewMode === viewModeView || viewMode === viewModeEdit
                }
                id="outlined-multiline-flexible"
                label="Payment Policy"
                fullWidth
                size="small"
                rows={2}
                multiline
                value={currentContact?.paymentpolicy}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    paymentpolicy: e.target.value,
                  })
                }
              />
            </Grid>
            {/* 12th nested row ends here */}
          </Grid>
        </Paper>
      </Grid>
      {/* third row ends here */}
      <Grid item xs={12} md={12}>
        {subCompany.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Website</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subCompany?.map((company, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {company?.name}
                    </TableCell>
                    <TableCell align="right">{company?.phone}</TableCell>
                    <TableCell align="right">{company?.website}</TableCell>
                    <TableCell align="right">{company?.email}</TableCell>
                    <TableCell align="right">{company?.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default ManageContacts;
