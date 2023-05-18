import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.css"
import { Button, Icon, Wrapper } from "../../../components";
import { useRouter } from "next/router";
export default function Vehicles({ vehicles }) {
    const [current, changeCurrent] = useState(0);
    const router = useRouter();
    const vehicle = vehicles?.[current] ?? null;
    const take = () => {
        router.push(`/vehicles/${vehicle.title}`)
    }
    return (
        <div className={styles.vehicleContainer}>
            {vehicle &&
                <>
                    <Image src={vehicle.img} alt={vehicle.alt} fill />
                    <div className={styles.vehicleOverlay}>
                        <Wrapper styles={styles.vehicleText}>
                            <div className={styles.vehicleName}>
                                <h2>{vehicle.company}</h2>
                                <h1>{vehicle.title}</h1>
                                <Button corners="rounded" onClick={take}>View Details</Button>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                {vehicle.safety.map(feature => (
                                    <div key={feature.title} className={styles.feature}>
                                        <Icon name={feature.icon} size={50} />
                                        <div>
                                            <p className="caption">{feature.title.toUpperCase()}</p>
                                            <p>{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.vehicleControls}>
                                {current == 0 ? <div style={{ width: "30px", height: "30px" }} /> :
                                    <Icon name="leftButton" size={30} onClick={() => changeCurrent(prev => prev - 1)} />
                                }
                                {current == (vehicles?.length ?? 1) - 1 ? <div style={{ width: "30px", height: "30px" }} /> :
                                    <Icon name="rightButton" size={30} onClick={() => changeCurrent(prev => prev + 1)} />
                                }
                            </div>
                        </Wrapper>
                    </div>
                </>
            }
        </div>
    )
}