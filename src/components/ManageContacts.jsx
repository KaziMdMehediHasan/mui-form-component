import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { blue, grey, pink, red, teal } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
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
// custom colors using theme
const theme = createTheme({
  palette: {
    primary: {
      main: grey[300],
      secondary: blue[200],
    },
    secondary: pink,
    success: teal,
  },
});

// autocomplete options
const companyNames = [
  { label: "Software", count: 2 },
  { label: "Graphics", count: 5 },
  { label: "Video", count: 1 },
];
const ManageContacts = () => {
  // radio buttons state
  const [customer, setCustomer] = useState("");
  const [company, setCompany] = useState("");

  // amount state

  const [values, setValues] = useState({
    debtLimit: "0",
    discountPercent: "0",
    due: "0",
  });

  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  // value change function
  const handleValueChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <ThemeProvider theme={theme}>
      {/* main grid container where all the other grids reside */}
      <Grid container spacing={3}>
        {/* start of first row */}
        {/* grid item for buttons */}
        <Grid item xs={4}>
          <Box>
            <Button
              sx={{ margin: 1 }}
              variant="contained"
              size="small"
              color="secondary"
            >
              Create New
            </Button>
            <Button sx={{ margin: 1 }} variant="contained" size="small">
              Edit
            </Button>
            <Button
              sx={{ margin: 1 }}
              variant="contained"
              size="small"
              color="success"
            >
              Save
            </Button>
            <Button sx={{ margin: 1 }} variant="contained" size="small">
              Cancel
            </Button>
          </Box>
        </Grid>
        {/* grid for occupying extra space */}
        <Grid item xs={8}></Grid>
        {/* end of first row */}
        {/* <!------  xxxx--------> */}
        {/* start of second row */}
        {/* serial number */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            id="outlined-read-only-input"
            value="Serial Number"
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
                  control={<Switch defaultChecked color="success" />}
                  label="Active"
                />
              </Grid>
              <Grid item xs={5}></Grid>
              {/* first nested row ends here */}
              {/* second nested row starts here */}
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="combo-box-demo"
                  options={companyNames}
                  renderInput={(params) => (
                    <TextField {...params} label="Company" />
                  )}
                  size="small"
                />
              </Grid>
              {/* second nested row ends here */}
              {/* 3rd nested row starts here */}
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Customer or Supplier
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={customer}
                    onChange={handleCustomerChange}
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
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Company or Individual
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={company}
                    onChange={handleCompanyChange}
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
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              {/* 4th nested row ends here */}
              {/* 5th nested row starts here */}
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Website"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              {/* 5th nested row ends here */}
              {/* 6th nested row ends here */}
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              {/* 6th nested row ends here */}
              {/* 7th nested row starts here */}
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Government"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Area"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              {/* 7th nested row ends here */}
              {/* 8th nested row starts here */}
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Taxes Number"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              {/* 8th nested row ends here */}
              {/* 9th nested row starts here */}
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Job Title"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              {/* 9th nested row ends here */}
              {/* 10th nested row starts here */}
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Registration Number"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </Grid>
              {/* 10th nested row ends here */}
              {/* 11th nested row starts here */}
              <Grid item xs={4}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Maximum Debt Limit
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.debtLimit}
                    onChange={handleValueChange("debtLimit")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Invoice Due Period
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.due}
                    onChange={handleValueChange("due")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Discount Percentage
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={values.discountPercent}
                    onChange={handleValueChange("discountPercent")}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>
              </Grid>
              {/* 11th nested row ends here */}
              {/* 12th nested row starts here */}
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Payment Policy"
                  fullWidth
                  size="small"
                  rows={2}
                  multiline
                />
              </Grid>
              {/* 12th nested row ends here */}
            </Grid>
          </Paper>
        </Grid>
        {/* third row ends here */}
      </Grid>
    </ThemeProvider>
  );
};

export default ManageContacts;
