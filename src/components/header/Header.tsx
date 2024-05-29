import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const token: string = useRouteLoaderData("root") as string;
  const isLoggedIn = token?.length > 0;

  return (
    <>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink to="/" className="navbar-brand">
              Home
            </NavLink>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              {isLoggedIn && (
                <li>
                  <NavLink
                    to="/search"
                    className={({ isActive }) =>
                      isActive ? styles.active : undefined
                    }
                  >
                    Search
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink
                    to="/edit"
                    className={({ isActive }) =>
                      isActive ? styles.active : undefined
                    }
                  >
                    Edit
                  </NavLink>
                </li>
              )}
            </ul>

            <ul className="nav navbar-nav navbar-right">
            {isLoggedIn && (
                <li className={styles.navItem}>
                    <NavLink
                      to="/logout"
                      className={({ isActive }) =>
                        isActive ? styles.active : styles.inactive
                      }
                    >
                      Logout
                    </NavLink>
                </li>
              )}
              {!isLoggedIn && (
                <li className={styles.navItem}>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.inactive
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )}

            </ul>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.reactLogo}
            src="logo192.png"
            alt="React Logo"
          />
          <h4 className={styles.reactLabel}>React</h4>
        </div>
      </nav>
    </>
  );
}
