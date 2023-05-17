import styles from "./dropdown.module.css"

export default function Dropdown({ selected, changeSelected, options }) {

    const {
        dropdown
    } = styles;
    const renderOptions = options.map(opt => (
        <option key={opt}>{opt}</option>
    ))

    return (
        <div className={dropdown}>
            <select value={options[selected]} onChange={(e) => {
                let val = (options[selected].constructor)(e.target.value);
                changeSelected(options.indexOf(val))
            }}>
                {renderOptions}
            </select>
        </div>
    )
}

Dropdown.defaultProps = {
    options: ["A", "B", "C"],
    selected: 0,
    changeSelected: () => { }
}