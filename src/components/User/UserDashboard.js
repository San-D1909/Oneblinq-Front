import { Redirect } from "react-router-dom";
import { Admin, Resource } from "react-admin";
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
