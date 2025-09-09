import {
  Avatar,
  Card,
  Typography,
  Box,
  SnackbarCloseReason,
  Backdrop,
  CircularProgress,
  Divider,
  Chip,
  Button,
  Tooltip,
  IconButton,
  Paper,
  Container,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteMemberComponent,
  SetRoleComponent,
  UpdatePasswordComponent,
  useUserStore,
} from "..";
import { useEffect, useState } from "react";
import { useRoleStore } from "../../../role/presentation";

import {
  BaseConfirmDialog,
  BaseSnackBarComponent,
} from "../../../../common/components";
import SetAreaComponent from "./components/SetAreaComponent";
import { useAreaStore } from "@/features/area/presentation";

export const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openErrorSnackbar, setErrorSnackbarOpen] = useState(false);

  const [roleId, setRoleId] = useState<number | null>(null);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isAreaDialogOpen, setIsAreaDialogOpen] = useState(false);
  const isRoleAdded = useRoleStore((state) => state.isRoleAdded);
  const isRoleDeleted = useRoleStore((state) => state.isRoleDeleted);
  const isAreaAdded = useAreaStore((state) => state.isUserAreaSet);
  const isAreaDeleted = useAreaStore((state) => state.isUserAreaRemoved);

  const isLoading = useUserStore((state) => state.isLoading);
  const errorMessage = useUserStore((state) => state.error);
  const user = useUserStore((state) => state.user);

  const getUserById = useUserStore.use.getUserById();
  const deleteUserRole = useRoleStore.use.deleteUserRole();
  const deleteUserArea = useAreaStore.use.deleteUserArea();

  useEffect(() => {
    const fetchMember = async () => {
      if (!isLoading) {
        // Check if it's already loading
        await getUserById(Number(id));
      }
    };
    fetchMember();
  }, [id, isRoleAdded, isRoleDeleted, isAreaAdded, isAreaDeleted]);

  // observe error state and display error message
  useEffect(() => {
    if (errorMessage) {
      handleSnackbarClick();
    }
  }, [errorMessage]);

  const handleSnackbarClick = () => {
    setErrorSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // do not close the snackbar if the reason is 'clickaway'
    if (reason === "clickaway") {
      return;
    }

    setErrorSnackbarOpen(false);
  };

  const handleRoleOpenDialog = (id: number) => {
    setIsRoleDialogOpen(true);
    setRoleId(id);
  };

  const handleRoleCloseDialog = () => {
    setIsRoleDialogOpen(false);
    setRoleId(null);
  };

  const handleDeleteUserRole = async () => {
    await deleteUserRole({ userId: Number(id), roleId: roleId ?? 0 });
    setIsRoleDialogOpen(false);
  };

  const handleAreaOpenDialog = (id: number) => {
    setIsAreaDialogOpen(true);
    setAreaId(id);
  };

  const handleAreaCloseDialog = () => {
    setIsAreaDialogOpen(false);
    setAreaId(null);
  };

  const handleDeleteArea = async () => {
    await deleteUserArea(Number(id), areaId ?? 0);
    setIsAreaDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.04)" },
            }}
          >
            Back
          </Button>
          <Tooltip title="Edit User">
            <IconButton
              color="primary"
              onClick={() => navigate(`/dashboard/users/edit/${id}`)}
              sx={{
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.12)" },
                borderRadius: 2,
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {isLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="primary" />
          </Backdrop>
        ) : null}

        <Card
          elevation={2}
          sx={{
            maxWidth: 800,
            margin: "auto",
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ p: 4 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              alignItems="flex-start"
              sx={{ mb: 4 }}
            >
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  bgcolor: "primary.main",
                  fontSize: "2rem",
                  fontWeight: 500,
                }}
                alt={user?.name}
                src={user?.photo || ""}
              >
                {user?.name?.charAt(0)}
              </Avatar>

              <Stack spacing={1}>
                <Typography variant="h4" fontWeight="medium">
                  {user?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Email: {user?.email}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Phone: {user?.phoneNumber || "N/A"}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Roles:
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {user?.roles?.map((r) => (
                      <Chip
                        key={r.id}
                        label={r.name}
                        color="success"
                        size="small"
                        variant="outlined"
                        deleteIcon={<DeleteIcon fontSize="small" />}
                        onDelete={() => handleRoleOpenDialog(r.id)}
                        sx={{
                          borderRadius: 3,
                          px: 1,
                          my: 0.5,
                        }}
                      />
                    ))}
                  </Stack>
                </Stack>

                {/* Area chips - show only if user has area */}
                {(user?.areas?.length ?? 0) > 0 && (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Areas:
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {user?.areas?.map((r) => (
                        <Chip
                          key={r.id}
                          label={r.name}
                          color="primary"
                          size="small"
                          variant="outlined"
                          deleteIcon={<DeleteIcon fontSize="small" />}
                          onDelete={() => handleAreaOpenDialog(r.id)}
                          sx={{
                            borderRadius: 3,
                            px: 1,
                            my: 0.5,
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Display member roles */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "background.subtle",
                mb: 3,
              }}
            >
              <SetRoleComponent />
            </Paper>

            <Divider sx={{ my: 3 }} />

            {/* Display user area */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "background.subtle",
                mb: 3,
              }}
            >
              <SetAreaComponent />
            </Paper>

            <Divider sx={{ my: 3 }} />

            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "background.subtle",
                mb: 1,
              }}
            >
              <UpdatePasswordComponent userId={Number(id)} />
            </Paper>

            <Divider sx={{ my: 3 }} />

            {/* Display member delete button */}
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 3, bgcolor: "error.softBg", mb: 1 }}
            >
              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Delete User
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                This action will permanently delete the user and all their data.
              </Typography>
              <DeleteMemberComponent id={Number(id)} />
            </Paper>
          </Box>
        </Card>

        {/* Dialog component */}
        <BaseConfirmDialog
          title="Delete Role"
          description="Are you sure you want to delete this role from user?"
          open={isRoleDialogOpen}
          onCancel={handleRoleCloseDialog}
          onConfirm={handleDeleteUserRole}
        />

        <BaseConfirmDialog
          title="Delete Area"
          description="Are you sure you want to delete this area from user?"
          open={isAreaDialogOpen}
          onCancel={handleAreaCloseDialog}
          onConfirm={handleDeleteArea}
        />

        {/* Display global error */}
        {errorMessage && (
          <BaseSnackBarComponent
            message={errorMessage}
            autoHideDuration={6000}
            severity="error"
            open={openErrorSnackbar}
            onClose={handleSnackbarClose}
          />
        )}
      </Box>
    </Container>
  );
};

export default UserDetailPage;
