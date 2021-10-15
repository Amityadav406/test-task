import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
  Toolbar,
  CircularProgress,
} from '@mui/material'
import styled from "styled-components";
import { useFetch } from '../../hooks';

export default function Dashboard() {
  const token = localStorage.getItem("user-data")
  const { isLoading: isLoading, response: data } = useFetch(
    "admin/get-list",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );
  console.log(data)
  return (
    <React.Fragment>
      <Paper elevation={3}>
        <StyledToolbar>
          <Typography variant="h6" id="tableTitle" component="div">
            Text Data
          </Typography>
        </StyledToolbar>
        <Divider />
        <Divider />

        {(() => {
          if (isLoading) {
            return <CircularProgress />;
          }

          if (data && data.data.length) {
            return (
              <React.Fragment>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>DOB</TableCell>
                        <TableCell>Nationality</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {data.data.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {item.id}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.first_name}{' '}{item.last_name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.dob}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.nationality}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.phone}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.email}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
              </React.Fragment>
            );
          }
        })()}
      </Paper>
    </React.Fragment>
  );
}
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isSelected === "true" ? "#eee" : "white"};
`;