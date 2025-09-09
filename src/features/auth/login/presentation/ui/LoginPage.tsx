import {
  Alert,
  Box,
  Card,
  Typography,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  TextField,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import PasswordFieldComponent from "./components/PasswordFieldComponent";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { LoginForm, loginSchema } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useAuthStore } from "../index";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

/**
 * Animation variants for floating bubble effects.
 * Controls the initial state, animation sequence, and transition properties.
 * @constant
 */
const bubbleVariants = {
  initial: (custom: number) => ({
    y: 1000,
    x: custom,
    opacity: 0,
    scale: 0,
  }),
  animate: (custom: number) => ({
    y: -1000,
    x: [custom - 100, custom + 100, custom],
    opacity: [0, 0.8, 0],
    scale: [0, 1, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      delay: custom / 50,
      ease: "linear",
    },
  }),
} as const;

/**
 * Default form values for the login form.
 * @constant
 */
const defaultFormValues = {
  email: "",
  password: "",
} as const;

/**
 * LoginPage Component
 *
 * A modern, animated login page with Material Design 3 styling.
 * Features include:
 * - Floating bubble animations in the background
 * - Form validation using react-hook-form and zod
 * - Material UI components with enhanced styling
 * - Responsive design with glass morphism effects
 * - Error handling with snackbar notifications
 *
 * @component
 * @example
 * ```tsx
 * <LoginPage />
 * ```
 */
function LoginPage() {
  // State management for snackbar visibility
  const [open, setOpen] = useState(false);

  // Zustand store selectors for authentication
  const errorMessage = useAuthStore((state) => state.error);
  const login = useAuthStore.use.login();

  /**
   * Form configuration using react-hook-form
   * Includes:
   * - Real-time validation with onChange mode
   * - Zod schema validation
   * - Default values for form fields
   */
  const form = useForm<LoginForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = form;

  /**
   * Handles form submission.
   * Attempts to log in the user with the provided credentials.
   *
   * @param data - The form data containing email and password
   */
  const onSubmit = useCallback<SubmitHandler<LoginForm>>(
    async (data) => {
      await login(data);
    },
    [login],
  );

  /**
   * Handles the closing of the error snackbar.
   * Ignores clickaway events to prevent accidental dismissal.
   *
   * @param _event - The event that triggered the close
   * @param reason - The reason for the close action
   */
  const handleSnackbarClose = useCallback(
    (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") return;
      setOpen(false);
    },
    [],
  );

  /**
   * Generate random positions for the floating bubbles.
   * Memoized to prevent recalculation on re-renders.
   */
  const bubblePositions = useMemo(
    () => [...Array(15)].map(() => Math.floor(Math.random() * 1000)),
    [],
  );

  /**
   * Effect to show error message in snackbar when authentication fails.
   */
  useEffect(() => {
    if (errorMessage) {
      setOpen(true);
    }
  }, [errorMessage]);

  return (
    <Box
      component="div"
      sx={{
        position: "fixed", // lock to viewport
        display: "flex",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #4527a0 0%, #8e24aa 100%)",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      {bubblePositions.map((position, i) => (
        <MotionBox
          key={i}
          custom={position}
          variants={bubbleVariants}
          initial="initial"
          animate="animate"
          sx={{
            position: "absolute",
            width: `${Math.random() * 60 + 40}px`,
            height: `${Math.random() * 60 + 40}px`,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            bottom: "-100px",
            zIndex: 1,
          }}
        />
      ))}

      {/* Login Card */}
      <MotionCard
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        elevation={6}
        sx={{
          padding: { xs: 3, sm: 4 },
          width: "100%",
          maxWidth: "400px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: `
                        0 1px 2px 0 rgba(0,0,0,0.04), 
                        0 4px 8px -2px rgba(0,0,0,0.1),
                        0 6px 20px 2px rgba(0,0,0,0.05),
                        inset 0 0 0 1px rgba(255,255,255,0.15)
                    `,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            component={motion.h1}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            variant="h4"
            fontWeight="700"
            color="primary.main"
            sx={{ mb: 1 }}
          >
            Welcome Back
          </Typography>
          <Typography
            component={motion.p}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            variant="body1"
            color="text.secondary"
          >
            Sign in to continue to EasySales
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Form fields */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                required={true}
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : null}
                fullWidth
                sx={{
                  /**
                   * Enhanced input field styling:
                   * - Semi-transparent background
                   * - Hover and focus states
                   * - Consistent border radius
                   * - Proper label color in focused state
                   */
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "primary.main",
                    },
                  },
                }}
              />
            )}
          />

          <PasswordFieldComponent control={control} errors={errors} />

          {/* Submit button with loading state */}
          <LoadingButton
            variant="contained"
            endIcon={<LoginIcon />}
            type="submit"
            loading={isSubmitting}
            loadingPosition="end"
            disabled={!isValid || isSubmitting}
            sx={{
              py: 1.5,
              backgroundColor: "primary.main",
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "primary.dark",
                boxShadow: `
                                    0 3px 6px -2px rgba(0,0,0,0.12),
                                    0 8px 16px -4px rgba(0,0,0,0.08)
                                `,
              },
              "&.Mui-disabled": {
                backgroundColor: "action.disabledBackground",
                opacity: 0.6,
              },
            }}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </LoadingButton>
        </Box>
      </MotionCard>

      {/* Snackbar for errors with slide animation */}
      {errorMessage && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleSnackbarClose}
          sx={{
            "& .MuiSnackbar-root": {
              bottom: { xs: 90, sm: 24 },
            },
          }}
        >
          <Slide in={open} direction="up">
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Slide>
        </Snackbar>
      )}
    </Box>
  );
}

export default LoginPage;
