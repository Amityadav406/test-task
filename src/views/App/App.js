import React, { useContext } from 'react'
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { makeStyles } from '@mui/styles';
// - Context
import AuthContext from "../../context/AuthContext";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
//Icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: '999999'
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));
const SidebarLinks = [
  {
    icon: <DashboardIcon />,
    link: "/dashboard",
    title: "Dashboard",
    hasSubheader: "Manage",
  },
]
const App = ({ children }) => {
  const classes = useStyles();
  const { isUserLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <React.Fragment>
      <CssBaseline />
      {(() => {
        if (isUserLoggedIn) {
          return (
            <AppBar style={{ zIndex: '99999' }} className={classes.appBar}>
              <StyledToolbar>
                <Inline>
                  <Typography variant="h6" noWrap>
                    Test-Task
                  </Typography>
                  <HeaderList>
                    <HeaderLink to={"#"}>Users</HeaderLink>
                  </HeaderList>
                </Inline>
                <div>
                  <IconButton onClick={() => logOutUser()} color="inherit">
                    <ExitToAppIcon />
                  </IconButton>
                </div>
              </StyledToolbar>
            </AppBar>
          );
        }
        return null;
      })()}

      {(() => {
        if (isUserLoggedIn) {
          return (
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Toolbar />

              <div className={classes.drawerContainer}>
                <List>
                  {SidebarLinks.map((link, index) => (
                    <StyledNavLink to={link.link} key={index}>
                      {link.hasSubheader && (
                        <ListSubheader>{link.hasSubheader}</ListSubheader>
                      )}
                      <ListItem button>
                        <ListItemIcon>
                          {link.icon ? link.icon : <NotificationsIcon />}
                        </ListItemIcon>
                        <ListItemText primary={link.title} />
                      </ListItem>
                    </StyledNavLink>
                  ))}
                </List>
              </div>
            </Drawer>
          );
        }
      })()}
      <Main isloggin={isUserLoggedIn}>{children}</Main>
    </React.Fragment>
  )
}

export default App
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #555;
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  z-index: 9999;
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 30px;
  padding-left: 30px;
`;

const HeaderLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  margin-right: 30px;
  font-size: 16px;
`;

const marginLeft = (props) => (props.isloggin ? "240px" : "0px");
const marginTop = (props) => (props.isloggin ? "80px" : "0px");

const Main = styled.main`
  flex-grow: 1;
  padding: 20px 60px;
  margin-left: ${marginLeft};
  margin-top: ${marginTop};
  margin: ${marginTop}px ${marginLeft}px 0px;
`;
