import { useContext, useEffect, useState } from "react"
import { Button, Counter, Navbar, Wrapper, Dropdown, DatePicker } from "../../components"
import { UserContext } from "../api/_userContext"
import { useRouter } from "next/router";
import getClasses from "../api/_getClasses";
import styles from "./styles.module.css";

const mars_flights = [
    {
        name: "HBD",
        spots: 2,
        start: new Date(2023, 6, 2),
        end: new Date(2024, 6, 2)
    },
    {
        name: "XQY",
        spots: 10,
        start: new Date(2023, 8, 15),
        end: new Date(2024, 8, 15)
    },
    {
        name: "JZL",
        spots: 5,
        start: new Date(2023, 9, 1),
        end: new Date(2024, 9, 1)
    },
    {
        name: "FPK",
        spots: 3,
        start: new Date(2023, 10, 12),
        end: new Date(2024, 10, 12)
    },
    {
        name: "MWD",
        spots: 8,
        start: new Date(2023, 11, 5),
        end: new Date(2024, 11, 5)
    },
    {
        name: "GVB",
        spots: 12,
        start: new Date(2024, 0, 20),
        end: new Date(2025, 0, 20)
    },
    {
        name: "RKT",
        spots: 2,
        start: new Date(2024, 1, 26),
        end: new Date(2025, 1, 26)
    }
]

const moon_flights = [
    {
        name: "QWE",
        spots: 7,
        start: new Date(2023, 6, 7),
        end: new Date(2023, 6, 12)
    },
    {
        name: "TYU",
        spots: 9,
        start: new Date(2023, 6, 13),
        end: new Date(2023, 6, 18)
    },
    {
        name: "ASD",
        spots: 4,
        start: new Date(2023, 6, 19),
        end: new Date(2023, 6, 24)
    },
    {
        name: "FGH",
        spots: 6,
        start: new Date(2023, 6, 25),
        end: new Date(2023, 6, 30)
    },
    {
        name: "ZXC",
        spots: 11,
        start: new Date(2023, 6, 31),
        end: new Date(2023, 7, 5)
    }
];


export default function Checkout() {
    const router = useRouter();
    const { auth, currentOrder, changeCurrentOrder } = useContext(UserContext);
    const [count, changeCount] = useState(currentOrder?.count ?? 1);
    const [stage, setStage] = useState(0);
    const [costs, changeCosts] = useState({
        activities: [
            {
                name: "ATV Ride",
                cost: 300,
                quantity: 3
            },
        ]
    })
    const [currentPassenger, changeCurrentPassenger] = useState(0);
    const [passengers, changePassengers] = useState([]);
    const [passenger_options, changePassOps] = useState([]);

    const createPassengers = () => {
        let p = [];
        let p_ops = [];

        for (let i = 0; i < count; i++) {
            let n = {
                birthday: new Date(),
                name: "",
                email: "",
                phone: "",
                meal_type: ""
            }
            let n_op = "Passenger " + (i + 1);
            p.push(n);
            p_ops.push(n_op);
        }
        changePassOps(p_ops)
        changePassengers(p);
        changeCurrentPassenger(0);
    }

    const options = ["Veg.", "Hal.", "Kos.", "Reg."];

    useEffect(() => {
        createPassengers();
    }, [count])
    useEffect(() => {
        changeCurrentOrder(prev => ({ ...prev, count }))
    }, [changeCurrentOrder, count])
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
            <div className={styles.container}>
                <div className={styles.left}>
                    <h1>Checkout</h1>
                    <p className="caption">PEOPLE</p>
                    <Counter
                        count={count}
                        updateCount={changeCount}
                    />
                    {count > 0 ? (
                        <div style={{ padding: "5px" }}>
                            <div className={styles.spaceBetween}>
                                <h3>Passenger Info</h3>
                                <Dropdown selected={"Passenger" + (currentPassenger + 1)} changeSelected={changeCurrentPassenger} options={passenger_options} />
                            </div>
                            <div className={styles.passengerInfo}>
                                <div className={styles.formLabelPair}>
                                    <div className={styles.label}>Birthday</div>
                                    <DatePicker setDate={(d) => console.log(d)} startDate={new Date(1950, 6, 5)} endDate={new Date()} />
                                </div>
                                <div className={styles.formLabelPair}>
                                    <div className={styles.label}>Full Name</div>
                                    <input className={styles.input} placeholder="John Doe" />
                                </div>
                                <div className={styles.formLabelPair}>
                                    <div className={styles.label}>Email</div>
                                    <input className={styles.input} placeholder="JohnDoe@gmail.com" />
                                </div>
                                <div className={styles.formLabelPair}>
                                    <div className={styles.label}>Phone Number</div>
                                    <input className={styles.input} placeholder="123-456-7890" />
                                </div>
                                <div className={styles.spaceBetween}>
                                    <div className={styles.formLabelPair}>
                                        <div className={styles.label}>Meal Type</div>
                                        <Dropdown selected={0} changeSelected={(d) => console.log(d)} options={options} />
                                    </div>
                                    <Button>Make Primary Contact</Button>
                                </div>
                                <button onClick={() => console.log(passengers)}>Click</button>
                            </div>
                        </div>) : "Please have at least one person"
                    }
                </div>
                <StageAndCost
                    stage={stage}
                    setStage={setStage}
                    costs={costs}
                />
            </div>
        </Wrapper>
    )
}

const StageAndCost = ({ costs, flight, stage, setStage }) => {
    let totalCost = 0;
    const renderActivities = costs.activities.map(p => {
        totalCost += p.cost * p.quantity;
        return (
            <div key={p.name} className={styles.expense}>
                <p>{p.name} ({p.quantity}x)</p>
                <p>${(p.cost * p.quantity).toLocaleString()}</p>
            </div>
        )
    })
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
                    <p><strong>Activities</strong></p>
                    {renderActivities}
                    <div className={styles.expense}>
                        <h3>Subtotal:</h3>
                        <h3>${totalCost.toLocaleString()}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StatusIndicator = ({ number, name, state, changeStage }) => {
    return (
        <div className={styles.indicator}>
            <div
                className={getClasses(styles.button, state ? styles.active : styles.inactive)}
                onClick={() => changeStage(number)}
            >
                {number + 1}
            </div>
            <p><strong>{name}</strong></p>
        </div>
    )
}