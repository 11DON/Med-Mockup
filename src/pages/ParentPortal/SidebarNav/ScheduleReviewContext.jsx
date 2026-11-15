import { createContext, useContext, useState } from "react";


const ScheduleReviewContext = createContext(null);

export function ScheduleReviewProvider({ children }) {
  const [review, setReview] = useState({ status: "pending", reason: "" });

  const approve = () => setReview({ status: "approved", reason: "" });
  const reject = (reason) => setReview({ status: "rejected", reason });

  return (
    <ScheduleReviewContext.Provider value={{ review, approve, reject }}>
      {children}
    </ScheduleReviewContext.Provider>
  );
}

export function useScheduleReview() {
  const ctx = useContext(ScheduleReviewContext);
  if (!ctx) throw new Error("useScheduleReview must be used inside <ScheduleReviewProvider>");
  return ctx;
}