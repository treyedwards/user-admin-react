import { useState, useEffect } from "react";
import styles from "./EditUser.module.css";
import { Form, useLocation, useNavigate, useParams } from "react-router-dom";
import { User } from "../../shared/model/User";
import { createUser, updateUser, deleteUser } from "../../shared/service/user-data.service";

export default function EditUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isCreateMode = searchParams.get('mode') === 'create';

  const initialUser = isCreateMode
    ? new User(-1, "", "", "", "", "", "", [])
    : location.state.user;

  const [formData, setFormData] = useState({
    id: initialUser.id,
    emailAddress: initialUser.emailAddress,
    firstName: initialUser.firstName,
    lastName: initialUser.lastName,
    userName: initialUser.userName,
    password: initialUser.password,
    confirmPassword: initialUser.password
  });

  const [enteredValues, setEnteredValues] = useState({
    id: -1,
    emailAddress: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: ""
  });

  const [didEdit, setDidEdit] = useState({
    id: -1,
    emailAddress: false,
    firstName: false,
    lastName: false,
    userName: false,
    password: false,
    confirmPassword: false
  });

  const [passwordsMatched, setPasswordsMatched] = useState(true);

  function handleInputBlur(identifier: string) {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true
    }));
  }

  function handleInputChange(identifier: string, event: any) {
    const { name, value } = event.target;

    setFormData(prevValues => ({
      ...prevValues,
      [name]: value
    }));
    setEnteredValues(prevValues => ({
      ...prevValues,
      [identifier]: value
    }));
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: false
    }));
  }

  function handleResetForm() {
    setFormData({
      id: '',
      emailAddress: '',
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      confirmPassword: ''
    });
  }

  async function onSubmit(this: any, event: any) {
    event.preventDefault();
    const fd = new FormData(event.target);
    let data = Object.fromEntries(fd.entries()) as unknown as User;
    console.log("SIGNUP::Data: ", data);
    //if (data !== null && data !== undefined) {
      //(data as { id: string }).id = userId + "";
    //}
    /*
    if (data.password !== data.confirmPassword) {
      setPasswordsMatched(false);
      return;
    }
    */
    try {
      if (isCreateMode) {
        await createUser(data);
      } else {
        console.log("Updating user: ", data);
        await updateUser(data); // Typecast 'data' as 'User'
      }
      navigate('/search');
    } catch (error) {
      console.error("Error during submit:", error);
    }
    event.target.reset();
  }

  async function onDeleteUser(event: any) {
    try {
      await deleteUser(initialUser);
      navigate('/search');
    } catch (error) {
      console.error("Error during delete:", error);
    }
  }

  function onCancel(event: any) {
    navigate('/search');
  }

  const emailIsInvalid = didEdit.emailAddress && !enteredValues.emailAddress.includes('@');

  return (
    <>
      <h2 className={styles.title}>{isCreateMode ? 'Create User' : 'Edit User'}</h2>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
            <Form onSubmit={onSubmit}>
              <div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="emailAddress"
                    id="email"
                    onChange={(event) => handleInputChange('emailAddress', event)}
                    onBlur={() => handleInputBlur('emailAddress')}
                    className="form-control"
                    required
                    value={formData.emailAddress}
                  />
                  <div className="help-block">
                    {emailIsInvalid && <p>Please enter a valid email address.</p>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onBlur={() => handleInputBlur('firstName')}
                    onChange={(event) => handleInputChange('firstName', event)}
                    className="form-control"
                    required
                    value={formData.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={(event) => handleInputChange('lastName', event)}
                    onBlur={() => handleInputBlur('lastName')}
                    id="lastName"
                    className="form-control"
                    required
                    value={formData.lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userName">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    onChange={(event) => handleInputChange('userName', event)}
                    onBlur={() => handleInputBlur('userName')}
                    id="userName"
                    className="form-control"
                    required
                    minLength={6}
                    value={formData.userName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={(event) => handleInputChange('password', event)}
                    onBlur={() => handleInputBlur('password')}
                    id="password"
                    className="form-control"
                    minLength={7}
                    value={formData.password}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={(event) => handleInputChange('confirmPassword', event)}
                    onBlur={() => handleInputBlur('confirmPassword')}
                    id="confirmPassword"
                    className="form-control"
                    minLength={7}
                    value={formData.confirmPassword}
                  />
                </div>
                <div className="help-block">
                  {!passwordsMatched && <p>Passwords do not match.</p>}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                {!isCreateMode && (
                  <button
                    className="btn btn-primary"
                    type="submit"
                  >
                    Update
                  </button>
                )}
                {!isCreateMode && (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={onDeleteUser}
                  >
                    Delete
                  </button>
                )}
                {isCreateMode && (
                  <button
                    className="btn btn-primary"
                    type="submit"
                  >
                    Create
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" type="reset" onClick={handleResetForm}>
                  Clear Form
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}