import { Link } from "react-router-dom";

const areas = [
    { id: 0, name: "desert" },
    { id: 1, name: "forest" },
    { id: 2, name: "winter" },
    { id: 3, name: "lava" },
];

const AreaSelection = () => {
    return (
        <>
            <Link to="/">←</Link>
            <h1>AreaSelection</h1>

            <ul>
                {areas.map((area) => (
                    <li key={area.id}>
                        <Link to={`/area/${area.name}`}>
                            <button>{area.name}</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default AreaSelection;
