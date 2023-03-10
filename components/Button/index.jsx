import styles from "./button.module.css";

function Button(props) {
    const {
        size,
        children,
        onClick
    } = props;
    return (
        <button onClick={onClick} className={`${styles.button} ${styles[size]}`}>{children}</button>
    )
}

Button.defaultProps = {
    size: "regular"
}
export default Button;