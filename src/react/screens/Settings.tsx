import { AiFillSound } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Settings = () => {
    return (
        <>
            <Link to="/area-selection">
                <button>
                    <FaArrowLeft />
                </button>
            </Link>
            <h1>Settings</h1>

            <button>
                <AiFillSound />
            </button>
            <button>
                <FaMusic />
            </button>
        </>
    );
};

export default Settings;
