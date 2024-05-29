import styles from "./Signup.module.css";

export default function Signup() {
  function onSubmit(event: any) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log("SIGNUP::Data: ", data);

    event.target.reset();
  }

  return (
    <>
      <h2 className={styles.title}>Create New Account</h2>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
            <form onSubmit={onSubmit}>
              <div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" name="firstName" id="firstName" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" name="lastName" id="lastName" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="userName">User Name</label>
                  <input type="text" name="userName" id="userName" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control"
                  />
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
