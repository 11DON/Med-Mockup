import styles from "../searchbar/searchbar.module.css"
import { useState } from "react";

export default function SearchBar({ initialValue = "", onSearch }) {
    const [value, setValue] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value.trim());
    }

    return (
        <form className={styles.bar} onSubmit={handleSubmit}>
            <label htmlFor="patient-search" className={styles.label}>Search for :</label>
            <input
                id="patient-search"
                className={styles.input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Name or national / passport ID"
            />
            <button type="submit" className={styles.button}>Search</button>
        </form>
    )
}

