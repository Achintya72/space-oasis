import styles from "./button.module.css";

function Button(props) {
    const {
        background,
        children,
        corners,
        onClick,
        hasIcon
    } = props;
    return (
        <button
            onClick={onClick}
            className={`${styles.button} ${hasIcon ? styles.thin : styles.fat} ${styles[corners]} ${styles[background]}`}
        >
            {children}
        </button>
    )
}

Button.defaultProps = {
    background: "dark",
    children: "Click Me!",
    corners: "sharp",
    hasIcon: false,
    onClick: () => { }
}
export default Button;