export default function getClasses(...classes) {
    let classNames = "";
    classes.forEach(c => {
        classNames += c;
        classNames += " "
    })
    return classNames;
}