/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { usePlayerContext } from "../context/usePlayerContext";
import { gameSkills } from "../../game/constants";
import { useCallback, useEffect } from "react";
import { Skill } from "../../game/types";
// import { useState } from "react";

const Skills = () => {
    const { stars, skills, addSkill } = usePlayerContext();

    const earnedStars = (stars as number[]).reduce((acc, next) => acc + next, 0);
    const starsSpent = Object.entries(skills)
        .filter(([_id, bool]) => bool)
        .reduce(
            (acc, [id, _bool]) =>
                acc + gameSkills[id.split("-")[0] as keyof typeof gameSkills].find((s) => s.id === id)!.starCost,
            0
        );

    const onSkillClick = useCallback(
        (skill: Skill) => {
            console.log({ skill, skills, stars, earnedStars, starsSpent });

            if (starsSpent + skill.starCost <= earnedStars) {
                if (skills[skill.id as keyof typeof skills]) {
                    console.log("ALREADY BOUGHT");
                } else {
                    console.log("BUYING SKILL!!!");
                    addSkill(skill);
                }
            } else {
                console.log("CANNOT AFFORD SKILL");
            }
        },
        [stars, skills, earnedStars, starsSpent, addSkill]
    );

    useEffect(() => {
        console.log({ skills, gameSkills });
    }, [skills]);

    return (
        <>
            <Link to="/">←</Link>

            <p>Skills</p>

            <p>{earnedStars - starsSpent}★</p>

            <div className="skills-container">
                {Object.entries(gameSkills).map(([skillName, playerSkills]) => {
                    const s = [...playerSkills].reverse();

                    return (
                        <ul className="skill-column" key={skillName}>
                            <h2>{skillName.slice(0, 6)}</h2>

                            {s.map((skill) => {
                                const bought = skills[skill.id as keyof typeof skills];

                                return (
                                    <li className="skill" key={skill.name}>
                                        <button
                                            onClick={() => onSkillClick(skill)}
                                            style={{ background: bought ? "green" : "" }}
                                        >
                                            <span>lv {skill.id.split("-")[1]} </span>
                                            <span style={{ color: "yellow" }}>
                                                <small>{skill.starCost}★ </small>
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    );
                })}
            </div>
        </>
    );
};

export default Skills;
