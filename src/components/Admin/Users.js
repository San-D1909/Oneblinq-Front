// in src/posts.js
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  Show,
  SimpleShowLayout,
  ShowButton,
  PasswordInput,
  BooleanInput,
} from "react-admin";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

const UserFilters = [
  <TextInput label="Plugin name" source="pluginName" />,
  <TextInput label="Plugin description" source="pluginDescription" />,
];

const UserPanel = ({ id, record, resource }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: record.pluginDescription,
      }}
    />
  );
};

export const UserList = (props) => (
  <List {...props} filters={UserFilters}>
    <Datagrid expand={<UserPanel />}>
      <TextField source="id" label="User Id" />
      <TextField source="email" label="User Email" />
      <TextField source="fullName" label="Full Name" />
      <BooleanField source="isVerified" label="Is Verified" />
      <BooleanField source="isAdmin" label="Is Admin" />
      <UserShowButton {...props} />
    </Datagrid>
  </List>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" label="Email" validate={required()} />
      <TextInput source="fullName" label="Fullname" validate={required()} />
      <PasswordInput source="password" label="Password" validate={required()} />
      <PasswordInput
        source="passwordConfirmation"
        label="Password Confirmation"
        validate={required()}
      />
      <BooleanInput source="isAdmin" label="Is Admin" validate={required()} />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="email" label="Email" validate={required()} />
      <TextInput source="fullName" label="Fullname" validate={required()} />
      <BooleanInput
        source="isVerified"
        label="Is Verified"
        validate={required()}
      />
      <BooleanInput source="isAdmin" label="Is Admin" validate={required()} />
    </SimpleForm>
  </Edit>
);

const UserShowButton = ({ record }) => {
  return <ShowButton basePath="user" label="Show info" record={record} />;
};

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="email" label="Email" />
      <TextField source="fullName" label="Fullname" />
      <BooleanField source="isVerified" label="Is Verified" />
      <BooleanField source="isAdmin" label="Is Admin" />
    </SimpleShowLayout>
  </Show>
);
