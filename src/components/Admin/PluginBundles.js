// in src/posts.js
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  NumberInput,
  Show,
  RichTextField,
  NumberField,
  ShowButton,
  TabbedShowLayout,
  Tab,
  ArrayField,
  EmailField, ImageInput, ImageField, ReferenceManyField, EditButton, BooleanInput, Toolbar, SaveButton,
} from "react-admin";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  required,
  SelectArrayInput,
  ReferenceArrayInput,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import axios from "axios";

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
      <ImageField source="image.imageData" label="Image"/>
      <TextField source="bundleName" label="Plugin name" />
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
      <ReferenceArrayInput label="plugin" reference="plugin" source="pluginIds">
        <SelectArrayInput optionText="pluginName" validate={required()} />
      </ReferenceArrayInput>
      <ImageInput source="image" label="Plugin image" accept="image/*" placeholder={<p>Drop your file here</p>}  minSize={5} validate={required()}>
        <ImageField source="src" title="title" />
      </ImageInput>
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
        <ReferenceArrayInput label="plugin" reference="plugin" source="plugins">
          <SelectArrayInput optionText="pluginName" validate={required()} />
        </ReferenceArrayInput>
        <ImageInput source="image" label="Plugin image" accept="image/*" placeholder={<p>Drop your file here</p>}  minSize={5} validate={required()}>
          <ImageField source="src" title="title" />
        </ImageInput>
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

const VariantCreateToolbar = props => (
    <Toolbar {...props} >
      <SaveButton />
    </Toolbar>
)


const onSaveVariant = (values) => {
  axios.post("/api/v1/admin/PluginBundleVariant", {
        pluginBundleId: values.id,
        description: values.description,
        price: values.price,
        maxActivations: values.maxActivations,
        isSubscription: values.isSubscription
      }
  ).then((response) => {
    window.location.reload(false);
  });
}

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
        <Tab label="Plugins" path="plugin">
          <ArrayField className="col-12" source="plugins" label="">
            <Datagrid className="col-12">
              <TextField source="id" />
              <TextField source="pluginName" />
            </Datagrid>
          </ArrayField>
        </Tab>
        <Tab label="Variants" path="pluginVariant">
          <SimpleForm save={onSaveVariant} toolbar={<VariantCreateToolbar />}>
            <TextInput
                source="description"
                label="Plugin description"
                validate={required()}
            />
            <NumberInput
                source="price"
                label="Price"
                validate={required()}
            />
            <NumberInput source="maxActivations" label="Activation count" />
            <BooleanInput source="isSubscription" label="Subscription" />
          </SimpleForm>
          <ReferenceManyField reference="pluginBundleVariant" target="pluginBundleId" addLabel={false}>
            <Datagrid>
              <TextField source="description" />
              <NumberField
                  source="price"
                  label="Price"
                  options={{ style: "currency", currency: "EUR" }}
              />
              <NumberField source="maxActivations" label="Activation count" />
              <BooleanField source="isSubscription" label="Subscription" />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};
