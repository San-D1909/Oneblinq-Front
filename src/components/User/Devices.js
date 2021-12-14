import * as React from "react";
import { List, Datagrid, TextField, DateField, BooleanField, ImageInput, TranslatableInputs, ImageField, NumberInput, TranslatableFields, Show, SimpleShowLayout, RichTextField, NumberField, ShowButton } from 'react-admin';
import { Create, Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, EditButton, required } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

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


export const DeviceCreate = (props) => {

    let token = localStorage.getItem("token");

    return (

    <Create {...props}>
        <SimpleForm>
            <TextInput source="deviceName" label="Device name" validate={required()} />
            <RichTextInput source="deviceDescription" label="Device description" validate={required()} />
            <input type="hidden" value={token} />
            <NumberInput source=" " validate={required()} />
        </SimpleForm>
    </Create>

    );
}

const DeviceShowButton = ({ record }) => {
    console.log(record);
    return (
        <ShowButton basePath="device" label="Show info" record={ record } />
    );

}

export const DeviceShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="license.licenseKey" label="License key" />
            <TextField source="plugin.pluginName" label="Plugin name" />
            <TextField source="license.licenseType.maxAmount" label="Limit" />
            <TextField source="timesActivated" label="Amount activated" />
            <DateField source="license.creationTime" label="Created on" />
            <DateField source="license.expirationTime" label="Expires on" />
        </SimpleShowLayout>
    </Show>
);