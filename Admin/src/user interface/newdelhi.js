import React from "react";
import Navbar from "./navbar";
import styles from "./destination.module.css";
function newdelhi() {
  return (
    <div>
      <Navbar />
      <div className={styles.main_div}></div>
    </div>
  );
}

export default newdelhi;
