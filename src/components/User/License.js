// in src/posts.js
import * as React from "react";
import { List, Datagrid, TextField, DateField, Show, ShowButton, TabbedShowLayout, Tab, ArrayField, TextInput } from 'react-admin';
import { DeleteWithConfirmButton} from 'react-admin';
import { DeviceCreateButton } from "./Devices";

const LicenseFilters = [
    <TextInput label="Plugin name" source="plugin.pluginName" />,
    <TextInput label="License" source="license.licenseKey" />,
];

export const LicenseList = (props) => (
    <List {...props}  filters={LicenseFilters}>
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
                <DeviceCreateButton {...props}/>
            </Tab>   

            <Tab label="Devices" path="device">
                <ArrayField className="col-12" source="devices" label="Test">
                            <Datagrid className="col-12">
                                <TextField source="id" />
                                <TextField source="deviceName" />
                                <DeviceDeleteButton {...props}/>
                            </Datagrid>
                </ArrayField>
            </Tab>   

        </TabbedShowLayout>
    </Show>
    )
};