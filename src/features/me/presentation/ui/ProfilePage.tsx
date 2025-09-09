import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMeStore } from "..";
import { useEffect, useState } from "react";

import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { ExitToAppOutlined, PublicOutlined } from "@mui/icons-material";
import SelectCompanyDialog from "./components/select-company-dialog";

const ProfilePage = () => {
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);

  const data = useMeStore((state) => state.me);
  const isLoading = useMeStore((state) => state.isLoading);
  const getMe = useMeStore.use.getMe();

  // change company
  const changeCompany = useMeStore.use.changeCompany();

  useEffect(() => {
    async function fetchMe() {
      getMe();
    }

    fetchMe();
  }, []);

  const hasSuperAdminRole = data?.role?.some((r) =>
    r.name.includes("superAdmin"),
  );

  const handleClickOpenCompanyDialog = () => {
    setOpenCompanyDialog(true);
  };

  const handleCloseCompanyDialog = () => {
    setOpenCompanyDialog(false);
  };

  const handleSelectedCompany = (value: number) => {
    setOpenCompanyDialog(false);
    changeCompany({ userId: data?.id ?? 0, companyId: value });
  };

  return (
    <Box
      component={"main"}
      sx={{
        minHeight: "80vh",
        margin: "16px",
      }}
    >
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <Typography variant="h3">Profile</Typography>

      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        <Card>
          <CardContent>
            <Stack direction="column" alignItems="center" spacing={2}>
              <Avatar
                alt={data?.name}
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: "2rem",
                  bgcolor: "primary.main",
                }}
              >
                {data?.name[0]}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {data?.name}
              </Typography>
            </Stack>

            <Grid container spacing={2} style={{ marginTop: "1rem" }}>
              <Grid size={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon color="secondary" />
                  <Typography variant="body1">{data?.email}</Typography>
                </Stack>
              </Grid>

              <Grid size={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIcon color="secondary" />
                  <Typography variant="body1">
                    {data?.phoneNumber || "No phone number provided"}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <BusinessIcon color="secondary" />
                  <Typography variant="body1">{data?.company.name}</Typography>
                  {hasSuperAdminRole && (
                    <>
                      <IconButton
                        color="primary"
                        aria-label="change company"
                        onClick={handleClickOpenCompanyDialog}
                      >
                        <ExitToAppOutlined />
                      </IconButton>
                    </>
                  )}
                </Stack>
              </Grid>

              <Grid size={12}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PublicOutlined color="secondary" />
                  <Typography variant="body1" gutterBottom>
                    Time Zone: {data?.company.timeZone}
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={12}>
                <Typography variant="body1" gutterBottom>
                  Roles:
                </Typography>
                <Stack direction="row" spacing={1}>
                  {data?.role.map((role) => (
                    <Chip key={role.id} label={role.name} color="primary" />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <SelectCompanyDialog
        open={openCompanyDialog}
        onClose={handleCloseCompanyDialog}
        onSelected={handleSelectedCompany}
      />
    </Box>
  );
};

export default ProfilePage;
