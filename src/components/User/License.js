// in src/posts.js
import * as React from "react";
import { List, Datagrid, TextField, DateField, BooleanField, ImageInput, TranslatableInputs, ImageField, NumberInput, TranslatableFields, Show, SimpleShowLayout, RichTextField, NumberField, ShowButton, TabbedShowLayout, Tab, ReferenceArrayField, ArrayField, email, EmailField, DeleteButton } from 'react-admin';
import { Create, Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, EditButton, required, DeleteWithConfirmButton} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { DeviceCreateButton, DeviceShow} from "./Devices";


export const LicenseList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="license.licenseKey" label="License key"/>
            <TextField source="plugin.pluginName" label="Plugin name" />
            <TextField source="license.licenseType.maxAmount" label="Limit" />
            <TextField source="timesActivated" label="Amount activated" />
            <DateField source="license.creationTime" label="Created on" />
            <DateField source="license.expirationTime" label="Expires on" />
            <LicenseShowButton {...props} />
        </Datagrid>
    </List>
);

const LicenseShowButton = ({ record }) => {
    console.log(record);
    return (
    <ShowButton basePath="license" label="Show info" record={ record } />
        );
    
}

const DeviceDeleteButton = ({ record }) => {
    console.log(record);
    return (
        <DeleteWithConfirmButton basePath="/license" resource="device" label="Delete device" record={ record } undoable={false}/>
    );

}


export const LicenseShow = (props) => {

    return(
    <Show {...props}>
        <TabbedShowLayout>

            <Tab label="Info">
                <TextField source="license.licenseKey" label="License key" />
                <TextField source="plugin.pluginName" label="Plugin name" />
                <TextField source="licenseType.maxAmount" label="Limit" />
                <TextField source="timesActivated" label="Amount activated" />
                <DateField source="license.creationTime" label="Created on" />
                <DateField source="license.expirationTime" label="Expires on" />
            </Tab>   

            <Tab label="Devices" path="device">
                <ArrayField className="col-12" source="devices" label="Test">
                            <Datagrid className="col-12">
                                <TextField source="id" />
                                <DeviceDeleteButton {...props}/>
                            </Datagrid>
                </ArrayField>
            </Tab>   

        </TabbedShowLayout>
    </Show>
    )
};