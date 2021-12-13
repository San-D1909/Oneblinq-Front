import { Redirect } from 'react-router-dom';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { PluginCreate, PluginEdit, PluginList, PluginShow } from "../User/Plugins";
import { LicenseList, LicenseShow } from "../User/License";
import simpleRestProvider from 'ra-data-simple-rest';
import React, { forwardRef } from 'react';
import {DeviceList, DeviceShow, DeviceCreate} from "./Devices";

export const newOptions = {
    palette: {
        type: 'dark',
        primary: {
            main: '#6e44ff',
            contrastText: '#deeff4',
            light: '#efa9ae',
            dark: '#efa9ae',
        },
        secondary: {
            main: '#efa9ae',
        },
        background: {
            default: '#02021e',
            paper: '#1b1d33',
        },
        text: {
            primary: '#edeffc',
            secondary: '#d6d8e5',
            disabled: '#c1c3d0',
            hint: '#9ea0ac',
        },
        info: {
            main: '#efa9ae',
        },
    },
};

const UserDashboard = () => {
    if (localStorage.getItem("token") === null) {
        return (
            <Redirect to="/" />
        )
    }
    else if (localStorage.getItem("isAdmin") === 'True') {
        return (
            <Redirect to="/admin/dashboard" />
        )
    }
    let protocol = window.location.protocol;
    let token = localStorage.getItem("token");
    return (
        <Admin theme={newOptions} dataProvider={simpleRestProvider(process.env.REACT_APP_API_BACKEND + `/api/v1/user/${token}`)}>
            <Resource name="license"
                list={LicenseList}
                show={LicenseShow}
            />
            <Resource name="plugin" list={PluginList} show={PluginShow} />
            <Resource name="device" 
                list={DeviceList} 
                show={DeviceShow} 
                create={DeviceCreate}
            />
        </Admin>
    );
}

export default UserDashboard;