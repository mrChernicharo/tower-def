import { desert01, desert02 } from "./desert-paths";
import { forest01, forest02 } from "./forest-paths";
import { winter01, winter02 } from "./winter-paths";
import { lava01 } from "./lava-paths";

export const ALL_PATHS = [
    {
        stage: 1,
        area: "desert",
        paths: {
            center: desert01.center,
            left: desert01.left,
            right: desert01.right,
        },
    },
    {
        stage: 2,
        area: "desert",
        paths: {
            center: desert02.center,
            left: desert02.left,
            right: desert02.right,
        },
    },
    {
        stage: 3,
        area: "desert",
        paths: {
            center: desert01.center,
            left: desert01.left,
            right: desert01.right,
        },
    },
    {
        stage: 4,
        area: "desert",
        paths: {
            center: desert02.center,
            left: desert02.left,
            right: desert02.right,
        },
    },
    {
        stage: 5,
        area: "forest",
        paths: {
            center: forest01.center,
            left: forest01.left,
            right: forest01.right,
        },
    },
    {
        stage: 6,
        area: "forest",
        paths: {
            center: forest02.center,
            left: forest02.left,
            right: forest02.right,
        },
    },
    {
        stage: 7,
        area: "forest",
        paths: {
            center: forest01.center,
            left: forest01.left,
            right: forest01.right,
        },
    },
    {
        stage: 8,
        area: "forest",
        paths: {
            center: forest02.center,
            left: forest02.left,
            right: forest02.right,
        },
    },
    {
        stage: 9,
        area: "winter",
        paths: {
            center: winter01.center,
            left: winter01.left,
            right: winter01.right,
        },
    },
    {
        stage: 10,
        area: "winter",
        paths: {
            center: winter02.center,
            left: winter02.left,
            right: winter02.right,
        },
    },
    {
        stage: 11,
        area: "winter",
        paths: {
            center: winter01.center,
            left: winter01.left,
            right: winter01.right,
        },
    },
    {
        stage: 12,
        area: "winter",
        paths: {
            center: winter02.center,
            left: winter02.left,
            right: winter02.right,
        },
    },
    // Continue the pattern...
    {
        stage: 13,
        area: "lava",
        paths: {
            center: lava01.center,
            left: lava01.left,
            right: lava01.right,
        },
    },
    {
        stage: 14,
        area: "lava",
        paths: {
            center: lava01.center,
            left: lava01.left,
            right: lava01.right,
        },
    },
    {
        stage: 15,
        area: "lava",
        paths: {
            center: lava01.center,
            left: lava01.left,
            right: lava01.right,
        },
    },
    {
        stage: 16,
        area: "lava",
        paths: {
            center: lava01.center,
            left: lava01.left,
            right: lava01.right,
        },
    },
];
