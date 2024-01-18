import { getStarIcons } from "../../utils/helpers";
import { LevelStarCount } from "../../utils/types";

export function LevelStars({ stars }: { stars: LevelStarCount }) {
    return <div style={{ color: "orangered", transform: "translateY(-12px)" }}>{getStarIcons(stars)}</div>;
}
