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
  TabbedShowLayout,
  Tab,
  ReferenceArrayField,
  ArrayField,
  email,
  EmailField,
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

export const LicenseTypeList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="typeName" label="License Type Name" />
      <NumberField source="maxAmount" label="Max amount" />
      <LicenseTypeShowButton {...props} />
    </Datagrid>
  </List>
);

export const LicenseTypeCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        source="typeName"
        label="License Type Name"
        validate={required()}
      />
      <NumberInput
        source="maxAmount"
        label="Max amount"
        validate={required()}
      />
    </SimpleForm>
  </Create>
);

export const LicenseTypeEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput
        source="typeName"
        label="License Type Name"
        validate={required()}
      />
      <NumberInput
        source="maxAmount"
        label="Max amount"
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);

const LicenseTypeShowButton = ({ record }) => {
  return (
    <ShowButton basePath="licenseType" label="Show info" record={record} />
  );
};

export const LicenseTypeShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="typeName" label="License Type Name" />
        <NumberField source="maxAmount" label="Max amount" />
      </SimpleShowLayout>
    </Show>
  );
};
