import styles from "./styles.module.css";
import { Dropdown } from "../../components";
import { useState } from "react";

export default function Payment() {
  const [month, updateMonth] = useState(0);
  const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [year, updateYear] = useState(0);
  const yearOptions = [23, 24, 25, 26, 27, 28, 29, 31, 30, 32, 33];
  const [details, setDetails] = useState({
    name: "Elon Musk",
    street: "308 Negra Arroyo Lane",
    apt: "N/A",
    city: "Albuquerque",
    state: "New Mexico",
    country: "United States",
    zip: "87104",
    card: "0000 0000 0000 0000",
    nameOnCard: "Elon Musk",
  });

  const handleChange = ({ target: { name, value } }) => {
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.passengerInfo}>
      <h3>Billing Information</h3>
      <p className="caption">FULL NAME</p>
      <input
        name="name"
        className={styles.input}
        onChange={handleChange}
        value={details.name}
      />
      <p className="caption">ADDRESS</p>
      <input
        name="street"
        className={styles.input}
        onChange={handleChange}
        value={details.street}
      />
      <input
        apt="apt"
        className={styles.input}
        onChange={handleChange}
        value={details.apt}
      />
      <div className={styles.inputGroup}>
        <input
          name="city"
          className={styles.input}
          onChange={handleChange}
          value={details.city}
        />
        <input
          name="state"
          className={styles.input}
          onChange={handleChange}
          value={details.state}
        />
        <input
          onChange={handleChange}
          name="country"
          className={styles.input}
          value={details.country}
        />
        <input
          onChange={handleChange}
          name="zip"
          className={styles.input}
          value={details.zip}
        />
      </div>
      <h3>Credit Card Information</h3>
      <div className={styles.inputGroup}>
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <p className="caption">CARD NUMBER</p>
          <input
            className={styles.input}
            onChange={handleChange}
            name="card"
            value={details.card}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <p className="caption">MONTH</p>
          <Dropdown
            selected={month}
            options={monthOptions}
            changeSelected={updateMonth}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <p className="caption">YEAR</p>
          <Dropdown
            selected={year}
            options={yearOptions}
            changeSelected={updateYear}
          />
        </div>
      </div>
      <p className="caption">NAME ON CARD</p>
      <input
        name="country"
        onChange={handleChange}
        className={styles.input}
        value={details.nameOnCard}
      />
    </div>
  );
}
