import { getStarIcons } from "../../game/helpers";
import { LevelStarCount } from "../../game/types";

export function LevelStars({ stars }: { stars: LevelStarCount }) {
    return <div style={{ color: "orangered", transform: "translateY(-12px)" }}>{getStarIcons(stars)}</div>;
}
