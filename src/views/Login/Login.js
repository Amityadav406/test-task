import React, { useEffect, useState, useContext } from 'react'
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import {
  Paper,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";


const Login = ({ history, location, lastPath }) => {
  const { login, isUserLoggedIn, isCheckingLogin, token } = useContext(
    AuthContext
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    password_incorrect: false,
    account_doesnot_exist: false,
    empty_fields: false,
  });
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn) history.replace("/dashboard");
  }, [isUserLoggedIn, token]);

  const onSubmit = async () => {
    if (form.password !== "" && form.email !== "") {
      try {
        setFormError({
          password_incorrect: false,
          account_doesnot_exist: false,
          empty_fields: false,
        });

        setIsSubmittingForm(true);

        const status = await login(form);

        if (status === 200) {
          setForm({
            email: "",
            password: "",
          });

          // history.push(``);
        } else throw "Wrong Credentials. Try again.";
      } catch (err) {
        toast.error(err);
      } finally {
        setIsSubmittingForm(false);
      }
    } else {
      setFormError({
        ...formError,
        empty_fields: true,
      });
    }
  };


  return (
    <MainGrid container alignItems="center" justify="center">
      <Grid item xs={12} md={4}>
        <Paper elevation={2}>
          <Box p={3}>
            <Typography variant="h5">Login</Typography>
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Enter email address"
              variant="outlined"
              fullWidth
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: event.target.value,
                })
              }
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Enter your password"
              variant="outlined"
              fullWidth
              value={form.password}
              inputProps={{
                type: "password",
              }}
              onChange={(event) =>
                setForm({
                  ...form,
                  password: event.target.value,
                })
              }
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={!form.email || !form.password}
              onClick={() => onSubmit()}
            >
              Log In
            </Button>
          </Box>
        </Paper>
      </Grid>
    </MainGrid>
  );
};

export default withRouter(Login)

const MainGrid = styled(Grid)`
  height: 100vh;
  width: 100vw;
  justify-content:center;
`;

const TextCenter = styled.div`
  align-items: center;
`;