import myStyles from "./styles.module.css"
export default function Wrapper({ children, styles }) {
    return (
        <div className={`${myStyles.wrapper} ${styles}`}>{children}</div>
    )
}