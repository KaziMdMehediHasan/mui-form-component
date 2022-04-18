import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import ManageContacts from "./ManageContacts";
import ViewContacts from "./ViewContacts";
import { viewAllContacts } from "../API Models/contact";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// actual parent component starts from here
const ParentContact = () => {
  const theme = useTheme();
  // initial state for the tab value
  const [value, setValue] = useState(0);

  const [sentContact, setSentContact] = useState(null);

  // this function changes the tab by setting new value to the state
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Grid container>
      <Box sx={{ width: "100%" }}>
        {/* box that contains the tab headers*/}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "#3949ab",
            color: "#fff",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab label="Manage Contacts" {...a11yProps(0)} />
            <Tab label="View Contacts" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Grid item></Grid>

        {/* swipeable view adds transition effect while changing the tabs */}
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <ManageContacts
              setSentContact={setSentContact}
              sentContact={sentContact}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ViewContacts setValue={setValue} setSentContact={setSentContact} />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Grid>
  );
};

export default ParentContact;
