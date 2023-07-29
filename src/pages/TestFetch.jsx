import {
  Toolbar,
  Container,
  TextField,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { API } from "../http/api";
import { useLoginFormStore } from "../store/store";
export const TestFetch = () => {
  const errorMessage = useLoginFormStore((state) => state.errorMessage);
  const setErrorMessage = useLoginFormStore((state) => state.setErrorMessage);
  const emailValue = useLoginFormStore((state) => state.emailValue);
  const setEmailValue = useLoginFormStore((state) => state.setEmailValue);
  const passwordValue = useLoginFormStore((state) => state.passwordValue);
  const setPasswordValue = useLoginFormStore((state) => state.setPasswordValue);
  const sumbitLogin = useLoginFormStore((state) => state.sumbitLogin);
  return (
    <Container>
      <Toolbar />

      <Stack spacing={2} pt={2}>
        <TextField
          label={"email"}
          value={emailValue}
          onChange={(e) => {
            setEmailValue(e.target.value);
          }}
        ></TextField>
        <TextField
          label={"password"}
          value={passwordValue}
          onChange={(e) => {
            setPasswordValue(e.target.value);
          }}
          type="password"
        ></TextField>
        {errorMessage && <Typography>{errorMessage}</Typography>}
        <Button variant="contained" onClick={sumbitLogin}>
          Залогиниться
        </Button>
      </Stack>
    </Container>
  );
};
