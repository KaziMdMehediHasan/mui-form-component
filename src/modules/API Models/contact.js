import axios from "axios";
import { apiBaseUrl } from "../../config";

// function for viewing all the contacts
const viewAllContacts = async () => {
  try {
    let response = await axios({
      method: "POST",
      url: `${apiBaseUrl}/contact/get_all_populated`,
      headers: { "Content-Type": "application/json" },
    });
    return [true, response?.data?.result];
  } catch (err) {
    return [false, err?.response?.data];
  }
};

// function for changing status
const statusChange = async (id, status) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${apiBaseUrl}/contact/set_status/${id}/${status}`,
      headers: { "Content-Type": "application/json" },
    });
    return [true, response?.data];
  } catch (err) {
    return [false, err?.response?.data];
  }
};

const getAllCompany = async (filter) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${apiBaseUrl}/contact/get_all_populated`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(filter),
    });
    return [true, response?.data?.result];
  } catch (err) {
    return [false, err?.response?.data];
  }
};

const createNewContact = async (newContact) => {
  try {
    let response = await axios({
      method: "POST",
      url: `${apiBaseUrl}/contact/new`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(newContact),
    });
    return [true, "Contact created successfully!"];
  } catch (err) {
    return [false, err?.response?.data];
  }
};

const modifyContact = async (modifiedContact) => {
  try {
    let response = await axios({
      method: "PUT",
      url: `${apiBaseUrl}/contact/modify/${modifiedContact?._id}`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(modifiedContact),
    });
    return [true, "Contact Modified successfully!"];
  } catch (err) {
    return [false, err?.response?.data];
  }
};

export {
  viewAllContacts,
  statusChange,
  getAllCompany,
  createNewContact,
  modifyContact,
};
