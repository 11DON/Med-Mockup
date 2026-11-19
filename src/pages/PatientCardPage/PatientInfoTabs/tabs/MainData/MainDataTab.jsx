
import { Field } from "../shared.jsx";
import styles from "../MainData/mainData.module.css";
export default function MainDataTab({ patient }) {
    const { address, school } = patient;

    if (!address) return <p>No Data Available</p>

    return (
        <div className={styles.content}>
            <div>
                <h2 className={styles.heading}>Address:</h2>
                <Field label="Country" value={address.country} />
                <br />
                <Field label="Governorate" value={address.governorate} />
                <br />
                <Field label="Area" value={address.area} />
            </div>
            <div className={styles.school}>
                <Field label="School Name" value={school?.name} />
                <Field label="Grade" value={school?.grade} />
            </div>
        </div>
    )
}