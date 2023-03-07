import styles from "./button.module.css";

function Button(props) {
    const {
        size,
        children
    } = props;
    return (
        <button className={`${styles.button} ${styles[size]}`}>{children}</button>
    )
}

Button.defaultProps = {
    size: "regular"
}
export default Button;