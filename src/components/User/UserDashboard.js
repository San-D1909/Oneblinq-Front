import { Redirect } from "react-router-dom";
import { Admin, Resource, Layout, AppBar } from "react-admin";
import {
  PluginList,
  PluginShow,
} from "../User/Plugins";
import { LicenseList, LicenseShow } from "../User/License";
import simpleRestProvider from "ra-data-simple-rest";
import React from "react";
import SettingsInputHdmiIcon from "@material-ui/icons/SettingsInputHdmi";
import AccountTree from "@material-ui/icons/AccountTree";
import VerifyUserRole from "../VerifyUserRole";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core";

export const newOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#6e44ff",
      contrastText: "#deeff4",
      light: "#efa9ae",
      dark: "#efa9ae",
    },
    secondary: {
      main: "#efa9ae",
    },
    background: {
      default: "#02021e",
      paper: "#1b1d33",
    },
    text: {
      primary: "#edeffc",
      secondary: "#d6d8e5",
      disabled: "#c1c3d0",
      hint: "#9ea0ac",
    },
    info: {
      main: "#efa9ae",
    },
  },
};

const   navbarStyling = makeStyles({
  title: {
      flex: 1,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
  },
  spacer: {
      flex: 1,
  },
});

const MyAppBar = props => {
  const classes = navbarStyling();
  return (
      <AppBar {...props}>
          <Typography
              variant="h6"
              color="inherit"
              className={classes.title}
              id="react-admin-title"
          />
          <a className="h2 text-dark" style={{ textDecoration: "none"}} href="/">OneBlinq</a>
          <span className={classes.spacer} />
      </AppBar>
  );
};

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;


function UserDashboard () {

  const user = VerifyUserRole()

  if (localStorage.getItem("token") === null) {
    return <Redirect to="/" />;
    } else if (user) {
      if(user.isAdmin)
      {
        return <Redirect to="/admin/dashboard" />;
      }
    }

  
  let token = localStorage.getItem("token");

  return (
    <Admin
    layout={MyLayout}
      theme={newOptions}
      dataProvider={simpleRestProvider(
        process.env.REACT_APP_API_BACKEND + `/api/v1/user/${token}`
      )}
    >
      <Resource
        name="license"
        list={LicenseList}
        show={LicenseShow}
        icon={AccountTree}
      />
      <Resource
        name="plugin"
        list={PluginList}
        show={PluginShow}
        icon={SettingsInputHdmiIcon}
      />
    </Admin>
  );
};

export default UserDashboard;
