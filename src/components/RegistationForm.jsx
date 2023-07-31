import { useEffect } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { useRegistrationFormStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export function RegistrationForm() {
  const navigate = useNavigate();
  const emailValue = useRegistrationFormStore((state) => state.emailValue);
  const passwordValue = useRegistrationFormStore(
    (state) => state.passwordValue
  );
  const passwordConfirmValue = useRegistrationFormStore(
    (state) => state.passwordConfirmValue
  );

  const errorMessage = useRegistrationFormStore((state) => state.errorMessage);
  const setErrorMessage = useRegistrationFormStore(
    (state) => state.setErrorMessage
  );

  const setEmailValue = useRegistrationFormStore(
    (state) => state.setEmailValue
  );
  const setPasswordValue = useRegistrationFormStore(
    (state) => state.setPasswordValue
  );
  const setPasswordConfirmValue = useRegistrationFormStore(
    (state) => state.setPasswordConfirmValue
  );
  const submitRegistration = useRegistrationFormStore(
    (state) => state.submitRegistration
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: emailValue,
      password: passwordValue,
      passwordConfirm: passwordConfirmValue,
    },
  });

  const onSubmit = async () => {
    const response = await submitRegistration();
    if (response?.status === 201) {
      setEmailValue("");
      setPasswordValue("");
      setPasswordConfirmValue("");
      setErrorMessage("");
      navigate("/login");
    }
  };

  useEffect(() => {
    setValue("email", emailValue);
    setValue("password", passwordValue);
    setValue("passwordConfirm", passwordConfirmValue);
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
          Регистрация
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
          <Controller
            name="passwordConfirm"
            control={control}
            rules={{
              required: "Поле обязательно",
              minLength: {
                value: 6,
                message: "Пароль должен быть не менее 6 символов",
              },
              validate: (value) => {
                return passwordValue === value || "Пароли не совпадают";
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Подтвердите пароль"
                type="password"
                id="passwordConfirm"
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
                onChange={(e) => {
                  setPasswordConfirmValue(e.target.value);
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
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
