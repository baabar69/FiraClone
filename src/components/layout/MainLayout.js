import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Avatar,
  Tooltip,
  Button,
  InputBase,
  alpha,
} from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

// Import logo
import { ReactComponent as Logo } from "../../assets/logo.svg";

const drawerWidth = 270;

function MainLayout() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    {
      text: "Company Analysis",
      icon: <BusinessIcon />,
      path: "/company-analysis",
    },
    { text: "PDF Analysis", icon: <PictureAsPdfIcon />, path: "/pdf-analysis" },
    {
      text: "Report Generator",
      icon: <AssessmentIcon />,
      path: "/report-generator",
    },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: "center", py: 1.5 }}>
        <Box sx={{ width: 160, height: 50 }}>
          <Logo width="100%" height="100%" />
        </Box>
      </Toolbar>
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (mobileOpen) handleDrawerToggle();
              }}
              sx={{
                borderRadius: "0 24px 24px 0",
                mr: 1,
                ml: 0.5,
                mb: 0.5,
                color: "#ECECF1",
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.25),
                  },
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.main,
                  },
                  "& .MuiTypography-root": {
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  },
                },
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 45, color: "#ECECF1" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider
        sx={{ mt: "auto", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ color: "#ECECF1" }}>
            <ListItemIcon sx={{ minWidth: 45, color: "#ECECF1" }}>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Help & Support" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ color: "#ECECF1" }}>
            <ListItemIcon sx={{ minWidth: 45, color: "#ECECF1" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#343541" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
          backgroundColor: "#343541",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#ECECF1" }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{ display: "flex", alignItems: "center", ml: { xs: 0, sm: 1 } }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                position: "relative",
                borderRadius: 2,
                backgroundColor: alpha("#40414F", 0.9),
                "&:hover": {
                  backgroundColor: alpha("#40414F", 1),
                },
                width: "280px",
                mr: 2,
              }}
            >
              <Box
                sx={{
                  padding: "0 12px",
                  height: "100%",
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
              </Box>
              <InputBase
                placeholder="Search companies or reports..."
                sx={{
                  color: "#ECECF1",
                  width: "100%",
                  "& .MuiInputBase-input": {
                    padding: "8px 8px 8px 40px",
                  },
                }}
              />
            </Box>

            <IconButton
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#ECECF1",
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="User Profile">
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                FM
              </Avatar>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#40414F",
              color: "#ECECF1",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#40414F",
              color: "#ECECF1",
              borderRight: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#343541", // Main dark background
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, pt: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
