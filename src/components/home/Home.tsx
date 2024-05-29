import { Link, useRouteLoaderData } from "react-router-dom";

import styles from "./Home.module.css";

export default function Home() {

  const token: string = useRouteLoaderData("root") as string;
  const isLoggedIn = token?.length > 0;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className={styles.homeContainer}>
            <h1>Welcome to the User Administration Application!</h1>

            { !isLoggedIn &&
                  <p>
                    Please <Link to="/login">Login</Link> or <Link to="/register"> Create a New Account</Link> to Continue.
                  </p>
            }
            { isLoggedIn &&
                  <p>
                    Head on over to <Link to="/search">Search</Link> to begin or <Link to="/login">Logout</Link>.
                  </p>
            }
          </div>
        </div>
      </div>
    </>
  );
}
