import {
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

const SubContactsDialog = ({ open, setOpen, companyData }) => {
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle>Sub Contacts</DialogTitle>
      <DialogContent>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ backgroundColor: "#aaa" }}>
                <TableRow>
                  {/* {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))} */}
                  <TableCell sx={{ backgroundColor: "#aaa" }}>Name</TableCell>
                  <TableCell sx={{ backgroundColor: "#aaa" }} align="right">
                    Website
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#aaa" }} align="right">
                    Phone
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#aaa" }} align="right">
                    Mobile
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#aaa" }} align="right">
                    Email
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#aaa" }} align="right">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((company, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {/* {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })} */}
                        <TableCell>{company?.name}</TableCell>
                        <TableCell align="right">{company?.website}</TableCell>
                        <TableCell align="right">{company?.phone}</TableCell>
                        <TableCell align="right">{company?.mobile}</TableCell>
                        <TableCell align="right">{company?.email}</TableCell>
                        <TableCell align="right">
                          {company?.status ? "Active" : "Inactive"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={companyData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default SubContactsDialog;
