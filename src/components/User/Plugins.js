// in src/posts.js
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  Show,
  SimpleShowLayout,
  RichTextField,
  NumberField,
  ShowButton,
} from "react-admin";
import {
  TextInput,
} from "react-admin";

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

const PluginShowButton = ({ record }) => {
  return <ShowButton basePath="plugin" label="Show info" record={record} />;
};

export const PluginShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="pluginName" label="Plugin name" />
      <RichTextField source="pluginDescription" label="Plugin description" />
      <NumberField source="price" label="Price" />
    </SimpleShowLayout>
  </Show>
);
