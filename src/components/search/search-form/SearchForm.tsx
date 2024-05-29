import React from "react";
import styles from "./SearchForm.module.css";

interface Filters {
  userName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

interface SearchFormProps {
  filters: Filters;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchForm({ filters, onFilterChange }: SearchFormProps) {
  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="emailAddress" className={styles.label}>Email</label>
        <input
          type="text"
          id="emailAddress"
          name="emailAddress"
          value={filters.emailAddress}
          onChange={onFilterChange}
          className={styles.searchInput}
          autoComplete="off"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="firstName" className={styles.label}>First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={filters.firstName}
          onChange={onFilterChange}
          className={styles.searchInput}
          autoComplete="off"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="lastName" className={styles.label}>Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={filters.lastName}
          onChange={onFilterChange}
          className={styles.searchInput}
          autoComplete="off"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="userName" className={styles.label}>User Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={filters.userName}
          onChange={onFilterChange}
          className={styles.searchInput}
          autoComplete="off"
        />
      </div>
    </form>
  );
}