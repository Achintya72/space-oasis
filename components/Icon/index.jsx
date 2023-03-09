import MenuIcon from "./MenuIcon";
import CloseIcon from "./CloseIcon";
import LeftArrowIcon from "./LeftArrowIcon";
import RightArrowIcon from "./RightArrowIcon";
import MoneyIcon from "./MoneyIcon";
import TimeIcon from "./TimeIcon";

function Icon({ name, size }) {
    const icons = {
        menu: <MenuIcon size={size} />,
        close: <CloseIcon size={size} />,
        left: <LeftArrowIcon size={size} />,
        right: <RightArrowIcon size={size} />,
        money: <MoneyIcon size={size} />,
        time: <TimeIcon size={size} />
    }
    return icons[name];
}

export default Icon;
export {
    MenuIcon
}