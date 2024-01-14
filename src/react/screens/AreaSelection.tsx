import { Link } from "react-router-dom";
import { imgs } from "../../game/constants";
import { useEffect } from "react";
// import { allAreaLevels, allAreas } from "../../game/constants";
import { usePlayerContext } from "../context/usePlayerContext";
import { getAreaByLevel, getEarnedStars, getSpentStars, getUnlockedStages } from "../../game/helpers";
import { LevelStars } from "../components/levelStars";

const AreaSelection = () => {
    const { stars, skills } = usePlayerContext();

    const earnedStars = getEarnedStars(stars);
    const starsSpent = getSpentStars(skills);
    const starsToSpend = earnedStars - starsSpent;

    useEffect(() => {
        console.log(getUnlockedStages(stars));
        // const worldMapContainer = document.querySelector(".world-map-container") as HTMLDivElement;
        // const bounds = worldMapContainer.getBoundingClientRect();
        // console.log({ bounds });
    }, [stars]);

    return (
        <div style={{ margin: "0 auto", width: "360px", border: "1px solid" }}>
            <div className="world-map-container" style={{ position: "relative", height: "800px" }}>
                <div style={{ position: "fixed", zIndex: 200 }}>
                    <Link to="/">
                        <button>←</button>
                    </Link>
                </div>
                {[
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
                ].map((pos, i) => {
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
                        </div>
                    );
                })}
                <img src={imgs.World} style={{ position: "absolute", maxWidth: "100%", height: "100%" }} />

                <Link to="/skills">
                    <button style={{ position: "fixed", bottom: 5, left: 5 }}>
                        <span>Skills</span>
                        {starsToSpend > 0 ? (
                            <div style={{ position: "absolute", bottom: 18, left: 56, transform: "rotate(12deg)" }}>
                                <span
                                    style={{
                                        position: "relative",
                                        color: "orangered",
                                        fontSize: 36,
                                    }}
                                >
                                    ★
                                    <span
                                        style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "52.5%",
                                            transform: "translate(-50%,-50%) rotate(-12deg)",
                                            color: "#fff",
                                            fontSize: 12,
                                            fontWeight: 900,
                                        }}
                                    >
                                        {starsToSpend}
                                    </span>
                                </span>
                            </div>
                        ) : null}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AreaSelection;
