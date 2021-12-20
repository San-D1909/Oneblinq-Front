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
  BooleanInput,
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

export const LicenseList = (props) => (
  <List {...props}>
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
