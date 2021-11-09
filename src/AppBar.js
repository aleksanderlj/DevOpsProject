import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useHistory } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import { Accessible, Adjust, Login } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import "./AppBar.css";

const useStyles = makeStyles({});

const drawerWidth = 240;

const ThisAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AppBar() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [activeSub, setActiveSub] = useState("All Posts");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goToProfile = () => {
    history.push("/profile");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const onSignInClick = () => {
    history.push("/signin");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/*<MenuItem
        onClick={() => {
          goToProfile();
        }}

        Profile
      </MenuItem>*/}
      <MenuItem onClick={onSignInClick}>Sign In</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/*<MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={2} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>*/}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThisAppBar position="fixed" open={open} color={"secondary"}>
        <Toolbar>
          <Button
            size={"large"}
            sx={{ fontSize: "30px" }}
            color={"inherit"}
            startIcon={!open ? <MenuIcon /> : null}
            onClick={() => setOpen(!open)}
          >
            SHITPOSTING
          </Button>
          <Box sx={{ margin: "auto" }}>
            <Typography
              variant="h6"
              className={"mainSub"}
              align={"center"}
              onClick={() => history.replace("/")}
              style={{ marginLeft: "-10em" }}
            >
              {activeSub.toUpperCase()}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <Tooltip title={<h3>Login</h3>}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Login />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </ThisAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.secondary.main,
            color: "white",
          },
        }}
        variant={"temporary"}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton color={"inherit"} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "All Posts",
            "IAmTheAsshole",
            "the_donald",
            "jontron",
            "PepeLovers",
            "IdiotsInWheelchairs",
            "CommunistUtopia",
            "Angular",
            "CompilerTechnology",
          ].map((text, index) => (
            <ListItem
              onClick={() => {
                setActiveSub(text);
                setOpen(false);
              }}
              key={index}
              className={activeSub === text ? "activeListItem" : "listItem"}
              button
            >
              <ListItemIcon className={"listItemIcon"}>
                {text === "IdiotsInWheelchairs" ? <Accessible /> : <Adjust />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
