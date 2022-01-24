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
  EmailField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceManyField,
  EditButton,
  required,
  SaveButton,
  Toolbar,
  ImageInput,
  ImageField, BooleanInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import axios from "axios";

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
      <ImageField source="image.imageData" label="image" />
      <TextField source="pluginName" label="Plugin name" />
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
      <ImageInput source="image" label="Plugin image" accept="image/*" placeholder={<p>Drop your file here</p>} minSize={5} validate={required()}>
        <ImageField source="src" title="title"/>
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
      <ImageInput source="image" label="Plugin image" accept="image/*" placeholder={<p>Drop your file here</p>} minSize={5} validate={required()}>
        <ImageField source="src" title="title" validate={required()}/>
      </ImageInput>
    </SimpleForm>
  </Edit>
);

const PluginShowButton = ({ record }) => {
  return <ShowButton basePath="plugin" label="Show info" record={record} />;
};

const VariantCreateToolbar = props => (
  <Toolbar {...props} >
      <SaveButton />
  </Toolbar>
)

const onSaveVariant = (values) => {
  axios.post("/api/v1/admin/PluginVariant", {
    pluginId: values.id,
    description: values.description,
    price: values.price,
    maxActivations: values.maxActivations,
    isSubscription: values.isSubscription
  }
  ).then((response) => {
    window.location.reload(false);
  });
}

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
          <ReferenceManyField reference="pluginVariant" target="pluginId" addLabel={false}>
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
