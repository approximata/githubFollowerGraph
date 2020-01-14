import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";

import Search from "./Search";
import FollowerMap from "./FollowerMap";

const DRAWER_WIDTH = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: DRAWER_WIDTH,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH
      },
      backgroundColor: "#24292e"
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: DRAWER_WIDTH
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0)
    }
  })
);

const MainView = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [userLoginName, setUserLoginName] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const classes = useStyles();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const drawerContent = (
    <>
      <div className={classes.toolbar} />
      <Search
        selectedUser={userLoginName}
        setSelectedUserLoginName={setUserLoginName}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Box display="flex" alignItems="center">
              <Box pr={1}>
                <GitHubIcon />
              </Box>
              <Typography variant="h6" noWrap>
                GitHub Follower Graph
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              open={isDrawerOpen}
              onClose={toggleDrawer}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawerContent}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawerContent}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <FollowerMap userLoginName={userLoginName} />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainView;
