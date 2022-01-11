// in src/posts.js
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    BooleanField,
    Show,
    SimpleShowLayout,
    ShowButton,
    BooleanInput
} from "react-admin";
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

const LicenseFilters = [
    <TextInput label="Licensekey" source="license.licenseKey"/>,
    <TextInput label="License name" source="license.typeName"/>,
    <TextInput label="Plugin name" source="plugin.pluginName" />,
];

// const LicensePanel = ({ id, record, resource }) => {
//     console.log(record);
//     return (
//         <>
//             <h3>Plugins</h3>
//             <ArrayField className="col-12" source="plugins" label="">
//                 <Datagrid>
//                     <TextField source="id" />
//                     <TextField source="pluginName" />
//                     <NumberField source="monthlyPrice" />
//                     <NumberField source="fullPrice" />
//                     {/*<BooleanField source="isVerified" label="Verified" />*/}
//                     {/*<TextField source="company.companyName" label="Company name" />*/}
//                     {/*<TextField source="company.phoneNumber" label="Phonenumber" />*/}
//                     {/*<TextField source="company.bTWNumber" label="BTW number" />*/}
//                     {/*<TextField source="company.kVKNumber" label="KVK number" />*/}
//                 </Datagrid>
//             </ArrayField>
//         </>
//     )
//     // return (<div dangerouslySetInnerHTML={{
//     //     __html: record.licenseKey
//     // }}
//     // />)
// }

export const LicenseList = (props) => (
  <List {...props} filters={LicenseFilters}>
    <Datagrid>
      <TextField source="licenseKey" label="License key" />
      <TextField source="licenseType.typeName" label="License Type" />
      <TextField source="licenseType.maxAmount" label="Limit" />
      <TextField source="timesActivated" label="Amount activated" />
      <BooleanField source="isActive" label="Is Active" />
      <DateField source="creationTime" label="Created on" />
      <DateField source="expirationTime" label="Expires on" />
      <LicenseShowButton {...props} />
    </Datagrid>
  </List>
);

const LicenseShowButton = ({ record }) => {
  console.log(record);
  return <ShowButton basePath="license" label="Show info" record={record} />;
};

export const LicenseShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="licenseKey" label="License key" />
      <TextField source="licenseType.maxAmount" label="Limit" />
      <TextField source="licenseType.typeName" label="License Type" />
      <TextField source="timesActivated" label="Amount activated" />
      <BooleanField source="isActive" label="Is Active" />
      <DateField source="company.companyName" label="Company Name" />
      <DateField source="company.zipCode" label="Zip Code" />
      <DateField source="company.street" label="Street" />
      <DateField source="company.houseNumber" label="House number" />
      <DateField source="company.btwNumber" label="BTW Number" />
      <DateField source="company.phoneNumber" label="Phone Number" />
      <DateField source="creationTime" label="Created on" />
      <DateField source="expirationTime" label="Expires on" />
    </SimpleShowLayout>
  </Show>
);

export const LicenseEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput
        source="timesActivated"
        label="Amount activated"
        validate={required()}
      />
      <BooleanInput source="isActive" label="Is Active" validate={required()} />
    </SimpleForm>
  </Edit>
);
