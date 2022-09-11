export const authFormState = [
  {
    title: "Invite for evolution",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Evoluter name eg. Manikangkan Das",
      },
      {
        label: "Invitation Email",
        placeholder: "Email eg. manikangkan.das@rubrica.com",
        type: "email",
        name: "email",
      },
    ],
    button: "Invite",
  },
  {
    title: "Administrator login",
    fields: [
      {
        label: "Email",
        placeholder: "Email",
        type: "email",
        name: "email",
      },
      {
        label: "Password",
        placeholder: "Password",
        type: "password",
        name: "password",
      },
    ],
    button: "Login",
  },
];
