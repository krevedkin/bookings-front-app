import { RegistrationForm } from "../components/RegistrationForm";
import { Grid } from "@mui/material";
export const RegisterPage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item sx={{}}>
        <RegistrationForm />
      </Grid>
    </Grid>
  );
};
