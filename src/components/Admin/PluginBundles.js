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
  SelectInput,
  ReferenceInput,
  SelectArrayInput,
  ReferenceArrayInput,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const PluginFilters = [
  <TextInput label="Plugin name" source="bundleName" />,
  <TextInput label="Plugin description" source="bundleDescription" />,
];

const PluginBundlePanel = ({ id, record, resource }) => {
  console.log(record);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: record.bundleDescription,
      }}
    />
  );
};

export const PluginBundleList = (props) => (
  <List {...props} filters={PluginFilters}>
    <Datagrid expand={<PluginBundlePanel />}>
      <TextField source="bundleName" label="Plugin name" />
      <NumberField
        source="price"
        options={{ style: "currency", currency: "EUR" }}
      />
      <PluginBundleShowButton {...props} />
    </Datagrid>
  </List>
);

export const PluginBundleCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        source="bundleName"
        label="Plugin Bundle name"
        validate={required()}
      />
      <RichTextInput
        source="bundleDescription"
        label="Plugin Bundle description"
        validate={required()}
      />
      <NumberInput source="price" validate={required()} />
      <ReferenceArrayInput label="plugin" reference="plugin" source="pluginIds">
        <SelectArrayInput optionText="pluginName" validate={required()} />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export const PluginBundleEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput
          source="bundleName"
          label="Plugin Bundle name"
          validate={required()}
        />
        <RichTextInput
          source="bundleDescription"
          label="Plugin Bundle description"
          validate={required()}
        />
        <NumberInput source="price" label="Price" validate={required()} />
        <ReferenceArrayInput label="plugin" reference="plugin" source="plugins">
          <SelectArrayInput optionText="pluginName" validate={required()} />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};

const PluginBundleShowButton = ({ record }) => {
  return (
    <ShowButton basePath="pluginbundle" label="Show info" record={record} />
  );
};

const UsersOverview = (props) => {
  console.log(props);
  return <List {...props}></List>;
};

export const PluginBundleShow = (props) => {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Summary">
          <TextField source="bundleName" label="Plugin Bundle name" />
          <RichTextField
            source="bundleDescription"
            label="Plugin Bundle description"
          />
          <NumberField source="price" label="Price" />
        </Tab>
        <Tab label="Used By" path="user">
          <ArrayField className="col-12" source="users" label="">
            <Datagrid className="col-12">
              <TextField source="id" />
              <EmailField source="email" />
              <BooleanField source="isVerified" label="Verified" />
              <TextField source="company.companyName" label="Company name" />
              <TextField source="company.phoneNumber" label="Phonenumber" />
              <TextField source="company.bTWNumber" label="BTW number" />
              <TextField source="company.kVKNumber" label="KVK number" />
            </Datagrid>
          </ArrayField>
        </Tab>
        <Tab label="Plugins" path="plugin">
          <ArrayField className="col-12" source="plugins" label="">
            <Datagrid className="col-12">
              <TextField source="id" />
              <TextField source="pluginName" />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
