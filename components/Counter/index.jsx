import styles from "./counter.module.css";

function Counter(props) {
    const { count, updateCount, limit } = props;
    const LIMIT = limit;
    const increment = () => {
        updateCount(prev => prev + 1 > LIMIT ? 0 : prev + 1);
    }

    const decrement = () => {
        updateCount(prev => prev - 1 < 0 ? LIMIT : prev - 1);
    }
    const {
        counter
    } = styles;
    return (
        <div className={counter}>
            <p onClick={decrement}>-</p>
            <p>{count}</p>
            <p onClick={increment}>+</p>
        </div>
    )
}

Counter.defaultProps = {
    count: 0,
    updateCount: () => { },
    limit: 10
}

export default Counter;