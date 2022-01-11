import * as React from "react";
import { Admin, Resource, } from "react-admin";
import { UserList, UserShow, UserEdit, UserCreate } from "./Users";
import { Redirect } from "react-router-dom";
import simpleRestProvider from "ra-data-simple-rest";
import {DataProvider} from "ra-core";
import {
  LicenseList,
  LicenseShow,
  LicenseEdit,
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
import { PluginVariantEdit } from "./PluginVariants";
import PeopleIcon from "@material-ui/icons/People";
import SettingsInputHdmiIcon from "@material-ui/icons/SettingsInputHdmi";
import AccountTree from "@material-ui/icons/AccountTree";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import SettingsInputComponent from "@material-ui/icons/SettingsInputComponent";
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


const convertFileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file.rawFile);

  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const addUploadFeature = requestHandler => (type, resource, params) => {
  if (type === 'CREATE' && resource === 'plugin') {
    console.log(resource);
    console.log(params);
    // notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
    // if parameter `multiple` is false, then data.pictures is not an array, but single object
    if (params.data.image) {
      return convertFileToBase64(params.data.image).then(base64Picture => {
        let requestParams = params.data;
        params.data.encodedFileContent = base64Picture;
        params.data.fileName = params.data.image.title;

        return requestHandler.create(resource, {
          ...params
        })
      });
    }
    // if (params.data.image && params.data.image.length) {
    //   // only freshly dropped pictures are instance of File
    //   const formerPictures = params.data.pictures.filter(p => !(p.rawFile instanceof File));
    //   const newPictures = params.data.pictures.filter(p => p.rawFile instanceof File);
    //
    //   return Promise.all(newPictures.map(convertFileToBase64))
    //       .then(base64Pictures => base64Pictures.map((picture64, index) => ({
    //         src: picture64,
    //         title: `${newPictures[index].title}`,
    //       })))
    //       .then(transformedNewPictures => requestHandler(type, resource, {
    //         ...params,
    //         data: {
    //           ...params.data,
    //           pictures: [...transformedNewPictures, ...formerPictures],
    //         },
    //       }));
    // }
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
        return requestHandler.update(resource, params);
      case "CREATE":
        return requestHandler.create(resource, params);
      case "UPDATE_MANY":
        return requestHandler.updateMany(resource, params);
    }
  }
};

function AdminDash () {

  const user = VerifyUserRole()

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
      theme={newOptions}
      dataProvider={dataProvider}
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
      <Resource name="pluginVariant" edit={PluginVariantEdit} />
    </Admin>
  );
};

export default AdminDash;
