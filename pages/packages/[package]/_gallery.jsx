import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { Icon } from "../../../components";
import { motion, AnimatePresence } from "framer-motion";
export default function Gallery({ images }) {
  const [current, changeCurrent] = useState(0);
  const [prevCurrent, changePrevCurrent] = useState(-1);
  return (
    <div className={styles.galleryImg}>
      {images && (
        <>
          <div className={styles.controls}>
            {current == 0 ? (
              <div style={{ width: "30px", height: "30px" }} />
            ) : (
              <Icon
                name="leftButton"
                size={30}
                onClick={() => {
                  changePrevCurrent(current);
                  changeCurrent((prev) => prev - 1);
                }}
              />
            )}
            {current == (images?.length ?? 1) - 1 ? (
              <div style={{ width: "30px", height: "30px" }} />
            ) : (
              <Icon
                name="rightButton"
                size={30}
                onClick={() => {
                  changePrevCurrent(current);

                  changeCurrent((prev) => prev + 1);
                }}
              />
            )}
          </div>
          <motion.div
            key={current}
            initial={{
              x: `${
                (100 * (current - prevCurrent)) /
                Math.abs(current - prevCurrent)
              }%`,
            }}
            animate={{ x: 0 }}
            exit={{
              x: `${
                (100 * (prevCurrent - current)) /
                Math.abs(current - prevCurrent)
              }%`,
            }}
            transition={{
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <Image src={images[current].src} alt={images[current.alt]} fill />
          </motion.div>
        </>
      )}
    </div>
  );
}
