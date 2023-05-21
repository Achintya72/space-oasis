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

export default function Checkout() {
  const router = useRouter();
  const { auth, currentOrder, changeCurrentOrder } = useContext(UserContext);
  const [count, changeCount] = useState(currentOrder?.count ?? 1);
  const [stage, setStage] = useState(0);
  const [costs, changeCosts] = useState({
    tickets: {
      name: currentOrder?.type + " Tickets" ?? "Tickets",
      cost: content[currentOrder?.type ?? "Lunar Exploration"].cost ?? 2000,
      quantity: count,
    },
    activities: [],
  });
  const [passenger_options, changePassOps] = useState([]);

  let activities = [];
  const data = content[currentOrder?.type ?? "Lunar Exploration"];
  data.activities.forEach((type) => {
    activities = [...activities, ...content.activities[type]];
  });

  const createPassengers = () => {
    let p_ops = [];

    for (let i = 0; i < count; i++) {
      let n_op = "Passenger " + (i + 1);
      p_ops.push(n_op);
    }
    changePassOps(p_ops);
  };

  const options = ["Veg.", "Hal.", "Kos.", "Reg."];

  useEffect(() => {
    createPassengers();
    changeCurrentOrder((prev) => ({ ...prev, count }));

    let c = costs;
    c["tickets"].quantity = count;
    changeCosts(c);
  }, [changeCurrentOrder, count]);
  useEffect(() => {
    if (auth == false) {
      router.push("/checkout/signin");
    }
    if (currentOrder == null) {
      router.push("/packages");
    }
  }, [auth, currentOrder, router]);

  return (
    <Wrapper>
      <Navbar />
      <h1>Checkout</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <div style={{ padding: "5px" }}>
            <h2>Passenger Info</h2>
            <div className={styles.passengerInfo}>
              <p className="caption">PEOPLE</p>
              <Counter count={count} updateCount={changeCount} />
              {count > 0
                ? passenger_options.map((val, index) => (
                    <div key={index}>
                      <h4>{val}</h4>
                      <div className={styles.formLabelPair}>
                        <div className={getClasses(styles.label, "caption")}>
                          BIRTHDAY
                        </div>
                        <DatePicker
                          setDate={(d) => d}
                          startDate={new Date(1950, 6, 5)}
                          endDate={new Date(2005, 6, 1)}
                        />
                      </div>
                      <div className={styles.formLabelPair}>
                        <div className={getClasses(styles.label, "caption")}>
                          FULL NAME
                        </div>
                        <input
                          className={styles.input}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  ))
                : "Please have at least one person"}
            </div>
          </div>
          <h2>Activities</h2>
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
        </div>
        <StageAndCost stage={stage} setStage={setStage} costs={costs} />
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

const StageAndCost = ({ costs, stage, setStage }) => {
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
          <div className={styles.expense}>
            <h3>Subtotal:</h3>
            <h3>${totalCost.toLocaleString()}</h3>
          </div>
          <div
            style={{ display: "flex", justifySelf: "flex-end", gap: "10px" }}
          >
            {stage > 0 && (
              <Button onClick={() => setStage((prev) => prev - 1)}>Back</Button>
            )}
            {stage < 2 && (
              <Button
                onClick={() => setStage((prev) => prev + 1)}
                background="solid"
              >
                Next
              </Button>
            )}
          </div>
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
        onClick={() => changeStage(number)}
      >
        {number + 1}
      </div>
      <p>
        <strong>{name}</strong>
      </p>
    </div>
  );
};
