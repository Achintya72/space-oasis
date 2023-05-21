import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Counter,
  Navbar,
  Wrapper,
  Dropdown,
  DatePicker,
} from "../../components";
import { UserContext } from "../api/_userContext";
import { useRouter } from "next/router";
import getClasses from "../api/_getClasses";
import styles from "./styles.module.css";
import content from "./content.json";
import Image from "next/image";
import FlightOptions from "./_flightOptions";
import Payment from "./_payment";

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

const defaultPassenger = {
  name: "Elon Musk",
  birth: new Date(1954, 5, 28),
};

const generateListOfPassengers = (count) => {
  let list = [];
  for (let i = 0; i < count; i++) {
    list.push({ ...defaultPassenger });
  }
  return list;
};

export default function Checkout() {
  const router = useRouter();
  const { auth, currentOrder, changeCurrentOrder, changeUser } =
    useContext(UserContext);
  const [count, changeCount] = useState(currentOrder?.count ?? 0);
  const [stage, setStage] = useState(0);
  const [flightChosen, changeFlightChosen] = useState(-1);
  const [meal, changeMeal] = useState("Veg.");
  const [costs, changeCosts] = useState({
    tickets: {
      name: currentOrder?.type + " Tickets" ?? "Tickets",
      cost: content[currentOrder?.type ?? "Lunar Exploration"].cost ?? 2000,
      quantity: count,
    },
    activities: [],
    rewards: null,
  });
  const [passenger_options, changePassOps] = useState(
    generateListOfPassengers(count)
  );
  let activities = [];
  const data = content[currentOrder?.type ?? "Lunar Exploration"];
  data.activities.forEach((type) => {
    activities = [...activities, ...content.activities[type]];
  });

  const handleMealChange = (val) => {
    changeMeal((prev) => {
      return options[val];
    });
  };

  const submit = () => {
    changeUser((prev) => {
      const orderType = currentOrder?.type ?? "Lunar Exploration";
      let flight;
      if (orderType == "Lunar Exploration" || orderType == "Moon Orbit") {
        flight = moon_flights[flightChosen];
      } else if (orderType == "Mars Adventure" || orderType == "Mars Orbit") {
        flight = mars_flights[flightChosen];
      } else {
        flight = earth_flights[flightChosen];
      }
      let totalCost = 0;
      costs.activities.forEach((cost) => {
        totalCost += cost.quantity * cost.cost;
      });
      totalCost += costs.tickets.cost * costs.tickets.quantity;
      const getImage = (t) => {
        const images = {
          "Lunar Exploration": "Moon.jpg",
          "Mars Orbit": "MarsOrbit.jpg",
          "Mars Adventure": "Mars.png",
          "Moon Orbit": "MoonOrbit.jpg",
          "Low Earth Orbit": "LowEarthOrbit.jpg",
        };
        return images[t];
      };
      prev.bookings.push({
        type: currentOrder?.type ?? "Lunar Exploration",
        departure: flight.start,
        arrival: flight.end,
        meal: meal,
        passengers: passenger_options.length,
        img: getImage(orderType),
        cost: totalCost,
      });
      if (costs.rewards != null) {
        prev.miles -= (costs.rewards * 1000000) / 100;
        prev.miles +=
          ((content[currentOrder?.type ?? "Lunar Exploration"].cost ?? 2000) /
            1500) *
          1000000;
        prev.miles = Math.round(prev.miles);
      }
      return prev;
    });
    router.push("/dashboard");
  };
  const getCanAdvance = () => {
    if (stage == 0) {
      return [count > 0, "Please Add People To Move On"];
    } else if (stage == 1) {
      return [flightChosen > -1, "Please Select a Flight to Move On"];
    }
    return [true, ""];
  };

  const updateNumPassengers = (callBack) => {
    let newNum = callBack(count);
    if (newNum < count) {
      changePassOps((prev) => {
        return prev.slice(0, prev.length - 1);
      });
    } else {
      changePassOps((prev) => [
        ...prev,
        ...generateListOfPassengers(newNum - prev.length),
      ]);
    }
    changeCosts((prev) => {
      prev.tickets.quantity = newNum;
      changeCosts(prev);
    });
    changeCount(newNum);
  };

  const options = ["Veg.", "Hal.", "Kos.", "Reg."];
  useEffect(() => {
    if (auth == false) {
      router.push("/checkout/signin");
    }
    if (currentOrder == null) {
      router.push("/packages");
    }
  }, []);

  return (
    <Wrapper>
      <Navbar />
      <h1>Checkout</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          {stage == 0 && (
            <>
              <div style={{ padding: "5px" }}>
                <h3>Passenger Info</h3>
                <div className={styles.passengerInfo}>
                  <p className="caption">PEOPLE</p>
                  <Counter count={count} updateCount={updateNumPassengers} />
                  <p className="caption">MEAL</p>
                  <Dropdown
                    options={options}
                    selected={options.indexOf(meal)}
                    changeSelected={handleMealChange}
                  />
                  {count > 0
                    ? passenger_options.map((val, pIndex) => (
                        <div key={pIndex}>
                          <h4>Passenger {pIndex + 1} </h4>
                          <div className={styles.formLabelPair}>
                            <div
                              className={getClasses(styles.label, "caption")}
                            >
                              DATE OF BIRTH
                            </div>
                            <DatePicker
                              value={val.birth}
                              setDate={(d) => {
                                changePassOps((prev) => {
                                  console.log(d);
                                  prev[pIndex].birth = d;
                                  return [...prev];
                                });
                              }}
                              startDate={new Date(1950, 6, 5)}
                              endDate={new Date(2005, 6, 1)}
                            />
                          </div>
                          <div className={styles.formLabelPair}>
                            <div
                              className={getClasses(styles.label, "caption")}
                            >
                              FULL NAME
                            </div>
                            <input
                              className={styles.input}
                              placeholder="John Doe"
                              value={val.name}
                              onChange={(e) => {
                                changePassOps((prev) => {
                                  prev[pIndex].name = e.target.value;
                                  return [...prev];
                                });
                              }}
                            />
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
              <h3>Activities</h3>
              <div className={styles.activityCardGrid}>
                {activities.map((act) => (
                  <ActivityCard
                    key={act.title}
                    limit={count}
                    act={act}
                    costs={costs}
                    changeCosts={changeCosts}
                  />
                ))}
              </div>
            </>
          )}
          {stage == 1 && (
            <FlightOptions
              flightChosen={flightChosen}
              changeFlightChosen={changeFlightChosen}
            />
          )}
          {stage == 2 && <Payment />}
        </div>
        <StageAndCost
          stage={stage}
          setStage={setStage}
          costs={costs}
          canAdvance={getCanAdvance()}
          changeCosts={changeCosts}
          submit={submit}
        />
      </div>
    </Wrapper>
  );
}

const ActivityCard = ({ limit, act, costs, changeCosts }) => {
  const [quantity, changeQuantity] = useState(0);

  let index = -1;

  costs.activities.forEach((value, i) => {
    if (value.name == act.title) {
      index = i;
    }
  });

  useEffect(() => {
    let all = costs;
    let c = costs.activities;

    if (quantity == 0 && index != -1) {
      c = c.filter((value) => {
        return value.name != act.title;
      });
    } else if (quantity != 0 && index == -1) {
      c.push({
        name: act.title,
        cost: act.cost,
        quantity: quantity,
      });
    } else if (quantity != 0 && index != -1) {
      c[index].quantity = quantity;
    }

    all.activities = c;
    changeCosts({ ...all });
  }, [quantity]);

  if (act != null) {
    return (
      <div className={styles.activityCard}>
        <Image src={act.img} alt={act.alt} fill />
        <div className={styles.activityCardText}>
          <h4>{act.title}</h4>
          <p>${act.cost.toLocaleString()}</p>
          <Counter
            limit={limit}
            count={quantity}
            updateCount={changeQuantity}
          />
        </div>
      </div>
    );
  }
};

const StageAndCost = ({
  changeCosts,
  costs,
  stage,
  setStage,
  canAdvance,
  submit,
}) => {
  const { user, changeUser } = useContext(UserContext);
  let totalCost = 0;
  const renderTickets = () => {
    let p = costs.tickets;
    totalCost += p.cost * p.quantity;
    return (
      <div key={p.name} className={styles.expense}>
        <p>
          {p.name} ({p.quantity}x)
        </p>
        <p>${(p.cost * p.quantity).toLocaleString()}</p>
      </div>
    );
  };
  const renderActivities = costs.activities.map((p) => {
    totalCost += p.cost * p.quantity;
    return (
      <div key={p.name} className={styles.expense}>
        <p>
          {p.name} ({p.quantity}x)
        </p>
        <p>${(p.cost * p.quantity).toLocaleString()}</p>
      </div>
    );
  });
  const handleSubmit = (e) => {
    let response = window.confirm(
      "Are you sure you want to purchase this package?"
    );
    if (response) {
      submit();
    }
  };

  totalCost = costs.rewards ? totalCost - costs.rewards : totalCost;
  return (
    <div className={styles.sideSection}>
      <div className={styles.control}>
        <StatusIndicator
          name="Enter Details"
          number={0}
          state={stage >= 0}
          changeStage={setStage}
        />
        <StatusIndicator
          name="Pick a Flight"
          number={1}
          state={stage >= 1}
          changeStage={setStage}
        />
        <StatusIndicator
          name="Payment"
          number={2}
          state={stage >= 2}
          changeStage={setStage}
        />
      </div>
      <div>
        <h3>Total Cost:</h3>
        <div className={styles.breakdown}>
          <p>
            <strong>Tickets</strong>
          </p>
          {renderTickets()}
          <p>
            <strong>Activities</strong>
          </p>
          {renderActivities}
          {costs.rewards != null && (
            <div className={styles.expense}>
              <p className={styles.urgent}>Rewards</p>
              <p className={styles.urgent}>
                -${costs.rewards.toLocaleString()}
              </p>
            </div>
          )}
          <div className={styles.expense}>
            <h3>Subtotal:</h3>
            <h3>${totalCost.toLocaleString()}</h3>
          </div>
          {stage == 2 && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                className={styles.checkbox}
                checked={costs.rewards != null}
                name="rewards"
                id="rewards"
                type="checkbox"
                onChange={(e) => {
                  changeCosts((prev) => {
                    if (e.target.checked) {
                      prev.rewards = Math.min(
                        (user.miles * 100) / 1000000,
                        totalCost
                      );
                    } else {
                      prev.rewards = null;
                    }
                    return { ...prev };
                  });
                }}
              />
              <label for="rewards">
                Use Rewards Points ($
                {((user.miles * 100) / 1000000).toLocaleString()})
              </label>
            </div>
          )}
          <div
            style={{ display: "flex", justifySelf: "flex-end", gap: "10px" }}
          >
            {stage > 0 && (
              <Button onClick={() => setStage((prev) => prev - 1)}>Back</Button>
            )}
            {stage < 2 && canAdvance[0] && (
              <Button
                onClick={() => setStage((prev) => prev + 1)}
                background="solid"
              >
                Next
              </Button>
            )}
            {stage == 2 && (
              <Button background="solid" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
          <p className="error">{!canAdvance[0] && canAdvance[1]}</p>
        </div>
      </div>
    </div>
  );
};

const StatusIndicator = ({ number, name, state, changeStage }) => {
  return (
    <div className={styles.indicator}>
      <div
        className={getClasses(
          styles.button,
          state ? styles.active : styles.inactive
        )}
      >
        {number + 1}
      </div>
      <p>
        <strong>{name}</strong>
      </p>
    </div>
  );
};
