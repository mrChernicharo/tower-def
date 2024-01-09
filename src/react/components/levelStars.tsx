import { LevelStarCount } from "../../game/types";

export function LevelStars({ stars }: { stars: LevelStarCount }) {
    switch (stars) {
        case 1:
            return <>★ ☆ ☆</>;
        case 2:
            return <>★ ★ ☆</>;
        case 3:
            return <>★ ★ ★</>;
        case 0:
        default:
            return <>☆ ☆ ☆</>;
    }
}
