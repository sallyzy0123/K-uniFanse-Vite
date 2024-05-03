const loginQuery = `
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

const registerQuery = `
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

export { loginQuery, registerQuery };
