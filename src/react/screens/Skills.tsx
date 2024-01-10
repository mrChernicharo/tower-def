/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { usePlayerContext } from "../context/usePlayerContext";
import { gameSkills } from "../../game/constants";
import { useCallback } from "react";
import { Skill } from "../../game/types";
// import { useState } from "react";

const Skills = () => {
    const { stars: starList, skills, addSkill } = usePlayerContext();
    const totalStars = (starList as number[]).reduce((acc, next) => acc + next, 0);

    // const [stars, setStars] = useState(totalStars);

    const onSkillClick = useCallback(
        (skill: Skill) => {
            const availableStars = (starList as number[]).reduce((acc, next) => acc + next, 0);
            const starsSpent = Object.entries(skills)
                .filter(([_id, bool]) => bool)
                .reduce(
                    (acc, [id, _bool]) =>
                        acc +
                        gameSkills[id.split("-")[0] as keyof typeof gameSkills].find((s) => s.id === id)!.starCost,
                    0
                );

            // const starsAvailable =

            console.log({ skill, skills, starList, availableStars, starsSpent });

            if (starsSpent + skill.starCost <= availableStars) {
                console.log("BUYING SKILL!!!");
                addSkill(skill);
            } else {
                console.log("CANNOT AFFORD SKILL");
            }
        },
        [starList, skills, addSkill]
    );

    return (
        <>
            <Link to="/">←</Link>
            <p>Skills</p>
            <p>{totalStars}★</p>
            <div className="skills-container">
                {Object.entries(gameSkills).map(([skillName, skills]) => {
                    const s = [...skills].reverse();

                    return (
                        <ul className="skill-column" key={skillName}>
                            <h2>{skillName.slice(0, 6)}</h2>

                            {s.map((skill) => (
                                <li className="skill" key={skill.name}>
                                    <button onClick={() => onSkillClick(skill)}>
                                        <span>lv {skill.id.split("-")[1]} </span>
                                        <span style={{ color: "yellow" }}>
                                            <small>{skill.starCost}★ </small>
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    );
                })}
            </div>
        </>
    );
};

export default Skills;
