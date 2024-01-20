import { getStarIcons } from "../../shared/helpers";
import { LevelStarCount } from "../../shared/types";

export function LevelStars({ stars }: { stars: LevelStarCount }) {
    return <div style={{ color: "orangered", transform: "translateY(-12px)" }}>{getStarIcons(stars)}</div>;
}
