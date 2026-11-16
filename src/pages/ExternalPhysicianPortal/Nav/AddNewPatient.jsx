import styles from "../ExternalPhysician.module.css"



export default function AddPatientForm() {
  return (
    <div className={styles.patientForm}>
      <div className={styles.formGrid}>
        <div className={styles.formRow}>
          <div className={`${styles.half} ${styles.halfLeft}`}>
            <label className={styles.formLabel} htmlFor="patientName">
              Patient Name:
            </label>
            <input
              id="patientName"
              className={`${styles.formInput} ${styles.control}`}
              type="text"
              defaultValue="Jana Mohamed Ismail"
            />
          </div>
          <div className={`${styles.half} ${styles.halfRight} ${styles.halfRtl}`}>
            <label className={styles.formLabelArabic} htmlFor="patientNameArabic">
              اسم المريض
            </label>
            <input
              id="patientNameArabic"
              className={`${styles.formInputArabic} ${styles.control} ${styles.wide}`}
              type="text"
              defaultValue="جنا محمد إسماعيل"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={`${styles.half} ${styles.halfLeft}`}>
            <label className={styles.formLabel} htmlFor="nationality">
              Nationality:
            </label>
            <div className={`${styles.control} ${styles.selectWrap}`}>
              <select id="nationality" className={styles.formSelect} defaultValue="Egypt">
                <option value="Egypt">Egypt</option>
                <option value="Jordan">Jordan</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
              </select>
            </div>
          </div>

          <div className={`${styles.half} ${styles.halfRight}`}>
            <label className={styles.formLabel} htmlFor="passportId">
              National/Passport ID:
            </label>
            <input
              id="passportId"
              className={`${styles.formInput} ${styles.control}`}
              type="text"
              defaultValue="318241024010514"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={`${styles.half} ${styles.halfLeft}`}>
            <label className={styles.formLabel} htmlFor="birthdate">
              Birthdate:
            </label>
            <div className={`${styles.control} ${styles.dateWrap}`}>
              <input
                id="birthdate"
                className={styles.formInput}
                type="date"
                defaultValue="2023-05-12"
              />
            </div>
          </div>

          <div className={`${styles.half} ${styles.halfRight}`}>
            <label className={styles.formLabel} htmlFor="gender">
              Gender:
            </label>
            <div className={`${styles.control} ${styles.selectWrap}`}>
              <select id="gender" className={styles.formSelect} defaultValue="Female">
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.commentWrap}>
          <label className={styles.commentLabel}>- Comment</label>
          <div className={styles.commentBox}>
            <div className={styles.commentLine}>&lt;Free multi-line Text&gt;</div>
            <div className={styles.commentLine}>&lt;Line 2&gt;</div>
            <div className={styles.commentLine}>&lt;Line 3&gt;</div>
            <div className={styles.commentLine}>&lt;Line 4&gt;</div>
          </div>
        </div>
      </div>

      <div className={styles.actionRow}>
        <button type="button" className={styles.saveButton}>
          Save
        </button>
      </div>
    </div>
  );
}