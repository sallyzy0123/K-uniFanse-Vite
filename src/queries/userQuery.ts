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

const checkTokenQuery = `
query CheckToken {
  checkToken {
    user {
      id
      user_name
      email
    }
    message
  }
}`;

const updateUserMutation = `
mutation UpdateUser($user: UserModifyInput!) {
  updateUser(user: $user) {
    user {
      id
      user_name
      email
    }
    message
  }
}`;

const userQuery = `
query User($userId: ID!) {
  user(id: $userId) {
    id
    user_name
    email
  }
}`;

export { loginMutation, registerMutation, deleteUserMutation, checkTokenQuery, updateUserMutation, userQuery };
