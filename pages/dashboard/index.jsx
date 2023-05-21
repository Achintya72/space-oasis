import { Navbar, Wrapper } from "../../components";
import styles from "./dashboardStyles.module.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../api/_userContext";
import Details from "./_details";
import Mileage from "./_mileage";
import Booking from "./_booking";
import DateModal from "./_dateModal";
import { useRouter } from "next/router";
export default function Dashboard() {
  const router = useRouter();
  const { user, changeUser, auth } = useContext(UserContext);
  const setLessonDate = (date, index) => {
    changeUser((prev) => {
      prev.training.lessons[index].date = date;
      return { ...prev };
    });
  };
  const getStartDate = (i) => {
    if (i != 0) {
      if (user.training.lessons[i - 1].date)
        return user.training.lessons[i - 1].date;
      return getStartDate(i - 1);
    }
    return new Date();
  };

  const getEndDate = (i) => {
    if (i != user.training.lessons.length - 1) {
      if (user.training.lessons[i + 1].date)
        return user.training.lessons[i + 1].date;
      return getEndDate(i + 1);
    }
    return user.bookings[0].departure;
  };
  useEffect(() => {
    if (auth != true) {
      router.push("/signin");
    }
  }, []);
  return (
    <div className={styles.root}>
      <Wrapper styles={styles.container}>
        <Navbar />
        <div className={styles.userDashboard}>
          <div className={styles.leftCol}>
            <div className={styles.details}>
              <Details />
              <Mileage />
            </div>
            <div className={styles.training}>
              <h4>Training Sessions</h4>
              {user.bookings.length > 0 ? (
                <>
                  <div className={styles.progressBg}>
                    <div
                      className={styles.progress}
                      style={{
                        flex:
                          (100 * user.training.current) /
                          user.training.lessons.length,
                      }}
                    />
                    <div
                      className={styles.antiProgress}
                      style={{
                        flex:
                          100 -
                          (100 * user.training.current) /
                            user.training.lessons.length,
                      }}
                    />
                  </div>
                  <div className={styles.lessonOutline}>
                    <p>
                      <strong>Lesson Outline</strong>
                    </p>
                    <ul>
                      {user.training.lessons[
                        user.training.current
                      ].lesson_outline.map((option) => (
                        <li key={option}>{option}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.sessions}>
                    <p>
                      <strong>Upcoming Sessions</strong>
                    </p>
                    {user.training.lessons
                      .filter((lesson, i) => i >= user.training.current)
                      .map((lesson, i) => (
                        <div className={styles.session} key={lesson.name}>
                          <p>{lesson.name}</p>
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <p>
                              {lesson.date
                                ? lesson.date.toLocaleString().split(",")[0]
                                : "-----"}
                            </p>
                            <DateModal
                              setDate={(d) => setLessonDate(d, i)}
                              startDate={getStartDate(i)}
                              endDate={getEndDate(i)}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <p>No sessions purchased</p>
              )}
            </div>
          </div>
          <div className={styles.bookings}>
            <h4>Current Bookings</h4>
            {user.bookings.map((booking, i) => (
              <Booking
                booking={booking}
                key={booking.departure.toLocaleString()}
                i={i}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
