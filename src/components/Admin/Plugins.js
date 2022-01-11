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

const PluginFilters = [
  <TextInput label="Plugin name" source="pluginName" />,
  <TextInput label="Plugin description" source="pluginDescription" />,
];

const PluginPanel = ({ id, record, resource }) => {
  console.log(record);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: record.pluginDescription,
      }}
    />
  );
};

export const PluginList = (props) => (
  <List {...props} filters={PluginFilters}>
    <Datagrid expand={<PluginPanel />}>
      <TextField source="pluginName" label="Plugin name" />
      <NumberField
        source="monthlyPrice"
        label="Monthly Price"
        options={{ style: "currency", currency: "EUR" }}
      />
      <NumberField
        source="fullPrice"
        label="Full Price"
        options={{ style: "currency", currency: "EUR" }}
      />
      <PluginShowButton {...props} />
    </Datagrid>
  </List>
);

export const PluginCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        source="pluginName"
        label="Plugin name"
        validate={required()}
      />
      <RichTextInput
        source="pluginDescription"
        label="Plugin description"
        validate={required()}
      />
      <NumberInput
        source="monthlyPrice"
        label="Monthly Price"
        validate={required()}
      />
      <NumberInput
        source="fullPrice"
        label="Full Price"
        validate={required()}
      />
      <ImageInput source="image" label="Plugin image" accept="image/*" placeholder={<p>Drop your file here</p>}>
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const PluginEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput
        source="pluginName"
        label="Plugin name"
        validate={required()}
      />
      <RichTextInput
        source="pluginDescription"
        label="Plugin description"
        validate={required()}
      />
      <NumberInput
        source="monthlyPrice"
        label="Monthly Price"
        validate={required()}
      />
      <NumberInput
        source="fullPrice"
        label="Full Price"
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);

const PluginShowButton = ({ record }) => {
  return <ShowButton basePath="plugin" label="Show info" record={record} />;
};

const UsersOverview = (props) => {
  console.log(props);
  return <List {...props}></List>;
};

export const PluginShow = (props) => {
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Summary">
          <TextField source="pluginName" label="Plugin name" />
          <RichTextField
            source="pluginDescription"
            label="Plugin description"
          />
          <NumberField
            source="monthlyPrice"
            label="Monthly Price"
            options={{ style: "currency", currency: "EUR" }}
          />
          <NumberField
            source="fullPrice"
            label="Full Price"
            options={{ style: "currency", currency: "EUR" }}
          />
          <ImageField source="image.imageData" title="title" label="Image"/>
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
      </TabbedShowLayout>
    </Show>
  );
};
