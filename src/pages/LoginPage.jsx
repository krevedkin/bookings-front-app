import React from "react";
import { Grid } from "@mui/material";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item sx={{}}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};
