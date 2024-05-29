import { User } from "../model/User";
import { getAuthToken } from "./auth.service";


function generateUpdateObject(user: User, roles: string): any {
  return {
    "id": user.id,
    "email": user.emailAddress,
    "firstName": user.firstName,
    "lastName": user.lastName,
    "name": user.userName,
    "password": user.password,
    "roles": roles
  };
}

export async function getUsers() {
  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/auth/user/getAllUsers',
    {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Error creating user');
  }
  return resData;
}

export async function createUser(user: User) {

  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/auth/user/addNewUser',
    {
      method: 'POST',
      body: JSON.stringify(generateUpdateObject(user, "ROLE_ADMIN")),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Error creating user');
  }

  return resData;
}

export async function updateUser(user: User) {
  const token = getAuthToken();
  console.log("Calling updateUser with: ", user);
  /*
  const response = await fetch('http://localhost:8080/auth/user/updateUser',
    {
      method: 'PUT',
      body: JSON.stringify(generateUpdateObject(user, "ROLE_ADMIN")),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
  );
  */
  //const resData = await response.json();

  //if (!response.ok) {
    //throw new Error('Error updating user');
  //}

  //return resData;
  return null;
}

export async function deleteUser(user: User) {
  console.log("In DELETE USER: ", user);
  const token = getAuthToken();
  const response = await fetch('http://localhost:8080/auth/user/deleteUser',
    {
      method: 'DELETE',
      body: generateUpdateObject(user, "ROLE_ADMIN"),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Error deleting user');
  }

  return resData;
}