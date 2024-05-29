import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchResults.module.css";
import { Edit } from "@mui/icons-material";

interface User {
  id: number;
  userName: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
}

interface SearchResultsProps {
  userData: User[];
}

export default function SearchResults({ userData }: SearchResultsProps) {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(userData);

  useEffect(() => {
    setUsers(userData);
  }, [userData]);

  const handleEditClick = (user: User) => {
    navigate(`/edit/${user.id}`, { state: { user } });
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.id_column}>ID</th>
            <th className={styles.email_column}>Email</th>
            <th className={styles.name_column}>User name</th>
            <th className={styles.name_column}>First name</th>
            <th className={styles.name_column}>Last name</th>
            <th className={styles.id_column}></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={styles.id_column}>{user.id}</td>
              <td className={styles.email_column}>{user.emailAddress}</td>
              <td className={styles.name_column}>{user.userName}</td>
              <td className={styles.name_column}>{user.firstName}</td>
              <td className={styles.name_column}>{user.lastName}</td>
              <td>
                <Edit
                  className={styles.edit_column}
                  aria-hidden="false"
                  aria-label="Edit User"
                  onClick={() => handleEditClick(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}