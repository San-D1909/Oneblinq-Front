// in src/posts.js
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    BooleanField,
    ImageInput,
    TranslatableInputs,
    ImageField,
    NumberInput,
    TranslatableFields,
    Show,
    SimpleShowLayout,
    RichTextField,
    NumberField,
    ShowButton,
    PasswordInput,
    BooleanInput, ArrayField
} from "react-admin";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceManyField,
  EditButton,
  required,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const LicenseFilters = [
    <TextInput label="Licensekey" source="licenseKey"/>,
    <TextInput label="License name" source="license.typeName"/>,
];

const LicensePanel = ({ id, record, resource }) => {
    console.log(record);
    return (
        <>
            <h3>Plugins</h3>
            <ArrayField className="col-12" source="plugins" label="">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="pluginName" />
                    <NumberField source="monthlyPrice" />
                    <NumberField source="fullPrice" />
                    {/*<BooleanField source="isVerified" label="Verified" />*/}
                    {/*<TextField source="company.companyName" label="Company name" />*/}
                    {/*<TextField source="company.phoneNumber" label="Phonenumber" />*/}
                    {/*<TextField source="company.bTWNumber" label="BTW number" />*/}
                    {/*<TextField source="company.kVKNumber" label="KVK number" />*/}
                </Datagrid>
            </ArrayField>
        </>
    )
    // return (<div dangerouslySetInnerHTML={{
    //     __html: record.licenseKey
    // }}
    // />)
}

export const LicenseList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="licenseKey" label="License key" />
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
      <TextField source="timesActivated" label="Amount activated" />
      <BooleanField source="isActive" label="Is Active" />
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
