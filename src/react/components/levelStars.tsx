import { getStarIcons } from "../../game/helpers";
import { LevelStarCount } from "../../game/types";

export function LevelStars({ stars }: { stars: LevelStarCount }) {
    return <>{getStarIcons(stars)}</>;
}
