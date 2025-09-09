import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Control, FieldErrors, Controller } from "react-hook-form";
import { SignupForm } from "@/common/types";

const PasswordFieldComponent = (props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<SignupForm, any>;
  errors: FieldErrors<SignupForm>;
  id: string;
  lable: string;
}): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  // destructure props
  const { control, errors, id, lable } = props;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={id}
          required
          label={lable}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          error={!!errors.password}
          helperText={errors.password?.message} // Register
        />
      )}
    />
  );
};

export default PasswordFieldComponent;
