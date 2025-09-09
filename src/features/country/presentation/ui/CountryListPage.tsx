import { routeName } from "@/core/route";
import { AddLocationOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCountryStore } from "..";
import { useEffect, useState } from "react";

const CountryListPage = () => {
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);
  const navigate = useNavigate();

  const getCountries = useCountryStore.use.getCountries();
  const countries = useCountryStore((state) => state.countries);
  const errorMessage = useCountryStore((state) => state.error);

  useEffect(() => {
    async function fetchCountries() {
      await getCountries();
    }
    fetchCountries();
  }, []);

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleErrorSnackbarClick();
    }
  }, [errorMessage]);

  const handleErrorSnackbarClick = () => {
    setOpenErrorSnackBar(true);
  };

  const handleErrorSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  const navigateToCreateCompany = () => {
    navigate(
      `/${routeName.dashboard}/${routeName.countries}/${routeName.createCountry}`,
    );
  };

  return (
    <Box
      component={"main"}
      sx={{
        height: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box", // Ensures padding is included in height/width
        m: 0,
        p: 0,
      }}
    >
      <Typography variant="h3">Countries</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton
          size="large"
          color="primary"
          onClick={navigateToCreateCompany}
        >
          <AddLocationOutlined />
        </IconButton>
      </Box>

      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          p: 2,
        }}
      >
        <Grid>
          <List dense={true}>
            {Array.isArray(countries) &&
              countries.map((country) => (
                <Card
                  key={country.id}
                  raised
                  onClick={() => console.log("company", country)}
                  sx={{ mb: 2, p: 2 }}
                >
                  <CardHeader
                    title={country.name}
                    subheader={country.countryCode}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {country.currencyCode}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </List>
        </Grid>
      </Box>

      {/* Display global error */}
      {errorMessage && (
        <Snackbar
          open={openErrorSnackBar}
          autoHideDuration={6000}
          TransitionComponent={Slide}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleErrorSnackbarClose}
        >
          <Alert
            onClose={handleErrorSnackbarClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default CountryListPage;
