import { Link } from "react-router-dom";
import { allAreaLevels, allAreas } from "../../game/constants";
import { usePlayerContext } from "../context/usePlayerContext";

const AreaSelection = () => {
    const { unlockedStages } = usePlayerContext();
    return (
        <>
            <Link to="/">←</Link>
            <h1>AreaSelection</h1>

            <ul>
                {allAreas.map((area) => (
                    <li key={area.id}>
                        <Link to={`/area/${area.name}`}>
                            <button disabled={!allAreaLevels[area.name].some((val) => unlockedStages >= val)}>
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
