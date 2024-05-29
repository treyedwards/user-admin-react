import { useEffect, useState } from "react";
import styles from "./Search.module.css";
import SearchForm from "./search-form/SearchForm";
import SearchResults from "./search-results/SearchResults";
import { getUsers } from "../shared/service/user-data.service";

// Define the ServerUser type based on the structure of the data received from the server
interface ServerUser {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  token?: string;
  authorizations?: string[];
}

// Define the transformed User type
interface User {
  id: number;
  userName: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  password?: string;
  token?: string;
  authorizations?: string[];
}

export default function Search() {
  const [userData, setUserData] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const [filters, setFilters] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    emailAddress: ""
  });

  useEffect(() => {
    async function fetchUserData() {
      setIsFetching(true);
      try {
        const users: ServerUser[] = await getUsers();
        console.log("GOT USERS: ", users);
        const transformedUsers: User[] = users.map((user) => ({
          id: user.id,
          userName: user.name,
          emailAddress: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
        }));

        console.log("TRANSFORMED USERS:", transformedUsers);
        setUserData(transformedUsers);
      } catch (error: any) {
        setError(error.message || "Error Fetching Users");
      } finally {
        setIsFetching(false);
      }
    }

    fetchUserData();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredUserData = userData.filter(
    (user) =>
      user.userName.toLowerCase().includes(filters.userName.toLowerCase()) &&
      user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      user.emailAddress.toLowerCase().includes(filters.emailAddress.toLowerCase())
  );

  return (
    <>
      <h2 className={styles.searchLabel}>Search Results</h2>
      <div className={styles.formContainer}>
        <SearchForm filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <SearchResults userData={filteredUserData} />
    </>
  );
}