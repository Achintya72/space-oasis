import { useState } from "react";
import styles from "./styles.module.css";
import { Icon } from "../../../components";
import Image from "next/image";
import getClasses from "../../api/_getClasses";
import useGetVisibility from "../../api/_useGetVisibility";
import data from "./content.json";
import { motion } from "framer-motion";
export default function Journey({ packageName }) {
  const [currentStop, changeCurrentStop] = useState(0);
  const steps = data?.[packageName]?.["journey"] ?? undefined;
  return (
    <div className={styles.stepContainer}>
      {steps !== undefined && (
        <>
          <motion.div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentStop}
          >
            <Image
              src={steps[currentStop].img}
              alt={steps[currentStop].alt}
              fill
              placeholder="empty"
              priority={true}
            />
          </motion.div>
          <div className={styles.stepOverlay}>
            <h2>{steps[currentStop].title}</h2>
            <p>{steps[currentStop].description}</p>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {currentStop == 0 ? (
                <div style={{ width: "30px", height: "30px" }} />
              ) : (
                <Icon
                  name="leftButton"
                  size={30}
                  onClick={() => changeCurrentStop((prev) => prev - 1)}
                />
              )}
              {currentStop == steps.length - 1 ? (
                <div style={{ width: "30px", height: "30px" }} />
              ) : (
                <Icon
                  name="rightButton"
                  size={30}
                  onClick={() => changeCurrentStop((prev) => prev + 1)}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const Step = ({ step, stateStyle, index, changeCurrentStop }) => {
  return (
    <div className={styles.stepRoot} onClick={() => changeCurrentStop(index)}>
      <div className={styles.timeline}>
        <div className={styles.startLine} />
        <div className={styles.stepBullet} />
        <div className={styles.endLine} />
      </div>
      <div className={getClasses(stateStyle, styles.step)}>
        <h4>{step.title}</h4>
        <p>{step.description}</p>
      </div>
    </div>
  );
};
