import styles from "./MessageCenter.module.css";

export default function MessageCenter() {
  return (
    <section className={styles.messageCenter}>
      <div className={styles.messageDetails}>
        <p><span>Title:</span> Payment Inquiry</p>
        <p><span>Category:</span> Administration</p>
      </div>

      <div className={styles.conversation}>
        <article className={`${styles.message} ${styles.fromParent}`}>
          <div className={styles.messageMeta}>
            <span>Me</span>
            <time dateTime="2026-11-17T20:00">17/11/2026 08:00PM</time>
          </div>
          <div className={styles.bubble}>&lt;My Message&gt;</div>
        </article>

        <article className={`${styles.message} ${styles.fromClinic}`}>
          <div className={styles.messageMeta}>
            <span>Clinic (Amro)</span>
            <time dateTime="2026-11-18T10:00">18/11/2026 10:00AM</time>
          </div>
          <div className={styles.bubble}>&lt;Clinic Reply&gt;</div>
        </article>

        <div className={styles.reply}>
          <label htmlFor="parent-reply">Me</label>
          <textarea
            id="parent-reply"
            placeholder="<Reply Message>"
            aria-label="Reply message"
          />
          <button type="button">Send</button>
        </div>
      </div>
    </section>
  );
}
