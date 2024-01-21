import { SkillPath } from "../enums";
import { Skill } from "../types";

// prettier-ignore
export const GAME_SKILLS: { [k in SkillPath]: Skill[] }  = {
    archer: [
        { id: "archer-1", name: "precision shot", description: "Increase accuracy for archer towers by 15%", starCost: 1 },
        { id: "archer-2", name: "swift arrows", description: "Archers shoot 20% faster", starCost: 2 },
        { id: "archer-3", name: "piercing shots", description: "Archers' shots pierce through enemy armor, dealing extra damage", starCost: 3 },
        { id: "archer-4", name: "eagle eye", description: "Archers have a chance to deal critical hits, causing double damage", starCost: 4 },
        { id: "archer-5", name: "archer commander", description: "Command all archers to focus fire, dealing massive damage to a single target", starCost: 5 },
    ],
    ballista: [
        { id: "ballista-1", name: "heavy bolts", description: "Ballista towers shoot heavy bolts, dealing increased damage", starCost: 1 },
        { id: "ballista-2", name: "rapid reload", description: "Reduce the reload time for ballista towers by 20%", starCost: 2 },
        { id: "ballista-3", name: "piercing impact", description: "Ballista bolts pierce through multiple enemies, causing collateral damage", starCost: 3 },
        { id: "ballista-4", name: "siege mastery", description: "Ballista towers become highly effective against enemy fortifications", starCost: 4 },
        { id: "ballista-5", name: "ballista engineer", description: "Upgrade ballista towers with advanced technology, greatly increasing their power", starCost: 5 },
    ],
    cannon: [
        { id: "cannon-1", name: "armor-piercing rounds", description: "Cannon shots ignore enemy armor, dealing full damage", starCost: 1 },
        { id: "cannon-2", name: "shrapnel explosion", description: "Cannon shots explode on impact, causing shrapnel damage to nearby enemies", starCost: 2 },
        { id: "cannon-3", name: "heavy artillery", description: "Upgrade cannons to heavy artillery, greatly increasing their damage", starCost: 3 },
        { id: "cannon-4", name: "volley fire", description: "Cannons unleash a rapid volley of shots, overwhelming enemies", starCost: 4 },
        { id: "cannon-5", name: "cannon general", description: "Command all cannons to focus fire on a single target, dealing massive damage", starCost: 5 },
    ],
    poison: [
        { id: "poison-1", name: "toxic arrows", description: "Archers use poisoned arrows, dealing damage over time to enemies", starCost: 1 },
        { id: "poison-2", name: "venomous clouds", description: "Create poisonous clouds that linger, damaging enemies over time", starCost: 2 },
        { id: "poison-3", name: "corrosive mixture", description: "Poison damage has a chance to reduce enemy armor temporarily", starCost: 3 },
        { id: "poison-4", name: "toxin spread", description: "Enemies hit by poison attacks spread the toxin to nearby foes", starCost: 4 },
        { id: "poison-5", name: "poison alchemist", description: "Become a master alchemist, creating deadly poisons with devastating effects", starCost: 5 },
    ],
    wizard: [
        { id: "wizard-1", name: "arcane missile", description: "Wizards shoot powerful arcane missiles, seeking out enemies", starCost: 1 },
        { id: "wizard-2", name: "mana shield", description: "Wizards create a protective mana shield, reducing incoming damage", starCost: 2 },
        { id: "wizard-3", name: "time warp", description: "Manipulate time to slow down enemy movement and attacks", starCost: 3 },
        { id: "wizard-4", name: "elemental mastery", description: "Master the elements, enhancing wizard spells with elemental power", starCost: 4 },
        { id: "wizard-5", name: "archmage", description: "Attain the rank of archmage, unlocking the most powerful wizard spells", starCost: 5 },
    ],
    meteor: [
        // { id: "meteor-1", name: "meteor shower", description: "Summon a meteor shower, devastating enemies in a targeted area", starCost: 1 },
        // { id: "meteor-2", name: "celestial judgment", description: "Call upon celestial forces to deliver a powerful judgment, dealing massive damage", starCost: 2 },
        // { id: "meteor-3", name: "cosmic explosion", description: "Upgrade meteors to explode upon impact, causing additional damage", starCost: 3 },
        // { id: "meteor-4", name: "supernova", description: "Reach the pinnacle of meteor mastery, unleashing a devastating supernova", starCost: 4 },
        // { id: "meteor-5", name: "celestial sorcerer", description: "Become a master of celestial magic, wielding unmatched power with meteors", starCost: 5 },

            { 
                id: "meteor-1",
                name: "Enhanced Meteor Shower",
                description: "Summon a meteor shower, devastating enemies in a targeted area",
                starCost: 1,
                effect: "Meteor Count +2"
            },
            { 
                id: "meteor-2",
                name: "Empowered Celestial Judgment",
                description: "Call upon celestial forces to deliver a powerful judgment, dealing massive damage",
                starCost: 2,
                effect: "+10% damage, Cooldown -10 seconds"
            },
            { 
                id: "meteor-3",
                name: "Explosive Cosmic Upgrade",
                description: "Upgrade meteors to explode upon impact, causing additional damage",
                starCost: 3,
                effect: "Meteor Count +2, Enable Slow Effect"
            },
            { 
                id: "meteor-4",
                name: "Supernova Mastery",
                description: "Reach the pinnacle of meteor mastery, unleashing a devastating supernova",
                starCost: 4,
                effect: "+10% damage, Cooldown -10 seconds, Enable Random Targets"
            },
            { 
                id: "meteor-5",
                name: "Celestial Sorcery Mastery",
                description: "Become a master of celestial magic, wielding unmatched power with meteors",
                starCost: 5,
                effect: "Meteor Count +2, Slow Effect +15%, Random Targets +3"
            },
    ],
    blizzard: [
        // { id: "blizzard-1", name: "icy winds", description: "Summon icy winds that slow down and freeze enemies in their tracks", starCost: 1 },
        // { id: "blizzard-2", name: "frostbite aura", description: "Create a chilling aura that inflicts frostbite, reducing enemy movement speed", starCost: 2 },
        // { id: "blizzard-3", name: "snowstorm", description: "Unleash a snowstorm, impairing visibility and slowing enemy attacks", starCost: 3 },
        // { id: "blizzard-4", name: "absolute zero", description: "Reach the absolute zero temperature, freezing enemies on the battlefield", starCost: 4 },
        // { id: "blizzard-5", name: "cryomancer", description: "Attain the title of cryomancer, mastering the art of ice and cold magic", starCost: 5 },
        { 
            id: "blizzard-1",
            name: "Icy Winds",
            description: "Summon chilling Icy Winds, dealing increased damage and lasting for a longer duration",
            starCost: 1,
            effect: "+50% damage, Duration +0.5 seconds"
        },
        { 
            id: "blizzard-2",
            name: "Arctic Frost",
            description: "Channel Arctic Frost, extending the range of your blizzard and reducing its cooldown time",
            starCost: 2,
            effect: "+1 range, Cooldown -5 seconds"
        },
        { 
            id: "blizzard-3",
            name: "Polar Vortex",
            description: "Unleash a Polar Vortex, intensifying the blizzard's damage, duration, and adding a bonus to slowEffect",
            starCost: 3,
            effect: "+50% damage, Duration +0.5 seconds, +10% slowEffect"
        },
        { 
            id: "blizzard-4",
            name: "Glacial Expansion",
            description: "Initiate Glacial Expansion, increasing the range of your blizzard and further reducing its cooldown time",
            starCost: 4,
            effect: "+1 range, Cooldown -5 seconds"
        },
        { 
            id: "blizzard-5",
            name: "Blizzard Mastery",
            description: "Master the art of Blizzard, enhancing damage, duration, and slowEffect. Effect: +50% damage, Duration +0.5 seconds, +5% slowEffect",
            starCost: 5,
            effect: "+50% damage, Duration +0.5 seconds, +5% slowEffect"
        },
    ],
};
