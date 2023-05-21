import { useContext } from "react";
import { UserContext } from "../api/_userContext";
import data from "../packages/content.json";
import { Button } from "../../components";
import styles from "./styles.module.css";

const mars_flights = [
  {
    name: "HBD",
    spots: 2,
    start: new Date(2023, 6, 2),
    end: new Date(2024, 6, 2),
  },
  {
    name: "XQY",
    spots: 10,
    start: new Date(2023, 8, 15),
    end: new Date(2024, 8, 15),
  },
  {
    name: "JZL",
    spots: 5,
    start: new Date(2023, 9, 1),
    end: new Date(2024, 9, 1),
  },
  {
    name: "FPK",
    spots: 3,
    start: new Date(2023, 10, 12),
    end: new Date(2024, 10, 12),
  },
  {
    name: "MWD",
    spots: 8,
    start: new Date(2023, 11, 5),
    end: new Date(2024, 11, 5),
  },
  {
    name: "GVB",
    spots: 12,
    start: new Date(2024, 0, 20),
    end: new Date(2025, 0, 20),
  },
  {
    name: "RKT",
    spots: 2,
    start: new Date(2024, 1, 26),
    end: new Date(2025, 1, 26),
  },
];

const moon_flights = [
  {
    name: "QWE",
    spots: 7,
    start: new Date(2023, 6, 7),
    end: new Date(2023, 6, 12),
  },
  {
    name: "TYU",
    spots: 9,
    start: new Date(2023, 6, 13),
    end: new Date(2023, 6, 18),
  },
  {
    name: "ASD",
    spots: 4,
    start: new Date(2023, 6, 19),
    end: new Date(2023, 6, 24),
  },
  {
    name: "FGH",
    spots: 6,
    start: new Date(2023, 6, 25),
    end: new Date(2023, 6, 30),
  },
  {
    name: "ZXC",
    spots: 11,
    start: new Date(2023, 6, 31),
    end: new Date(2023, 7, 5),
  },
];

const earth_flights = [
  {
    name: "HJT",
    spots: 9,
    start: new Date(2023, 8, 5),
    end: new Date(2023, 8, 10),
  },
  {
    name: "LKP",
    spots: 2,
    start: new Date(2023, 8, 11),
    end: new Date(2023, 8, 16),
  },
  {
    name: "DMN",
    spots: 7,
    start: new Date(2023, 8, 17),
    end: new Date(2023, 8, 22),
  },
  {
    name: "GYX",
    spots: 4,
    start: new Date(2023, 8, 23),
    end: new Date(2023, 8, 28),
  },
  {
    name: "QOB",
    spots: 11,
    start: new Date(2023, 8, 29),
    end: new Date(2023, 9, 4),
  },
  {
    name: "NZV",
    spots: 6,
    start: new Date(2023, 9, 5),
    end: new Date(2023, 9, 10),
  },
  {
    name: "FUI",
    spots: 8,
    start: new Date(2023, 9, 11),
    end: new Date(2023, 9, 16),
  },
];

export default function FlightOptions({ flightChosen, changeFlightChosen }) {
  const { currentOrder } = useContext(UserContext);
  const orderType = currentOrder?.type ?? "Lunar Exploration";
  const flightCost = data["packages"].filter(
    (obj) => obj.title === orderType
  )[0].price;
  let flights = [];
  if (orderType == "Lunar Exploration" || orderType == "Moon Orbit") {
    flights = moon_flights;
  } else if (orderType == "Mars Adventure" || orderType == "Mars Orbit") {
    flights = mars_flights;
  } else {
    flights = earth_flights;
  }

  const renderFlights = flights.map((flight, i) => (
    <div key={flight.name} className={styles.flightCard}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h4>Flight {flight.name}</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <h3>${flightCost.toLocaleString()}</h3>
          <p className={styles.urgent}>
            <strong>{flight.spots} Seats Left</strong>
          </p>
        </div>
      </div>
      <p>
        <strong>Dates: </strong>
        {flight.start.toLocaleString().split(",")[0]} -{" "}
        {flight.end.toLocaleString().split(",")[0]}
      </p>
      <p style={{ marginBottom: "10px" }}>
        <strong>Duration: </strong>
        {(flight.end.valueOf() - flight.start.valueOf()) / 86400000} days
      </p>
      <Button
        background={flightChosen == i ? "solid" : "light"}
        onClick={() =>
          changeFlightChosen((prev) => {
            if (prev > -1 && prev == i) prev = -1;
            else prev = i;
            return prev;
          })
        }
      >
        {flightChosen == i ? "Selected" : "Select This Flight"}
      </Button>
    </div>
  ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h3>Flight Options</h3>
      {renderFlights}
    </div>
  );
}
