const loginMutation = `
mutation Login($credentials: Credentials!) {
    login(credentials: $credentials) {
      token
      user {
        id
        user_name
        email
      }
      message
    }
  }`;

const registerMutation = `
mutation Register($user: UserInput!) {
    register(user: $user) {
      user {
        id
        user_name
        email
      }
      message
    }
  }`;

const deleteUserMutation = `
mutation DeleteUser {
  deleteUser {
    user {
      id
      user_name
      email
    }
    message
  }
}`;

export { loginMutation, registerMutation, deleteUserMutation };
