import { Link, useParams } from "react-router-dom";

const allAreaLevels = {
    desert: [0, 1, 2, 3],
    forest: [4, 5, 6, 7],
    winter: [8, 9, 10, 11],
    lava: [12, 13, 14, 15],
} as const;

const LevelSelection = () => {
    const { area } = useParams();
    const areaLevels = allAreaLevels[area as keyof typeof allAreaLevels];

    console.log(area, areaLevels);

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
                    </ul>
                ))}
            </ul>
        </>
    );
};

export default LevelSelection;
