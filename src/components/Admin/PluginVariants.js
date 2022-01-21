import React from "react";
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
    </SimpleForm>
  </Edit>
);