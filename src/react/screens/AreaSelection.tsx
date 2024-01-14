import { Link } from "react-router-dom";
import { imgs } from "../../game/constants";
import { useEffect } from "react";
// import { allAreaLevels, allAreas } from "../../game/constants";
// import { usePlayerContext } from "../context/usePlayerContext";
// import { getUnlockedStages } from "../../game/helpers";

const AreaSelection = () => {
    // const { stars } = usePlayerContext();

    useEffect(() => {
        // const worldMapContainer = document.querySelector(".world-map-container") as HTMLDivElement;
        // const bounds = worldMapContainer.getBoundingClientRect();
        // console.log({ bounds });
    }, []);

    return (
        <div style={{ margin: "0 auto", width: "360px", border: "1px solid" }}>
            <div className="world-map-container" style={{ position: "relative", height: "800px" }}>
                <div style={{ position: "fixed", zIndex: 200 }}>
                    <Link to="/">
                        <button>←</button>
                    </Link>
                </div>
                {[
                    [80, 66],
                    [85, 72],
                    [78, 78],
                    [83, 84],

                    [10, 15],
                    [13, 21],
                    [20, 28],
                    [32, 30],

                    [40, 5],
                    [50, 10],
                    [66, 8],
                    [80, 6],

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
                            <img width={40} height={40} src={imgs.Stage} />
                        </div>
                    );
                })}
                <img src={imgs.World} style={{ position: "absolute", maxWidth: "100%", height: "100%" }} />
            </div>

            {/* <ul>
                {allAreas.map((area) => (
                    <li key={area.id}>
                        <Link to={`/area/${area.name}`}>
                            <button disabled={!allAreaLevels[area.name].some((val) => getUnlockedStages(stars) >= val)}>
                                {area.name}
                            </button>
                        </Link>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default AreaSelection;
