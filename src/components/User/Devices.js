import * as React from "react";
import { List, Datagrid, TextField, DateField, BooleanField, ImageInput, TranslatableInputs, ImageField, NumberInput, TranslatableFields, Show, SimpleShowLayout, RichTextField, NumberField, ShowButton, Button, CreateButton, DeleteButton } from 'react-admin';
import { Create, Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, EditButton, required } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { Form } from "react-bootstrap";
import {OSInfo} from '../DeviceInfo'
import axios from "axios";
import platform from 'platform';

export const DeviceList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="device.licenseKey" label="License key"/>
            <TextField source="plugin.pluginName" label="Plugin name" />
            <TextField source="license.licenseType.maxAmount" label="Limit" />
            <TextField source="timesActivated" label="Amount activated" />
            <DateField source="license.creationTime" label="Created on" />
            <DateField source="license.expirationTime" label="Expires on" />
            <DeviceShowButton {...props} />
        </Datagrid>
    </List>
);


export const DeviceCreateButton = (props) => {

    return (
   
        <Form title="Register Device">
            <p>Register new device</p>
            <Button label="Register" onClick={(e) => RegisterDevice(props)}/>
        </Form>
    );
}

const RegisterDevice = (props) =>
{
    var data = {}

    data.jtoken = localStorage.getItem("token")
    data.deviceInfo = platform.os.toString() + " " + platform.name.toString() + " " + platform.version.toString() + " " + navigator.userAgent
    data.deviceName = platform.name.toString() + " " + platform.os.toString()
    data.licenseKey = props.record.license.licenseKey
    
    axios({
        method: 'post',
        url: process.env.REACT_APP_API_BACKEND + '/api/v1/user/Device',
        dataType: "json",
        data: data
    }).then(response => {
        localStorage.setItem("dtoken", response.data)
        window.location.href = '/user/dashboard'
    })
}

const DeviceShowButton = ({ record }) => {
    console.log(record);
    return (
        <ShowButton basePath="device" label="Show info" record={ record } />
    );

}

export const DeviceDeleteButton = ({ record }) => {
    console.log(record);
    return (
        <DeleteButton basePath="/device" label="Delete device" record={ record } />
    );

}


export const DeviceShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="device.deviceToken" label="Device Token" />
        </SimpleShowLayout>
    </Show>
);