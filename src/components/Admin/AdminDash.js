import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { UserFilters, UserList, UserShow, UserEdit, UserCreate } from "./Users";
import { Link, Redirect } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import {
  LicenseList,
  LicenseShow,
  LicenseEdit,
  LicenseCreate,
} from "./License";
import { PluginList, PluginShow, PluginEdit, PluginCreate } from "./Plugins";
import {
  LicenseTypeCreate,
  LicenseTypeList,
  LicenseTypeEdit,
  LicenseTypeShow,
} from "./LicenseTypes";
import {
  PluginBundleList,
  PluginBundleCreate,
  PluginBundleEdit,
  PluginBundleShow,
} from "./PluginBundles";
import PeopleIcon from "@material-ui/icons/People";
import SettingsInputHdmiIcon from "@material-ui/icons/SettingsInputHdmi";
import AccountTree from "@material-ui/icons/AccountTree";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import SettingsInputComponent from "@material-ui/icons/SettingsInputComponent";
import { AppBar } from "react-admin";

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

const AdminDash = () => {
  if (localStorage.getItem("token") === null) {
    return <Redirect to="/" />;
  }
  if (localStorage.getItem("loggedin")) {
    if (localStorage.getItem("isAdmin") === "False") {
      return <Redirect to="/user/dashboard/" />;
    }
  }
  return (
    <Admin
      theme={newOptions}
      dataProvider={simpleRestProvider(
        process.env.REACT_APP_API_BACKEND + "/api/v1/admin"
      )}
    >
      <Resource
        name="user"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
        show={UserShow}
        icon={PeopleIcon}
      />
      <Resource
        name="plugin"
        list={PluginList}
        create={PluginCreate}
        edit={PluginEdit}
        show={PluginShow}
        icon={SettingsInputHdmiIcon}
      />
      <Resource
        name="pluginbundle"
        list={PluginBundleList}
        create={PluginBundleCreate}
        edit={PluginBundleEdit}
        show={PluginBundleShow}
        icon={ViewModuleIcon}
      />
      <Resource
        name="license"
        list={LicenseList}
        show={LicenseShow}
        edit={LicenseEdit}
        icon={AccountTree}
      />
      <Resource
        name="licenseType"
        list={LicenseTypeList}
        create={LicenseTypeCreate}
        edit={LicenseTypeEdit}
        show={LicenseTypeShow}
        icon={SettingsInputComponent}
      />
    </Admin>
  );
};

export default AdminDash;
