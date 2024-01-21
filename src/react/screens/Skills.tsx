/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import { usePlayerContext } from "../context/usePlayerContext";
import { imgs } from "../../shared/constants/general";
import { useCallback, useEffect, useState } from "react";
import { Skill, SkillId } from "../../shared/types";
import { capitalize, getEarnedStars, getSkillInfo, getSpentStars } from "../../shared/helpers";
import { FaArrowLeft } from "react-icons/fa";
import { GAME_SKILLS } from "../../shared/constants/skills";
import { SkillPath } from "../../shared/enums";

const Skills = () => {
    const { stars, skills, addSkill, removeSkill, resetAllSkills } = usePlayerContext();
    const [skillDetail, setSkillDetail] = useState<Skill | null>(null);

    const earnedStars = getEarnedStars(stars);
    const starsSpent = getSpentStars(skills);
    const starsToSpend = earnedStars - starsSpent;

    const onSkillClick = useCallback((skill: Skill) => {
        setSkillDetail(skill);
    }, []);

    const onPurchaseSkill = useCallback(
        (skill: Skill) => {
            if (starsSpent + skill.starCost <= earnedStars) {
                console.log("BUYING SKILL!!!");
                addSkill(skill);
                const [skillPath, skillLevel] = [skill.id.split("-")[0] as SkillPath, +skill.id.split("-")[1]];
                const nextSkill = GAME_SKILLS[skillPath][skillLevel];
                if (nextSkill) {
                    setSkillDetail(nextSkill);
                }
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
        console.log({ skills, GAME_SKILLS });
        setSkillDetail(GAME_SKILLS.archer[0]);
    }, [skills]);

    return (
        <>
            <div className="skills-top">
                <div className="top-line">
                    <h2>Skills</h2>
                    <Link to="/area-selection">
                        <button>
                            <FaArrowLeft />
                        </button>
                    </Link>
                </div>

                <div className="bottom-line">
                    <div>{starsToSpend}★</div>
                    <button onClick={resetSkills}>↻</button>
                </div>
            </div>

            <div className="skills-container">
                {Object.entries(GAME_SKILLS).map(([skillName, playerSkills]) => {
                    return (
                        <ul className="skill-row" key={skillName}>
                            {/* <h2>{skillName}</h2> */}
                            <img width={50} height={50} src={imgs[capitalize(skillName) as keyof typeof imgs]} />

                            {playerSkills.map((skill) => {
                                const skillId = skill.id as SkillId;
                                const purchased = skills[skillId];

                                return (
                                    <li className="skill-item" key={skill.name}>
                                        <button
                                            style={{
                                                background: purchased ? "dodgerblue" : "",
                                                border: skillDetail?.id === skill.id ? "2px solid gold" : "",
                                            }}
                                            onClick={() => onSkillClick(skill)}
                                        >
                                            <span>lv{skill.id.split("-")[1]} </span>
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

                        <p>{skillDetail.effectStr}</p>

                        <SkillActionButton
                            skill={skillDetail}
                            onPurchaseSkill={onPurchaseSkill}
                            onRemoveSkill={onRemoveSkill}
                            playerStars={starsToSpend}
                        />

                        <p>{skillDetail.description}</p>

                        {/* <div style={{ paddingTop: "1rem", display: "flex", justifyContent: "center" }}>
                            <SkillActionButton
                                skill={skillDetail}
                                onPurchaseSkill={onPurchaseSkill}
                                onRemoveSkill={onRemoveSkill}
                                playerStars={starsToSpend}
                            />
                        </div> */}
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
