import { Subject, map, tap } from 'rxjs';
import { User } from '../model/User';

interface UserResponse {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  name: string;
  password: string;
  roles?: string[];
};

export class UserService {

  usersChanged = new Subject<User[]>();
  isEditingSubject = new Subject<boolean>();

  allUsers: User[] = [];
  users: User[] = [];

  editUser: User | undefined;

  constructor() { }


  public setUsers(users: User[]) {
    this.allUsers = this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  public getUsers(): User[] {
    return this.users.slice();
  }

  setEditUser(user: User | undefined) {
    this.editUser = user;
  }

  setIsEditing(value: boolean) {
    this.isEditingSubject.next(value);
  }

  getEditUser(): User | undefined {
    return this.editUser;
  }

  setSearchValues(userData: User) {
    if (this.isUserEmpty(userData)) {
      this.users = this.allUsers;
      this.usersChanged.next(this.users);
    } else {
      this.users = this.filterUsers(userData);
      this.usersChanged.next(this.users.slice());
    }
  }

  filterUsers(userData: User): User[] {
    return this.filterArray(this.allUsers, (user) => { return this.hasMatch(userData, user) });
  }

  filterArray(array: any[], callback: (element: any) => boolean): any[] {
    const filteredArray = [];
    for (const element of array) {
      if (callback(element)) {
        filteredArray.push(element);
      }
    }
    return filteredArray;
  }

  hasMatch(user1: any, user2: any): boolean {
    let matched: boolean = false;
    if (user1 && user2) {
      matched = this.hasFieldMatch(user1.userData.email, user2.emailAddress)
        || this.hasFieldMatch(user1.userData.firstName, user2.firstName)
        || this.hasFieldMatch(user1.userData.lastName, user2.lastName)
        || this.hasFieldMatch(user1.userData.userName, user2.userName)
    }
    return matched;
  }

  hasFieldMatch(field1: string, field2: string): boolean {
    let value: boolean = field1 !== null && field2 !== null && field1.length > 0 && field2.length > 0 && field2.toLowerCase().indexOf(field1.toLowerCase()) >= 0;
    return value;
  }

  isUserEmpty(userData: any): boolean {
    return userData.userData == null || (
      (userData.userData.email === null || userData.userData.email.length <= 0)
      && (userData.userData.firstName === null || userData.userData.firstName.length <= 0)
      && (userData.userData.lastName === null || userData.userData.lastName.length <= 0)
      && (userData.userData.userName === null || userData.userData.userName.length <= 0)
    );
  }

  /*
  export async function fetchUsers() {

    return this.http
      .get<UserResponse[]>(
        'http://localhost:8080/auth/user/getAllUsers'
      )
      .pipe(
        map(users => {
          return users.map(user => {
            console.log("User User is: ", user);
            let newUser = new User(user.id, user.email, user.name, user.firstName, user.lastName, "", user.password, []);
            return {
              ...newUser
            };
          });
        }),
        tap(users => {
          this.setUsers(users);
        })
      );
  }


  createUser(user: User) {
    return this.http.post('http://localhost:8080/auth/addNewUser', this.generateUpdateObject(user, "ROLE_ADMIN"));
  }

  updateUser(user: User) {
    return this.http.put('http://localhost:8080/auth/user/updateUser', this.generateUpdateObject(user, "ROLE_ADMIN"));
  }

  deleteUser(user: User) {
    console.log("Deleting user with ID: " + user.id);
    return this.http.put('http://localhost:8080/auth/user/deleteUser', this.generateUpdateObject(user, "ROLE_ADMIN"));
  }
  */

  generateUpdateObject(user: User, roles: string): any {
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
}

export async function userLoader() {
  const response = await fetch("http://localhost8080/login");
  if (response.ok) {
    const resData = await response.json();
    return resData.data;
  } else {
    // show error
  }
}