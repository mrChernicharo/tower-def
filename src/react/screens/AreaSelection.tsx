import { Link } from "react-router-dom";
import { allAreaLevels, allAreas } from "../../game/constants";
import { usePlayerContext } from "../context/usePlayerContext";
import { getUnlockedStages } from "../../game/helpers";

const AreaSelection = () => {
    const { stars } = usePlayerContext();

    return (
        <>
            <Link to="/">←</Link>
            <h1>AreaSelection</h1>

            <ul>
                {allAreas.map((area) => (
                    <li key={area.id}>
                        <Link to={`/area/${area.name}`}>
                            <button disabled={!allAreaLevels[area.name].some((val) => getUnlockedStages(stars) >= val)}>
                                {area.name}
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default AreaSelection;
