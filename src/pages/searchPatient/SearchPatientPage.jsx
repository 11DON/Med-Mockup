import { useSearchParams } from "react-router-dom";
import { searchPatients } from "./patientDirectory.js";
import SearchBar from "../../components/searchbar/searchBar.jsx";
import PatientResultItem from "../../components/PatientResultItem/PatientResultItem.jsx";
import styles from "../searchPatient/searchPatient.module.css";

export default function SearchPatientPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const results = searchPatients(query);

  return (
    <>
      <h1 className={styles.pageTitle}>Search Patient</h1>

      <div className={styles.content}>
        <SearchBar initialValue={query} onSearch={(q) => setParams(q ? { q } : {})} />

        {query && (
          <>
            <h2 className={styles.resultsTitle}>Search Results</h2>
            {results.length === 0 ? (
              <p className={styles.empty}>No patients found for "{query}".</p>
            ) : (
              <ul className={styles.list}>
                {results.map((p) => (
                  <li key={p.patientId}>
                    <PatientResultItem patient={p} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
}