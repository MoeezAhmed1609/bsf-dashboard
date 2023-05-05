import * as React from "react";

// Material Styles
import { styled, useTheme } from "@mui/material/styles";

// Material Components
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Tooltip,
  colors,
  Collapse,
} from "@mui/material";

// Material Icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InventoryIcon from "@mui/icons-material/Inventory";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonIcon from "@mui/icons-material/Person";
import FeedIcon from "@mui/icons-material/Feed";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import MenuBookIcon from "@mui/icons-material/MenuBook";

// Link React Router Dom
import { Link } from "react-router-dom";

// Drawer Styles
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openClient, setOpenClient] = React.useState(false);
  const [openList, setOpenList] = React.useState(false);
  const [openExpense, setOpenExpense] = React.useState(false);

  const handleClick = () => {
    setOpenList(!openList);
    openClient && setOpenClient(false);
    openExpense && setOpenExpense(false);
  };
  const handleExpenseClick = () => {
    setOpenExpense(!openExpense);
    openClient && setOpenClient(false);
    openList && setOpenList(false);
  };
  const handleClientClick = () => {
    setOpenClient(!openClient);
    openExpense && setOpenExpense(false);
    openList && setOpenList(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar sx={{ height: "80px", backgroundColor: "black" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: colors.lightGreen[700],
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            to="/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography
              variant="h5"
              noWrap
              component="div"
              color={colors.lightGreen[700]}
            >
              BEING STRONG
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
            backgroundColor: "white",
          },
        }}
      >
        <DrawerHeader sx={{ height: "80px" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: colors.lightGreen[700] }} />
            ) : (
              <ChevronLeftIcon sx={{ color: colors.lightGreen[700] }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            mt: 4,
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <Link
            to="/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemButton sx={{ marginTop: "24px" }}>
              {open === false ? (
                <Tooltip title="Dashboard">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                </Tooltip>
              ) : (
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
              )}
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          <ListItemButton
            onClick={handleClientClick}
            sx={{ marginTop: "24px" }}
          >
            {open === false ? (
              <Tooltip title="Clients">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
            )}
            <ListItemText primary="Clients" />
            {openClient ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openClient} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to="/clients/admission"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <ListItemButton sx={{ pl: 2 }}>
                  {open === false ? (
                    <Tooltip title="Admission">
                      <ListItemIcon>
                        <FeedIcon />
                      </ListItemIcon>
                    </Tooltip>
                  ) : (
                    <ListItemIcon>
                      <FeedIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary="Admission" />
                </ListItemButton>
              </Link>
              <Link
                to="/clients/profiles"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <ListItemButton sx={{ pl: 2 }}>
                  {open === false ? (
                    <Tooltip title="Profiles">
                      <ListItemIcon>
                        <AssignmentIndIcon />
                      </ListItemIcon>
                    </Tooltip>
                  ) : (
                    <ListItemIcon>
                      <AssignmentIndIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary="Profiles" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick} sx={{ marginTop: "24px" }}>
            {open === false ? (
              <Tooltip title="Sales">
                <ListItemIcon>
                  <EqualizerIcon />
                </ListItemIcon>
              </Tooltip>
            ) : (
              <ListItemIcon>
                <EqualizerIcon />
              </ListItemIcon>
            )}
            <ListItemText primary="Sales" />
            {openList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to="/sales/utilities"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <ListItemButton sx={{ pl: 2 }}>
                  {open === false ? (
                    <Tooltip title="Gym Products">
                      <ListItemIcon>
                        <InventoryIcon />
                      </ListItemIcon>
                    </Tooltip>
                  ) : (
                    <ListItemIcon>
                      <InventoryIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary="Gym Products" />
                </ListItemButton>
              </Link>
              <Link
                to="/sales/supplements"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <ListItemButton sx={{ pl: 2 }}>
                  {open === false ? (
                    <Tooltip title="Supplements">
                      <ListItemIcon>
                        <MedicationIcon />
                      </ListItemIcon>
                    </Tooltip>
                  ) : (
                    <ListItemIcon>
                      <MedicationIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary="Supplements" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
          <Link
            to="/expenses"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemButton sx={{ marginTop: "24px" }}>
              {open === false ? (
                <Tooltip title="Expenses">
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                </Tooltip>
              ) : (
                <ListItemIcon>
                  <AccountBalanceWalletIcon />
                </ListItemIcon>
              )}
              <ListItemText primary="Expenses" />
            </ListItemButton>
          </Link>
          <Link
            to="/ledger"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemButton sx={{ marginTop: "24px" }}>
              {open === false ? (
                <Tooltip title="Ledger">
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                </Tooltip>
              ) : (
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
              )}
              <ListItemText primary="Ledger" />
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
    </Box>
  );
}
