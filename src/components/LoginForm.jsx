import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { authStore, useAppBarStore, useLoginFormStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

export function LoginForm() {
  const emailValue = useLoginFormStore((state) => state.emailValue);
  const passwordValue = useLoginFormStore((state) => state.passwordValue);
  const navigate = useNavigate();
  const setIsAuthenticated = authStore((state) => state.setIsAuthenticated);
  const setUserName = useAppBarStore((state) => state.setUserName);
  const errorMessage = useLoginFormStore((state) => state.errorMessage);
  const setErrorMessage = useLoginFormStore((state) => state.setErrorMessage);

  const setEmailValue = useLoginFormStore((state) => state.setEmailValue);
  const setPasswordValue = useLoginFormStore((state) => state.setPasswordValue);
  const sumbitLogin = useLoginFormStore((state) => state.sumbitLogin);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: emailValue,
      password: passwordValue,
    },
  });

  const onSubmit = async () => {
    const response = await sumbitLogin();
    if (response?.status === 200) {
      setIsAuthenticated(true);
      setUserName(response.username);
      setEmailValue("");
      setPasswordValue("");
      setErrorMessage(null);
      navigate("/home");
    }
  };

  useEffect(() => {
    setValue("email", emailValue);
    setValue("password", passwordValue);
  }, [setValue]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход в аккаунт
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Поле Email обязательно",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: "Введите email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Поле Пароль обязательно",
              minLength: {
                value: 6,
                message: "Пароль должен быть не менее 6 символов",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                onChange={(e) => {
                  setPasswordValue(e.target.value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errorMessage && (
            <Grid item xs={12} pb={1}>
              <Typography textAlign={"center"} color="error">
                {errorMessage}
              </Typography>
            </Grid>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/registration" variant="body2">
                Нет аккаунта? Регистрация
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
