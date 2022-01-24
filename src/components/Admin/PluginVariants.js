import React from "react";
import {
  BooleanInput,
  NumberInput,
  Edit,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const PluginVariantEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
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
      <BooleanInput source="isSubscription" label="Subscription" />
    </SimpleForm>
  </Edit>
);