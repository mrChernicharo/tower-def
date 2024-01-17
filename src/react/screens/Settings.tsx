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

            <div id="clear-saved-data-btn-container">
                <button
                    onClick={() => {
                        if (confirm("All your progress will be erased! Are you sure you want to continue?")) {
                            localStorage.clear();
                            location.reload();
                            alert("all data has been cleared");
                        }
                    }}
                >
                    Reset Progress
                </button>
            </div>
        </>
    );
};

export default Settings;
