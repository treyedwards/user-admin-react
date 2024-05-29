//import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
//import { User } from '../model/User';
import { json, redirect } from 'react-router-dom';



export interface AuthResponseData {
  token: string;
}

export function getTokenDuration() {
  const storedExpiration = localStorage.getItem('tokenExpiration');
  let duration = -1;
  if (storedExpiration) {
    const expirationDate = new Date(storedExpiration);
    const now = new Date();
    duration = expirationDate.getTime() - now.getTime();
  }
  return duration;
}

export function setAuthToken(token: string) {
  localStorage.setItem('authToken', token);
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 1);
  localStorage.setItem('tokenExpiration', expirationTime.toISOString());
}

export function getAuthToken() {
  const token = localStorage.getItem('authToken') || null;
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration <= 0) {
    return 'EXPIRED';
  }
  return token;
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiration');
}

export async function logoutAction({ request }: { request: Request }) {
  logout();
  return redirect('/');
}

export function authTokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/login');
  }

  return null;
}

export async function registerAction({ request }: { request: Request }) {
  try {
    const data = await request.formData();
    const userName = data.get('userName');
    const password = data.get('password');

    if (typeof userName !== 'string' || typeof password !== 'string') {
      throw new Error('User name and password must be strings');
    }

    const authData = {
      'username': userName,
      password
    };

    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw new Error('Could not authenticate user.');
    }

    // Handle the response, if needed
    // const responseData = await response.json();

    // Manage token if applicable

    // Redirect to home
    return redirect('/');
  } catch (error) {
    console.error('Error during authentication:', error);
    throw json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function loginAction({ request }: { request: Request }) {
  try {
    const data = await request.formData();
    const userName = data.get('userName');
    const password = data.get('password');

    if (typeof userName !== 'string' || typeof password !== 'string') {
      throw new Error('User name and password must be strings');
    }

    const authData = {
      'username': userName,
      password
    };

    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      //throw new Error('Could not authenticate user.');
      //return { error: "Error: Could not authenticate user!" };
      return ({ errors: { login: "Invalid username or password" }});


    }

    // Handle the response, if needed
    const responseData = await response.json();
    const token = responseData.token;
    setAuthToken(token);
    // Redirect to home
    return redirect('/search');
  } catch (error) {
    console.error('Error during authentication:', error);
    throw json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


/*
export class AuthService {

  private token: string | undefined;

  user = new BehaviorSubject<User>(new User(-1, "", "", "", "", "", "", []));
  private tokenExpirationTimer: any;


  constructor() {}

  public getToken(): string | undefined{
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  // login(userName: string, password: string) {
  //   return this.http.post<AuthResponseData>(
  //     "http://localhost:8080/auth/login",
  //     {
  //       username: userName,
  //       password: password
  //     }
  //   ).pipe(catchError(this.handleError),
  //     tap(resData=> {
  //       this.handleAuthentication(userName, userName, resData.token, 3600);
  //     })
  // );
  // }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(-1, email, userId, "", "", token, "", []);
    this.setToken(token);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private autoLogout(duration: number) {
    this.tokenExpirationTimer = setTimeout(()=> {
      //this.logout();
    }, duration);
  }

  // public logout(): void {
  //   this.user.next(new User(-1, "", "", "", "", "", "", []));
  //   this.router.navigate(['/home']);
  //   localStorage.removeItem('userData');
  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error occurred!';
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(()=> new Error(errorMessage));
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = 'This email exists already';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'This email does not exist.';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'This password is not correct.';
  //       break;
  //   }
  //   return throwError(()=> new Error(errorMessage));
  // }
}
*/