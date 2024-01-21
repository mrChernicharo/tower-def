import { SkillEffectName, SkillPath } from "../enums";
import { Skill } from "../types";

export const GAME_SKILLS: { [k in SkillPath]: Skill[] } = {
    archer: [
        {
            id: "archer-1",
            name: "Longshot Mastery",
            description: "Master the art of the Longshot, increasing the range of your arrows",
            starCost: 1,
            effectStr: "RANGE +1",
            effect: {
                [SkillEffectName.Range]: { value: 1, unit: "meters" },
            },
        },
        {
            id: "archer-2",
            name: "Precision Strikes",
            description: "Hone your archery skills for precision strikes, increasing arrow damage",
            starCost: 2,
            effectStr: "DAMAGE +10%",
            effect: {
                [SkillEffectName.Damage]: { value: 10, unit: "%" },
            },
        },
        {
            id: "archer-3",
            name: "Multi-Target Precision",
            description: "Learn the technique of hitting multiple targets with precision",
            starCost: 3,
            effectStr: "MULTI_TARGET ENABLED",
            effect: {
                [SkillEffectName.MultiTarget]: { value: 1, unit: "" },
            },
        },
        {
            id: "archer-4",
            name: "Rapid Fire Efficiency",
            description: "Improve your archery speed with increased rate of fire and reduced arrow cost",
            starCost: 4,
            effectStr: "RATE_OF_FIRE +5%, PRICE -10%",
            effect: {
                [SkillEffectName.RateOfFire]: { value: 5, unit: "%" },
                [SkillEffectName.Price]: { value: -10, unit: "%" },
            },
        },
        {
            id: "archer-5",
            name: "Master Archer",
            description:
                "Attain the title of Master Archer, gaining even greater precision and multi-target capabilities",
            starCost: 5,
            effectStr: "MULTI_TARGET +1",
            effect: {
                [SkillEffectName.MultiTarget]: { value: 1, unit: "" },
            },
        },
    ],
    ballista: [
        {
            id: "ballista-1",
            name: "Ballistic Power",
            description: "Increase the damage output of your Ballista",
            starCost: 1,
            effectStr: "DAMAGE +10%",
            effect: {
                [SkillEffectName.Damage]: { value: 10, unit: "%" },
            },
        },
        {
            id: "ballista-2",
            name: "Rapid Reload",
            description: "Improve the rate of fire for your Ballista",
            starCost: 2,
            effectStr: "RATE_OF_FIRE +10%",
            effect: {
                [SkillEffectName.RateOfFire]: { value: 10, unit: "%" },
            },
        },
        {
            id: "ballista-3",
            name: "Precision Strikes",
            description: "Unlock the ability to land critical hits with your Ballista shots",
            starCost: 3,
            effectStr: "CRITICAL_HIT ENABLED",
            effect: {
                [SkillEffectName.CriticalHit]: { value: 1, unit: "" },
            },
        },
        {
            id: "ballista-4",
            name: "Efficient Deployment",
            description: "Optimize your Ballista's performance with increased rate of fire and reduced cost",
            starCost: 4,
            effectStr: "RATE_OF_FIRE +5%, PRICE -10%",
            effect: {
                [SkillEffectName.RateOfFire]: { value: 5, unit: "%" },
                [SkillEffectName.Price]: { value: -10, unit: "%" },
            },
        },
        {
            id: "ballista-5",
            name: "Extreme Range Mastery",
            description: "Master the art of extreme range attacks, increasing Ballista range and critical hit chance",
            starCost: 5,
            effectStr: "RANGE +2, CRITICAL_HIT +5%",
            effect: {
                [SkillEffectName.Range]: { value: 2, unit: "meters" },
                [SkillEffectName.CriticalHit]: { value: 5, unit: "%" },
            },
        },
    ],
    cannon: [
        {
            id: "cannon-1",
            name: "Cannon Barrage",
            description: "Increase the damage output of your Cannon",
            starCost: 1,
            effectStr: "DAMAGE +10%",
            effect: {
                [SkillEffectName.Damage]: { value: 10, unit: "%" },
            },
        },
        {
            id: "cannon-2",
            name: "Explosive Impact",
            description: "Widen the splash area of your Cannon shots",
            starCost: 2,
            effectStr: "SPLASH_AREA +10%",
            effect: {
                [SkillEffectName.SplashArea]: { value: 10, unit: "%" },
            },
        },
        {
            id: "cannon-3",
            name: "Extended Range",
            description: "Improve the range of your Cannon shots",
            starCost: 3,
            effectStr: "RANGE +1",
            effect: {
                [SkillEffectName.Range]: { value: 1, unit: "meters" },
            },
        },
        {
            id: "cannon-4",
            name: "Shock and Awe",
            description: "Your Cannon shots slow enemies for a short period",
            starCost: 4,
            effectStr: "SLOW ENABLED",
            effect: {
                [SkillEffectName.SlowEffect]: { value: 1, unit: "" },
            },
        },
        {
            id: "cannon-5",
            name: "Efficient Bombardment",
            description: "Enhance the rate of fire for your Cannon shots while reducing the cost",
            starCost: 5,
            effectStr: "RATE_OF_FIRE +10%, PRICE -10%",
            effect: {
                [SkillEffectName.RateOfFire]: { value: 10, unit: "%" },
                [SkillEffectName.Price]: { value: -10, unit: "%" },
            },
        },
    ],
    poison: [
        {
            id: "poison-1",
            name: "Toxic Enhancement",
            description: "Increase the poison damage inflicted by your attacks",
            starCost: 1,
            effectStr: "POISON_DAMAGE +10%",
            effect: {
                [SkillEffectName.PoisonDamage]: { value: 10, unit: "%" },
            },
        },
        {
            id: "poison-2",
            name: "Extended Toxicity",
            description: "Prolong the duration of the poison effect",
            starCost: 2,
            effectStr: "POISON_DURATION +1s",
            effect: {
                [SkillEffectName.PoisonDuration]: { value: 1, unit: "s" },
            },
        },
        {
            id: "poison-3",
            name: "Venomous Reach",
            description: "Extend the range of your poison attacks",
            starCost: 3,
            effectStr: "RANGE +1",
            effect: {
                [SkillEffectName.Range]: { value: 1, unit: "meters" },
            },
        },
        {
            id: "poison-4",
            name: "Cost-Effective Poison",
            description: "Reduce the price of your poison attacks and increase poison damage",
            starCost: 4,
            effectStr: "PRICE -10%, POISON_DAMAGE +5%",
            effect: {
                [SkillEffectName.Price]: { value: -10, unit: "%" },
                [SkillEffectName.PoisonDamage]: { value: 5, unit: "%" },
            },
        },
        {
            id: "poison-5",
            name: "Potent Toxin Mastery",
            description: "Further increase poison duration and damage for a potent and lasting effect",
            starCost: 5,
            effectStr: "POISON_DURATION +1s, POISON_DAMAGE +5%",
            effect: {
                [SkillEffectName.PoisonDuration]: { value: 1, unit: "s" },
                [SkillEffectName.PoisonDamage]: { value: 5, unit: "%" },
            },
        },
    ],
    wizard: [
        {
            id: "wizard-1",
            name: "Arcane Reach",
            description: "Increase the range of your wizard spells",
            starCost: 1,
            effectStr: "RANGE +1",
            effect: {
                [SkillEffectName.Range]: { value: 1, unit: "meters" },
            },
        },
        {
            id: "wizard-2",
            name: "Ricochet Mastery",
            description: "Unlock the ability for your spells to bounce between targets",
            starCost: 2,
            effectStr: "RICOCHET ENABLED",
            effect: {
                [SkillEffectName.Ricochet]: { value: 1, unit: "" },
            },
        },
        {
            id: "wizard-3",
            name: "Arcane Power Boost",
            description: "Enhance the damage output of your wizard spells",
            starCost: 3,
            effectStr: "DAMAGE +10%",
            effect: {
                [SkillEffectName.Damage]: { value: 10, unit: "%" },
            },
        },
        {
            id: "wizard-4",
            name: "Extended Range and Ricochet",
            description: "Increase both the range of your wizard spells and the number of ricochets",
            starCost: 4,
            effectStr: "RANGE +0.5, RICOCHET +1",
            effect: {
                [SkillEffectName.Range]: { value: 0.5, unit: "meters" },
                [SkillEffectName.Ricochet]: { value: 1, unit: "" },
            },
        },
        {
            id: "wizard-5",
            name: "Cost-Effective Spellcasting",
            description: "Reduce the price of your wizard spells while gaining additional ricochet capability",
            starCost: 5,
            effectStr: "PRICE -10%, RICOCHET +1",
            effect: {
                [SkillEffectName.Price]: { value: -10, unit: "%" },
                [SkillEffectName.Ricochet]: { value: 1, unit: "" },
            },
        },
    ],
    meteor: [
        {
            id: "meteor-1", // ok
            name: "Enhanced Meteor Shower",
            description: "Summon a meteor shower, devastating enemies in a targeted area",
            starCost: 1,
            effectStr: "METEOR_COUNT +2",
            effect: {
                [SkillEffectName.MeteorCount]: { value: 2, unit: "" },
            },
        },
        {
            id: "meteor-2", // ok
            name: "Empowered Celestial Judgment",
            description: "Call upon celestial forces to deliver a powerful judgment, dealing massive damage",
            starCost: 2,
            effectStr: "DAMAGE +10% , COOLDOWN -10s",
            effect: {
                [SkillEffectName.Damage]: { value: 10, unit: "%" },
                [SkillEffectName.Cooldown]: { value: -10, unit: "s" },
            },
        },
        {
            id: "meteor-3",
            name: "Explosive Cosmic Upgrade",
            description: "Upgrade meteors to explode upon impact, causing additional damage",
            starCost: 3,
            effectStr: "METEOR_COUNT +2, SLOW_EFFECT ENABLED",
            effect: {
                [SkillEffectName.MeteorCount]: { value: 2, unit: "" },
                [SkillEffectName.SlowEffect]: { value: 1, unit: "" },
            },
        },
        {
            id: "meteor-4",
            name: "Supernova Mastery",
            description: "Reach the pinnacle of meteor mastery, unleashing a devastating supernova",
            starCost: 4,
            effectStr: "DAMAGE +10% , COOLDOWN -10s, RANDOM_TARGETS ENABLED",
            effect: {
                [SkillEffectName.Damage]: { value: 10, unit: "%" },
                [SkillEffectName.Cooldown]: { value: -10, unit: "s" },
                [SkillEffectName.RandomTargets]: { value: 1, unit: "" },
            },
        },
        {
            id: "meteor-5",
            name: "Celestial Sorcery Mastery",
            description: "Become a master of celestial magic, wielding unmatched power with meteors",
            starCost: 5,
            effectStr: "METEOR_COUNT +2, SLOW_EFFECT +15%, RANDOM_TARGETS +3",
            effect: {
                [SkillEffectName.MeteorCount]: { value: 2, unit: "" },
                [SkillEffectName.SlowEffect]: { value: 15, unit: "%" },
                [SkillEffectName.RandomTargets]: { value: 3, unit: "" },
            },
        },
    ],

    blizzard: [
        {
            id: "blizzard-1",
            name: "Icy Winds",
            description: "Summon chilling Icy Winds, dealing increased damage and lasting for a longer duration",
            starCost: 1,
            effectStr: "DAMAGE +50%, SLOW_DURATION +0.5s",
            effect: {
                [SkillEffectName.Damage]: { value: 50, unit: "%" },
                [SkillEffectName.SlowDuration]: { value: 0.5, unit: "s" },
            },
        },
        {
            id: "blizzard-2",
            name: "Arctic Frost",
            description: "Channel Arctic Frost, extending the range of your blizzard and reducing its cooldown time",
            starCost: 2,
            effectStr: "RANGE +1, COOLDOWN -5s",
            effect: {
                [SkillEffectName.Range]: { value: 1, unit: "meters" },
                [SkillEffectName.Cooldown]: { value: -5, unit: "s" },
            },
        },
        {
            id: "blizzard-3",
            name: "Polar Vortex",
            description:
                "Unleash a Polar Vortex, intensifying the blizzard's damage, duration, and adding a bonus to slowEffect",
            starCost: 3,
            effectStr: "DAMAGE +50%, SLOW_DURATION +0.5s,  SLOW_EFFECT +10%",
            effect: {
                [SkillEffectName.Damage]: { value: 50, unit: "%" },
                [SkillEffectName.SlowDuration]: { value: 0.5, unit: "s" },
                [SkillEffectName.SlowEffect]: { value: 10, unit: "%" },
            },
        },
        {
            id: "blizzard-4",
            name: "Glacial Expansion",
            description:
                "Initiate Glacial Expansion, increasing the range of your blizzard and further reducing its cooldown time",
            starCost: 4,
            effectStr: "RANGE +1, COOLDOWN -5s",
            effect: {
                [SkillEffectName.Range]: { value: 1, unit: "meters" },
                [SkillEffectName.Cooldown]: { value: -5, unit: "s" },
            },
        },
        {
            id: "blizzard-5",
            name: "Blizzard Mastery",
            description: "Master the art of Blizzard, enhancing damage, duration, and slowEffect",
            starCost: 5,
            effectStr: "DAMAGE +50%, SLOW_DURATION +0.5s, SLOW_EFFECT  +5%",
            effect: {
                [SkillEffectName.Damage]: { value: 50, unit: "%" },
                [SkillEffectName.SlowDuration]: { value: 0.5, unit: "s" },
                [SkillEffectName.SlowEffect]: { value: 5, unit: "%" },
            },
        },
    ],
};
