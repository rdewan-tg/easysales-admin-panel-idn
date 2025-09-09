import { useNavigate, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Divider,
  Drawer,
  List,
  CssBaseline,
} from "@mui/material";

import { useState } from "react";
import { darkTheme, lightTheme } from "../theme/theme";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { useAuthStore } from "../../features/auth/login/presentation/index";
import { routeName } from "@/core/route";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import Sidebar from "./Sidebar";

const drawerWidth = 240;

export const MainLayout = (): JSX.Element => {
  const navigate = useNavigate(); // For navigation
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const roles = useAuthStore((state) => state.roles);
  const logout = useAuthStore.use.logout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // State to manage theme mode
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Use the selected theme
  const theme = darkMode ? darkTheme : lightTheme;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate(`/${routeName.dashboard}/${routeName.me}`);
  };

  const handleLogin = () => {
    handleClose();
    navigate(`/${routeName.login}`);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Box
          sx={{
            position: "fixed", // lock to viewport
            height: "100vh", // Full viewport height
            width: "100vw", // Full viewport width
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // hide scrollbars
            boxSizing: "border-box", // Ensures padding is included in height/width
            m: 0,
            p: 0,
          }}
        >
          {/* AppBar at the top */}
          <AppBar
            id="app-bar"
            position="fixed"
            elevation={0}
            sx={{
              boxShadow: "none",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar>
              {/* App name on the left */}
              <Typography
                variant="h5"
                component="div"
                onClick={() => navigate("/")}
                sx={{ cursor: "pointer", flexGrow: 1 }}
              >
                EasySales
              </Typography>

              {/* Profile/Login Menu on the right */}
              <Box>
                <IconButton
                  id="theme-toggle"
                  sx={{ ml: 1 }}
                  onClick={handleThemeChange}
                  color="inherit"
                  aria-label="toggle theme"
                >
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                <Switch
                  id="theme-toggle"
                  checked={darkMode}
                  onChange={handleThemeChange}
                  color="default"
                />

                {/* only show if user is not authenticated */}
                {!isAuthenticated && (
                  <Typography
                    variant="h6"
                    component="span"
                    onClick={handleLogin}
                    sx={{ cursor: "pointer" }}
                  >
                    Login
                  </Typography>
                )}

                {/* only show if user is authenticated */}
                {isAuthenticated && (
                  <>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <Avatar />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "center",
                        horizontal: "center",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                      <Divider component="li" />
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Toolbar>
          </AppBar>

          {isAuthenticated && (
            <>
              <Drawer
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
              >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                  <List>
                    <Sidebar roles={roles} theme={theme} />
                  </List>
                  <Divider />
                </Box>
              </Drawer>
            </>
          )}

          {/* Main content - renders the child routes */}
          <Box component="main" sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
