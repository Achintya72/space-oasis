import MenuIcon from "./MenuIcon";
import CloseIcon from "./CloseIcon";
import LeftArrowIcon from "./LeftArrowIcon";
import RightArrowIcon from "./RightArrowIcon";
import MoneyIcon from "./MoneyIcon";
import TimeIcon from "./TimeIcon";
import LocationIcon from "./LocationIcon";
import FoodIcon from "./FoodIcon";
import AstroTraining from "./AstroTraining";
import SportsIcon from "./SportsIcon";
import HikeIcon from "./Hike"
import LandingIcon from "./Landing"
import GiftIcon from "./Gift";
import AccomodationsIcon from "./Accomodations";
import AstronautIcon from "./Astronaut";
import ATVIcon from "./ATV";
import Entertainment from "./Entertainment";
import SurfIcon from "./Surf.jsx";
import Mementos from "./Mementos";
import Cave from "./Cave";
import Cryosleep from "./Cryosleep";
import Obstacle from "./Obstacle";

function Icon({ name, size }) {
    const icons = {
        menu: <MenuIcon size={size} />,
        close: <CloseIcon size={size} />,
        left: <LeftArrowIcon size={size} />,
        right: <RightArrowIcon size={size} />,
        money: <MoneyIcon size={size} />,
        time: <TimeIcon size={size} />,
        location: <LocationIcon size={size} />,
        food: <FoodIcon size={size} />,
        astroTraining: <AstroTraining size={size} />,
        sports: <SportsIcon size={size} />,
        hike: <HikeIcon size={size} />,
        landing: <LandingIcon size={size} />,
        gift: <GiftIcon size={size} />,
        accomodations: <AccomodationsIcon size={size} />,
        astronaut: <AstronautIcon size={size} />,
        atv: <ATVIcon size={size} />,
        entertainment: <Entertainment size={size} />,
        surf: <SurfIcon size={size} />,
        mementos: <Mementos size={size} />,
        cave: <Cave size={size} />,
        cryosleep: <Cryosleep size={size} />,
        obstacle: <Obstacle size={size} />
    }
    return icons[name];
}

export default Icon;
export {
    MenuIcon
}