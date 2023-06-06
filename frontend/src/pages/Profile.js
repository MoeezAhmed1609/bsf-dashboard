import React, { useState } from "react";

// Redux Toolkit Import
import { useSelector, useDispatch } from "react-redux";

// React Router Dom Import
import { Link } from "react-router-dom";

// Material UI components
import {
  Box,
  Typography,
  colors,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Button,
  InputAdornment,
  FormControl,
  Input,
  IconButton,
  Tooltip,
} from "@mui/material";

// Material Icons
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

// Actions Import
import { deleteClient } from "../redux/actions/clientActions";

const Profile = () => {
  const dispatch = useDispatch();

  // Getting sales from redux state
  const { clientsData } = useSelector((state) => state.clients);

  const [query, setQuery] = useState("");

  const deleteClientFunc = (id) => {
    dispatch(deleteClient(id));
    window.location.reload();
  };

  return (
    <Box
      sx={{
        padding: "80px 0 80px 65px",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "74px",
          width: "88%",
          display: "flex",
          alignItems: "center",
          paddingLeft: { xs: "10px", sm: "20px", md: "30px" },
          paddingTop: { xs: "10px", sm: "20px", md: "30px" },
          borderBottom: `2px solid ${colors.lightGreen[700]}`,
        }}
      >
        <Typography variant="h5">All Clients Profiles</Typography>
      </Box>
      <Box
        sx={{
          height: "80px",
          width: "60%",
          display: "flex",
          alignItems: "center",
          border: `2px solid ${colors.lightGreen[700]}`,
          borderRadius: "20px",
          mt: 5,
          padding: "0 20px",
        }}
      >
        <FormControl sx={{ m: 1, width: "100%" }}>
          <Input
            id="standard-adornment-password"
            color="success"
            type="text"
            onChange={(c) => setQuery(c.target.value)}
            placeholder="Search client by name..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick=""
                  onMouseDown=""
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          width: { xs: "90%", sm: "60%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
          border: `2px solid ${colors.lightGreen[700]}`,
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <TableContainer sx={{ height: "500px", overflowY: "scroll" }}>
          <Table sx={{ width: "auto" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "40px" }}></TableCell>
                <TableCell sx={{ width: "140px" }}>Profile</TableCell>
                <TableCell sx={{ width: "270px" }}>Client Name</TableCell>
                <TableCell sx={{ width: "100px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientsData?.clients
                ?.filter((client) =>
                  client?.name.toLowerCase().includes(query.toLowerCase())
                )
                .map((client) => (
                  <TableRow
                    key={client._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => deleteClientFunc(client?._id)}
                        >
                          <DeleteIcon color="error" fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <img
                        src={client?.profile?.url}
                        style={{ height: "90px" }}
                        alt="Profile"
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {client?.name}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/clients/profiles/${client._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          startIcon={<AssignmentIndIcon />}
                          sx={{ width: "100px" }}
                        >
                          Visit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Profile;
