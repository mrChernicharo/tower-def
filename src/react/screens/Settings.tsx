import { AiFillSound } from "react-icons/ai";
import { FaMusic } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useAudioContext } from "../context/useAudioContext";

const Settings = () => {
    const { sound, soundOn, soundOff, music, musicOn, musicOff } = useAudioContext();

    return (
        <>
            <button
                onClick={() => {
                    history.back();
                }}
            >
                <FaArrowLeft />
            </button>

            <h1>Settings</h1>

            <button
                className={`sound-button ${sound ? "on" : "off"}`}
                onClick={() => {
                    sound ? soundOff() : soundOn();
                }}
            >
                <AiFillSound />
            </button>
            <button
                className={`music-button ${music ? "on" : "off"}`}
                onClick={() => {
                    music ? musicOff() : musicOn();
                }}
            >
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
