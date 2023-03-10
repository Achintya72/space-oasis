import MenuIcon from "./MenuIcon";
import CloseIcon from "./CloseIcon";
import LeftArrowIcon from "./LeftArrowIcon";
import RightArrowIcon from "./RightArrowIcon";
import MoneyIcon from "./MoneyIcon";
import TimeIcon from "./TimeIcon";
import LocationIcon from "./LocationIcon";
import FoodIcon from "./FoodIcon";

function Icon({ name, size }) {
    const icons = {
        menu: <MenuIcon size={size} />,
        close: <CloseIcon size={size} />,
        left: <LeftArrowIcon size={size} />,
        right: <RightArrowIcon size={size} />,
        money: <MoneyIcon size={size} />,
        time: <TimeIcon size={size} />,
        location: <LocationIcon size={size} />,
        food: <FoodIcon size={size} />
    }
    return icons[name];
}

export default Icon;
export {
    MenuIcon
}