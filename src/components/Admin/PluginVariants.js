import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  BooleanInput,
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
import axios from "axios";

const onSaveVariant = (values) => {
  axios.put("/api/v1/admin/PluginVariant", {
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