import { useState } from "react";
import styles from "./FillScaleRequest.module.css";

const ANSWER_OPTIONS = [
  "Not true at all",
  "Just a little true",
  "Pretty much true",
  "Very much true",
];

const SECTIONS = [
  {
    title: "A. Inattention & Executive Functioning",
    questions: [
      { number: 1, text: "Difficulty sustaining attention during play or homework tasks." },
      { number: 2, text: "Easily distracted by external noises or unrelated thoughts." },
      { number: 3, text: "Fails to finish tasks, chores, or schoolwork once started." },
      { number: 4, text: "Avoids or dislikes activities that require sustained mental effort." },
    ],
  },
  {
    title: "B. Hyperactivity & Impulsivity",
    questions: [
      { number: 7, text: 'Restless in the "squirmy" sense; fidgets with hands or feet.' },
      { number: 8, text: "Leaves seat in situations where remaining seated is expected." },
      { number: 9, text: "Runs about or climbs excessively in inappropriate situations." },
      { number: 10, text: 'Acts as if "driven by a motor" or is always "on the go."' },
    ],
  },
  {
    title: "C. Defiance & Aggression (Oppositional)",
    questions: [
      { number: 13, text: "Actively defies or refuses to comply with adult requests or rules." },
      { number: 14, text: "Loses temper easily or experiences frequent emotional outbursts." },
      { number: 15, text: "Argues with adults or authority figures." },
      { number: 16, text: "Deliberately annoys other people." },
    ],
  },
];

export default function FillScaleRequest() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateAnswer = (number, value) => {
    setAnswers((current) => ({ ...current, [number]: value }));
    setSubmitted(false);
  };

  const submitRequest = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className={styles.page} onSubmit={submitRequest}>
      <fieldset className={styles.panel}>
        <legend>Fill Scale Request</legend>
        <div className={styles.scroller}>
          {SECTIONS.map((section) => (
            <section className={styles.section} key={section.title}>
              <h2>{section.title}</h2>
              {section.questions.map((question) => (
                <div className={styles.question} key={question.number}>
                  <span className={styles.prompt}>
                    {question.number}. {question.text}
                  </span>
                  {ANSWER_OPTIONS.map((option, index) => {
                    const inputId = `question-${question.number}-answer-${index}`;
                    return (
                      <label className={styles.answer} htmlFor={inputId} key={option}>
                        <input
                          id={inputId}
                          type="radio"
                          name={`question-${question.number}`}
                          value={option}
                          checked={answers[question.number] === option}
                          onChange={() => updateAnswer(question.number, option)}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              ))}
              <div className={styles.ellipsis} aria-hidden="true">⋮</div>
            </section>
          ))}
        </div>
      </fieldset>
      <div className={styles.actions}>
        {submitted && <span className={styles.confirmation} role="status">Responses submitted.</span>}
        <button className={styles.send} type="submit">Send</button>
      </div>
    </form>
  );
}
