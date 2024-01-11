/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { usePlayerContext } from "../context/usePlayerContext";
import { gameSkills, imgs } from "../../game/constants";
import { useCallback, useEffect, useState } from "react";
import { Skill, SkillId } from "../../game/types";
import { capitalize, getSkillInfo } from "../../game/helpers";
// import { useState } from "react";

const Skills = () => {
    const { stars, skills, addSkill, removeSkill, resetAllSkills } = usePlayerContext();
    const [skillDetail, setSkillDetail] = useState<Skill | null>(null);

    const earnedStars = (stars as number[]).reduce((acc, next) => acc + next, 0);
    const starsSpent = Object.entries(skills)
        .filter(([_id, bool]) => bool)
        .reduce(
            (acc, [id, _bool]) =>
                acc + gameSkills[id.split("-")[0] as keyof typeof gameSkills].find((s) => s.id === id)!.starCost,
            0
        );

    const onSkillClick = useCallback((skill: Skill) => {
        setSkillDetail(skill);
    }, []);

    const onPurchaseSkill = useCallback(
        (skill: Skill) => {
            if (starsSpent + skill.starCost <= earnedStars) {
                console.log("BUYING SKILL!!!");
                addSkill(skill);
            } else {
                console.log("CANNOT AFFORD SKILL");
            }
        },
        [earnedStars, starsSpent, addSkill]
    );

    const onRemoveSkill = useCallback(
        (skill: Skill) => {
            console.log("REMOVING SKILL!!!");
            removeSkill(skill);
        },
        [removeSkill]
    );

    const resetSkills = useCallback(() => {
        if (confirm("Are you sure you want to reset all skills?")) {
            resetAllSkills();
        }
    }, [resetAllSkills]);

    useEffect(() => {
        console.log({ skills, gameSkills });
    }, [skills]);

    return (
        <>
            <Link to="/">←</Link>

            <p>Skills</p>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>{earnedStars - starsSpent}★</div>
                <div>
                    <button onClick={resetSkills}>↻</button>
                </div>
            </div>

            <div className="skills-container">
                {Object.entries(gameSkills).map(([skillName, playerSkills]) => {
                    const skillCol = [...playerSkills].reverse();

                    return (
                        <ul className="skill-column" key={skillName}>
                            {/* <h2>{skillName}</h2> */}
                            <img
                                width={50}
                                height={50}
                                src={imgs[`${capitalize(skillName)}Path` as keyof typeof imgs]}
                            />

                            {skillCol.map((skill) => {
                                const skillId = skill.id as SkillId;
                                const purchased = skills[skillId];

                                return (
                                    <li className="skill-item" key={skill.name}>
                                        <button
                                            style={{ background: purchased ? "green" : "" }}
                                            onClick={() => onSkillClick(skill)}
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

            <div className="skill-detail">
                {skillDetail ? (
                    <div>
                        <h2>{capitalize(skillDetail.name)}</h2>
                        <p>{skillDetail.description}</p>

                        <div style={{ paddingTop: "1rem", display: "flex", justifyContent: "center" }}>
                            <SkillActionButton
                                skill={skillDetail}
                                onPurchaseSkill={onPurchaseSkill}
                                onRemoveSkill={onRemoveSkill}
                                playerStars={earnedStars - starsSpent}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

function SkillActionButton({
    skill,
    playerStars,
    onPurchaseSkill,
    onRemoveSkill,
}: {
    skill: Skill;
    playerStars: number;
    onPurchaseSkill: (skill: Skill) => void;
    onRemoveSkill: (skill: Skill) => void;
}) {
    const { skills } = usePlayerContext();
    const { skillPath, skillLevel } = getSkillInfo(skill.id);

    const skillPurchased = skills[skill.id as SkillId];
    const skillPurchasable = skillLevel === 1 || skills[`${skillPath}-${skillLevel - 1}` as SkillId];
    const canAfford = skill.starCost <= playerStars;

    if (skillPurchased) return <button onClick={() => onRemoveSkill(skill)}>Remove</button>;
    else if (skillPurchasable)
        return (
            <button disabled={!canAfford} onClick={() => onPurchaseSkill(skill)}>
                Purchase
            </button>
        );
    else return null;
}

export default Skills;
