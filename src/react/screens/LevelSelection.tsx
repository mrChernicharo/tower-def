import { Link, useParams } from "react-router-dom";
import { LevelStars } from "../components/levelStars";
import { usePlayerContext } from "../context/usePlayerContext";
import { allAreaLevels } from "../../game/constants";

const LevelSelection = () => {
    const { area } = useParams();
    const areaLevels = allAreaLevels[area as keyof typeof allAreaLevels];
    const { stars } = usePlayerContext();

    console.log({ area, areaLevels, stars });

    return (
        <>
            <Link to="/area">←</Link>

            <h1>LevelSelection</h1>
            <div>{area}</div>
            <ul>
                {areaLevels.map((level) => (
                    <ul key={level}>
                        <Link to={`/area/${area}/level/${level}`}>
                            <button>{level}</button>
                        </Link>
                        <LevelStars stars={stars[level]} />
                    </ul>
                ))}
            </ul>
        </>
    );
};

export default LevelSelection;
