import { getStarIcons } from "../../shared/helpers";
import { LevelStarCount } from "../../shared/types";

export function LevelStars({ stars }: { stars: LevelStarCount }) {
    return <div style={{ color: "#ff00e4", transform: "translateY(-14px)" }}>{getStarIcons(stars)}</div>;
}
