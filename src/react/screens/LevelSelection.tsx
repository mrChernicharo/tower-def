import { Link } from "react-router-dom";
import { imgs } from "../../shared/constants/general";
import { usePlayerContext } from "../context/usePlayerContext";
import { getAreaByLevel, getEarnedStars, getSpentStars, getUnlockedStages } from "../../shared/helpers";
import { LevelStars } from "../components/levelStars";
import { FaArrowLeft } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { useLayoutContext } from "../context/useLayoutContext";

const bottomBarStyles = {
    position: "absolute",
    bottom: 5,
    left: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    width: "calc(100% - 10px)",
    // border: "1px solid green",
} as React.CSSProperties;

const worldMapContainerStyles = {
    position: "relative",
    margin: "0 auto",
    // border: "1px solid red",
} as React.CSSProperties;

const starsBadgeStyles = {
    position: "absolute",
    left: "50%",
    top: "52.5%",
    transform: "translate(-50%,-50%) rotate(-12deg)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 900,
} as React.CSSProperties;

const levelIconsPositions = [
    // desert
    [80, 66],
    [82, 72],
    [78, 78],
    [83, 84],
    // forest
    [10, 15],
    [13, 21],
    [20, 27],
    [28, 33],
    // winter
    [40, 5],
    [50, 10],
    [66, 8],
    [80, 6],
    // lava
    [54, 52],
    [30, 60],
    [42, 64],
    [45, 58],
];

export const LevelSelection = () => {
    const { stars, skills } = usePlayerContext();
    const { isMobile } = useLayoutContext();

    const [, rerender] = useState(0);

    const earnedStars = getEarnedStars(stars);
    const starsSpent = getSpentStars(skills);
    const starsToSpend = earnedStars - starsSpent;

    const onResize = useCallback(() => {
        const worldImg = document.querySelector("#world-img") as HTMLImageElement;
        const worldMapContainer = document.querySelector(".world-map-container") as HTMLDivElement;
        const w = window.screen.availWidth > 800 ? 800 : window.screen.availWidth;
        const h = window.screen.availHeight > 800 ? 800 : window.screen.availHeight;
        worldImg.width = w;
        worldImg.height = h;
        worldMapContainer.style.width = w + "px";
        worldMapContainer.style.height = h + "px";
        rerender((p) => p + 1);
    }, [rerender]);

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [onResize]);

    return (
        <div>
            <div style={{ position: "fixed", top: 0, right: 5, zIndex: 200 }}>
                <Link to="/">
                    <button style={{ marginLeft: "5px", marginTop: "5px" }}>
                        <FaArrowLeft />
                    </button>
                </Link>
            </div>

            <div style={{ position: "fixed", top: 5, left: 5, zIndex: 200 }}>
                <h2 style={{ background: "#00000088", paddingInline: "1rem", borderRadius: 4 }}>Level Selection</h2>
            </div>

            {/* <div style={{ height: 25 }}></div> */}

            <div className="world-map-container" style={worldMapContainerStyles}>
                {levelIconsPositions.map((pos, i) => {
                    return (
                        <div
                            key={`pos-${i}`}
                            style={{ position: "absolute", left: pos[0] + "%", top: pos[1] + "%", zIndex: 100 }}
                        >
                            {getUnlockedStages(stars) >= i ? (
                                <Link to={`/area/${getAreaByLevel(i)}/level/${i}`}>
                                    <button style={{ background: "transparent", border: "none", padding: 0 }}>
                                        <img width={36} height={36} src={imgs.Stage} />
                                        <LevelStars stars={stars[i]} />
                                    </button>
                                </Link>
                            ) : null}
                            {/* <Link to={`/area/${getAreaByLevel(i)}/level/${i}`}>
                                <button style={{ background: "transparent", border: "none", padding: 0 }}>
                                    <img width={36} height={36} src={imgs.Stage} />
                                    <LevelStars stars={stars[i]} />
                                </button>
                            </Link> */}
                        </div>
                    );
                })}

                <img id="world-img" src={imgs.World} style={{ position: "absolute" }} />

                <div style={{ ...bottomBarStyles, ...(isMobile ? { position: "fixed" } : {}) }}>
                    <Link to="/skills">
                        <button style={{ marginLeft: "5px" }}>
                            <span>Skills</span>
                            {starsToSpend > 0 ? (
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 18,
                                        left: 62,
                                        transform: "rotate(12deg)",
                                    }}
                                >
                                    <span
                                        style={{
                                            position: "relative",
                                            color: "orangered",
                                            fontSize: 36,
                                        }}
                                    >
                                        ★<span style={starsBadgeStyles}>{starsToSpend}</span>
                                    </span>
                                </div>
                            ) : null}
                        </button>
                    </Link>

                    {/* <button>Achievements</button> */}

                    <Link to="/settings">
                        <button style={{ padding: "0.5rem", display: "flex", marginLeft: "5px" }}>
                            <img src={imgs.Settings} width={24} height={24} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
