import { useState } from "react";
import styles from "./Login.module.css";
import { Form, useActionData } from "react-router-dom";
import { loginAction } from "../../shared/service/auth.service";

interface LoginData {
  errors?: Record<string, string>;
  message?: string;
}

export default function Login() {
  const loginData = useActionData() as LoginData;
  const [enteredValues, setEnteredValues] = useState({
    userName: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // async function handleSubmit(event: React.FormEvent) {
  //   event.preventDefault();

  //   try {
  //     const response: Response = await loginAction(enteredValues);

  //     if (response.error) {
  //       setErrorMessage(response.error);
  //     } else {
  //       // Handle successful login (e.g., redirect to another page)
  //     }
  //   } catch (error) {
  //     setErrorMessage(error.message);
  //   }
  // }

  function handleInputChange(identifier: string, value: any) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  return (
    <>
      {/* errorMessage && (
        <div className="alert alert-danger">
          <p>{errorMessage}</p>
        </div>
      ) */}
      <h2 className={styles.title}>Login</h2>
      <div className={styles.container}>
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          {/*
          <div className="alert alert-danger" >
            <p>errorMessage</p>
          </div>
          */}

          <Form method="POST">
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                id="userName"
                className="form-control"
                name="userName"
                required
                onChange={(event) =>
                  handleInputChange("userName", event.target.value)
                }
                value={enteredValues.userName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                required
                onChange={(event) =>
                  handleInputChange("password", event.target.value)
                }
                value={enteredValues.password}
              />
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </Form>
          {/*loginData?.errors?.login && (
            <div className={`alert alert-danger ${styles.authError} `}>
            <p>{loginData.errors.login}</p>
          </div>
          )*/}
          {loginData?.errors?.login && (
            <div className={styles.authErrorWrapper}>
              <div className={`${styles.authError} alert alert-danger`}>
                <p>{loginData.errors.login}</p>
              </div>
            </div>
          )}
          <div>
            {/* loginData && loginData.errors && (
              <ul>
                {Object.values(loginData.errors).map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) */}
          </div>
        </div>
      </div>
    </>
  );
}
