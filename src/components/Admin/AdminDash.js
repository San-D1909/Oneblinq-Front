import * as React from "react";
import { AppBar, Admin, Resource, Layout   } from "react-admin";
import { UserList, UserShow, UserEdit, UserCreate } from "./Users";
import { Redirect } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import Typography from '@material-ui/core/Typography';
import {
  LicenseList,
  LicenseShow,
  LicenseEdit,
} from "./License";
import { PluginList, PluginShow, PluginEdit, PluginCreate } from "./Plugins";
import {
  PluginBundleList,
  PluginBundleCreate,
  PluginBundleEdit,
  PluginBundleShow,
} from "./PluginBundles";
import { PluginVariantEdit } from "./PluginVariants";
import PeopleIcon from "@material-ui/icons/People";
import SettingsInputHdmiIcon from "@material-ui/icons/SettingsInputHdmi";
import AccountTree from "@material-ui/icons/AccountTree";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import VerifyUserRole from "../VerifyUserRole";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root.MuiSnackbarContent-root": {
      display: "none",
    },
    ".MuiPaper-root .RaImageField-image-95": {
      width: "200px"
    }
  }
}));
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


const convertFileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file.rawFile);

  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const addUploadFeature = requestHandler => (type, resource, params) => {
  if (type === 'CREATE' && (resource === 'plugin' || resource === 'pluginbundle')) {
    // notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
    // if parameter `multiple` is false, then data.pictures is not an array, but single object
    if (params.data.image) {
      return convertFileToBase64(params.data.image).then(base64Picture => {
        params.data.encodedFileContent = base64Picture;
        params.data.fileName = params.data.image.title;

        return requestHandler.create(resource, {
          ...params
        })
      });
    }
  } else {
    switch (type) {
      default:
      case "GET_LIST":
        return requestHandler.getList(resource, params);
      case "DELETE":
        return requestHandler.delete(resource, params);
      case "DELETE_MANY":
        return requestHandler.deleteMany(resource, params);
      case "GET_MANY":
        return requestHandler.getMany(resource, params);
      case "GET_MANY_REFERENCE":
        return requestHandler.getManyReference(resource, params);
      case "GET_ONE":
        return requestHandler.getOne(resource, params);
      case "UPDATE":
        let updateResponse = requestHandler.update(resource, params);
        return updateResponse;
      case "CREATE":
        return requestHandler.create(resource, params);
      case "UPDATE_MANY":
        return requestHandler.updateMany(resource, params);
    }
  }
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
const AuthProvider = {
  checkError: (error) => { /* ... */ },
  getIdentity: () => { /* ... */ },
  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  logout: () => {
    console.log("logout")
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token');
      return resolve("/");
    });
  },
  getPermissions: (params) => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
}

function AdminDash () {

  const user = VerifyUserRole()
  const classes = useStyles();
  let dataProvider = simpleRestProvider(process.env.REACT_APP_API_BACKEND + "/api/v1/admin");
  dataProvider = addUploadFeature(dataProvider);
  if (localStorage.getItem("token") === null) {
    return <Redirect to="/" />;
  }
  if (localStorage.getItem("token")) {
    if (user) {
      if(!user.isAdmin)
      {
        return <Redirect to="/user/dashboard/" />;
      }
    }
  }
  
  return (
    <Admin
      authProvider={AuthProvider}
      layout={MyLayout}
      theme={newOptions}
      dataProvider={dataProvider}
      className={classes.root}
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
      <Resource name="pluginVariant" edit={PluginVariantEdit} />
      <Resource name="pluginBundleVariant" />
    </Admin>
  );
};

export default AdminDash;
