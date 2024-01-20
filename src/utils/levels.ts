/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { EnemyChar, GameArea } from "./enums";
import { GameLevel, LevelObject } from "./types";
import { winterLevelPaths } from "./paths/winter/paths";
import { lavaLevelPaths } from "./paths/lava/paths";
import { desertLevelPaths00, desertLevelPaths01 } from "./paths/desert/paths";
import { forestLevelPaths } from "./paths/forest/paths";
// import { THREE } from "../three";

export const mapURLs = {
    desert: "/assets/glb/levels/lv1.desert-level.glb",
    forest: "/assets/glb/levels/lv2.forest-level.glb",
    winter: "/assets/glb/levels/lv3.winter-level.glb",
    lava: "/assets/glb/levels/lv4.lava-level.glb",
};

const smallBounds = {
    left: -15,
    right: 15,
    top: -5,
    bottom: 85,
};
const mediumBounds = {
    left: -20,
    right: 20,
    top: 0,
    bottom: 80,
};
const largeBounds = {
    left: -30,
    right: 30,
    top: 0,
    bottom: 110,
};

const towerBasePositions = {
    desert: [
        [-4.23, 0.1, -32],
        [-10.03, 0.1, 9.045719146728516],
        [-14.67, 0.1, 8.63398265838623],
        [-15.78, 0.1, 3.8990440368652344],
        [-10.65, 0.1, 3.6790854930877686],
        [-4.93, 0.1, -25.139816284179688],
        [-12.06, 0.1, -25.139816284179688],
        [-11.54, 0.1, -31.42244529724121],
        [14.094917297363281, 0.1, 20.26247787475586],
        [8.91, 0.1, 20.561803817749023],
        [9.13, 0.1, 26.90176010131836],
        [14.72, 0.1, 26.308197021484375],
        [13.21, 0.1, 33.36888122558594],
        [7.62, 0.1, 33.96244812011719],
        [-5.4, 0.1, 9.045719146728516],
        [-11.05, 0.1, -18.505279541015625],
        [-8.77, 0.1, -4.2777299880981445],
        [5.64, 0.1, 12.768688201904297],
    ] as [number, number, number][],
    desert2: [
        // [-17.5, 0.1, -20],
        [-16.769852409018597, 0, -22.1100205012947],
        [-10.084115639998581, 0, -19.25634365751264],
        [-0.055603980089027116, 0, -17.736693319780095],
        [-16.5, 0.1, -7],
        [-8, 0.1, -5],
        [-16, 0.1, 7],
        [-7, 0.1, 5],
        [-11, 0.1, 12],
        [7, 0.1, 13],
        [0, 0.1, 10],
        [2.1066766393286835, 0, 1.3845094820838533],
        [11.270140720927576, 0, 7.101552849333572],
        [12.251040080251133, 0, -0.028416352144908785],
        [12.45412333038625, 0, 23.101484393737536],
        [-5.6441889522027076, 0, 30.42731280929469],
        [-1.3580527298250695, 0, 21.598511061270955],
        [-16.995856344543678, 0, 20.83100040563857],
        [15.121864459180443, 0, 15.531729381782675],
        // [-16.23, 0.1, -16],
        // [-10.03, 0.1, 9.045719146728516],
        // [-14.67, 0.1, 8.63398265838623],
        // [-15.78, 0.1, 3.8990440368652344],
        // [-10.65, 0.1, 3.6790854930877686],
        // [-4.93, 0.1, -25.139816284179688],
        // [-12.06, 0.1, -25.139816284179688],
        // [-11.54, 0.1, -31.42244529724121],
        // [14.094917297363281, 0.1, 20.26247787475586],
        // [8.91, 0.1, 20.561803817749023],
        // [9.13, 0.1, 26.90176010131836],
        // [14.72, 0.1, 26.308197021484375],
        // [13.21, 0.1, 33.36888122558594],
        // [7.62, 0.1, 33.96244812011719],
        // [-5.4, 0.1, 9.045719146728516],
        // [-11.05, 0.1, -18.505279541015625],
        // [-8.77, 0.1, -4.2777299880981445],
        // [5.64, 0.1, 12.768688201904297],
    ] as [number, number, number][],
    forest: [
        [4.2, 0.1, -25],
        [-4.2, 0.1, -25],
        [3.9, 0.1, -19],
        [-3.9, 0.1, -19],
        [4, 0.1, -5],
        [-4, 0.1, -4],
        [0, 0.1, -10],
        [4, 0.1, 5],
        [-4, 0.1, 4],
        [10.8, 0.1, 10],
        [11.2, 0.1, 15.8],
        [-10.4, 0.1, 7.5],
        [-11.1, 0.1, 15.5],
    ] as [number, number, number][],
    winter: [
        [6.5, 0.3, -25],
        [-10, 0.3, -24.7],
        [-7, 0.3, -18],
        [3.6, 0.3, -18],
        [-10.5, 0.3, -11],
        [7, 0.3, -10.5],
        [7, 0.3, 0],
        [14, 0.3, 2],
        [-11.5, 0.3, 8],
        [9, 0.3, 8.5],
        [-8.5, 0.3, 18],
        [5, 0.3, 18],
        [-13.5, 0.3, 24.7],
        [10, 0.3, 24.7],
    ] as [number, number, number][],
    lava: [
        [-7.9717559814453125, 0.3, 14.692939758300781],
        [-10.693512916564941, 0.3, -26.959732055664062],
        [-8.4456787109375, 0.3, -0.522979736328125],
        [-0.5159873962402344, 0.3, -26.063919067382812],
        [-5.448331832885742, 0.3, -18.18609619140625],
        [-5.110391616821289, 0.3, -11.77816390991211],
        [-4.4046173095703125, 0.3, 24.684951782226562],
        [-9.512611389160156, 0.3, 6.874664306640625],
        [-1.3322467803955078, 0.3, -1.8963775634765625],
        [-1.0214557647705078, 0.3, 15.341323852539062],
        [6.30039119720459, 0.3, 14.46826171875],
        [7.553034782409668, 0.3, 6.8575439453125],
        [6.064409255981445, 0.3, -1.31390380859375],
        [6.050017356872559, 0.3, -11.656843185424805],
        [6.0035505294799805, 0.3, -18.754493713378906],
        [11.484609603881836, 0.3, -26.89056396484375],
        [5.920717239379883, 0.3, 24.551246643066406],
        [-18.172679901123047, 0.3, -0.7079014778137207],
        [16.111492156982422, 0.3, -0.7079014778137207],
    ] as [number, number, number][],
};

export const LEVEL_OBJECTS: LevelObject[][] = [
    // desert:
    [
        {
            name: "Hill_desert_001",
            url: "assets/glb/other/Hill_desert_001.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
        {
            name: "Mountain_desert_001",
            url: "assets/glb/other/Mountain_desert_001.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
        {
            name: "Mountain_desert_002",
            url: "assets/glb/other/Mountain_desert_002.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
    ],

    // desert2:
    [
        {
            name: "Hill_desert_001",
            url: "assets/glb/other/Hill_desert.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    // position: [15.2, 0, 13.4],
                    rotation: [0, 0, 0],
                    // rotation: [THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(162)],
                    scale: [1, 1, 1],
                },
            ],
        },
        {
            name: "Mountain_desert",
            url: "assets/glb/other/Mountain_desert.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
        {
            name: "Cactus_Flower_5",
            url: "assets/glb/other/Cactus_Flower_5.gltf",
            instances: [
                {
                    position: [-0.9715956920661353, 0, -2.205156654401401],
                    rotation: [0, -0.3, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [0.3170020644910606, 0, -3.223527018441432],
                    rotation: [0, 0.7, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-0.3234064705294956, 0, -5.187738022917099],
                    rotation: [0, 0.3, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-21.684582686539656, 3.667043585874767, -36.99834876811896],
                    rotation: [0, 0.46, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-18.077443845263527, 3.7153921547948774, -37.196506330805335],
                    rotation: [0, 1.3, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-21.69044910967062, 0, 37.97458105213804],
                    rotation: [0, 1.3, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-19.731727823520494, 0, 35.010801560845756],
                    rotation: [0, 1.65, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [21.42091246828719, 0, 29.919761677735657],
                    rotation: [0, 1.3, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
    ],

    // desert3:
    [
        {
            name: "Hill_desert_001",
            url: "assets/glb/other/Hill_desert_001.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
        {
            name: "Mountain_desert_001",
            url: "assets/glb/other/Mountain_desert_001.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
        {
            name: "Mountain_desert_002",
            url: "assets/glb/other/Mountain_desert_002.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
    ],

    // desert4:
    [
        {
            name: "Hill_desert_001",
            url: "assets/glb/other/Hill_desert.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    // position: [15.2, 0, 13.4],
                    rotation: [0, 0, 0],
                    // rotation: [THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(162)],
                    scale: [1, 1, 1],
                },
            ],
        },
        {
            name: "Mountain_desert",
            url: "assets/glb/other/Mountain_desert.glb",
            instances: [
                {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
        {
            name: "Cactus_Flower_5",
            url: "assets/glb/other/Cactus_Flower_5.gltf",
            instances: [
                {
                    position: [-0.9715956920661353, 0, -2.205156654401401],
                    rotation: [0, -0.3, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [0.3170020644910606, 0, -3.223527018441432],
                    rotation: [0, 0.7, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-0.3234064705294956, 0, -5.187738022917099],
                    rotation: [0, 0.3, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-21.684582686539656, 3.667043585874767, -36.99834876811896],
                    rotation: [0, 0.46, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-18.077443845263527, 3.7153921547948774, -37.196506330805335],
                    rotation: [0, 1.3, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-21.69044910967062, 0, 37.97458105213804],
                    rotation: [0, 1.3, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [-19.731727823520494, 0, 35.010801560845756],
                    rotation: [0, 1.65, 0],
                    scale: [1, 1, 1],
                },
                {
                    position: [21.42091246828719, 0, 29.919761677735657],
                    rotation: [0, 1.3, 0],
                    scale: [1, 1, 1],
                },
            ],
        },
    ],

    // forest

    [
        {
            name: "Windmill",
            url: "assets/glb/other/Windmill.gltf",
            instances: [
                { position: [4.96, 0, 26.3], rotation: [0, -0.79, 0], scale: [3, 3, 3] },
                { position: [0.7, 0, 22.7], rotation: [0, -0.59, 0], scale: [3, 3, 3] },
            ],
        },
        {
            name: "Temple",
            url: "assets/glb/other/Temple.gltf",
            instances: [{ position: [14, 0, -25.3], rotation: [0, -0.56, 0], scale: [3, 3, 3] }],
        },
        {
            name: "Logs",
            url: "assets/glb/other/Logs.gltf",
            instances: [
                { position: [14.5, 0.3, -12.2], rotation: [0, -0.71, 0], scale: [3, 3, 3] },
                { position: [17.6, 0.3, -5.63], rotation: [0, -0.64, 0], scale: [3, 3, 3] },
                { position: [15.38, 0.3, -8.87], rotation: [0, -0.39, 0], scale: [3, 3, 3] },
            ],
        },
        {
            name: "Storage",
            url: "assets/glb/other/Storage.gltf",
            instances: [{ position: [16.25, 0.3, -17.88], rotation: [0, -0.56, 0], scale: [3, 3, 3] }],
        },
        {
            name: "Mountain_Group_1",
            url: "assets/glb/other/Mountain_Group_1.gltf",
            instances: [
                {
                    position: [-15.012545585632324, 0, -25.88467025756836],
                    rotation: [0, 1.2041954477422578, 0],
                    scale: [4, 4, 4],
                },
            ],
        },
        {
            name: "Mountain_Group_2",
            url: "assets/glb/other/Mountain_Group_2.gltf",
            instances: [
                {
                    position: [-19.53233528137207, 0, -11.930508613586426],
                    rotation: [0, 0.7501188358858834, 0],
                    scale: [4, 4, 4],
                },
            ],
        },
        {
            name: "Mountain_Single",
            url: "assets/glb/other/Mountain_Single.gltf",
            instances: [
                {
                    position: [-18.89307403564453, 0, 0.9307221174240112],
                    rotation: [0, 0, 0],
                    scale: [4, 2, 4],
                },
            ],
        },
        {
            name: "MountainLarge_Single",
            url: "assets/glb/other/MountainLarge_Single.gltf",
            instances: [
                {
                    position: [-16.054481506347656, 0, -3.511462926864624],
                    rotation: [0, 0, 0],
                    scale: [4, 2, 4],
                },
            ],
        },
    ],

    [
        {
            name: "Windmill",
            url: "assets/glb/other/Windmill.gltf",
            instances: [
                { position: [4.96, 0, 26.3], rotation: [0, -0.79, 0], scale: [3, 3, 3] },
                { position: [0.7, 0, 22.7], rotation: [0, -0.59, 0], scale: [3, 3, 3] },
            ],
        },
        {
            name: "Temple",
            url: "assets/glb/other/Temple.gltf",
            instances: [{ position: [14, 0, -25.3], rotation: [0, -0.56, 0], scale: [3, 3, 3] }],
        },
        {
            name: "Logs",
            url: "assets/glb/other/Logs.gltf",
            instances: [
                { position: [14.5, 0.3, -12.2], rotation: [0, -0.71, 0], scale: [3, 3, 3] },
                { position: [17.6, 0.3, -5.63], rotation: [0, -0.64, 0], scale: [3, 3, 3] },
                { position: [15.38, 0.3, -8.87], rotation: [0, -0.39, 0], scale: [3, 3, 3] },
            ],
        },
        {
            name: "Storage",
            url: "assets/glb/other/Storage.gltf",
            instances: [{ position: [16.25, 0.3, -17.88], rotation: [0, -0.56, 0], scale: [3, 3, 3] }],
        },
        {
            name: "Mountain_Group_1",
            url: "assets/glb/other/Mountain_Group_1.gltf",
            instances: [
                {
                    position: [-15.012545585632324, 0, -25.88467025756836],
                    rotation: [0, 1.2041954477422578, 0],
                    scale: [4, 4, 4],
                },
            ],
        },
        {
            name: "Mountain_Group_2",
            url: "assets/glb/other/Mountain_Group_2.gltf",
            instances: [
                {
                    position: [-19.53233528137207, 0, -11.930508613586426],
                    rotation: [0, 0.7501188358858834, 0],
                    scale: [4, 4, 4],
                },
            ],
        },
        {
            name: "Mountain_Single",
            url: "assets/glb/other/Mountain_Single.gltf",
            instances: [
                {
                    position: [-18.89307403564453, 0, 0.9307221174240112],
                    rotation: [0, 0, 0],
                    scale: [4, 2, 4],
                },
            ],
        },
        {
            name: "MountainLarge_Single",
            url: "assets/glb/other/MountainLarge_Single.gltf",
            instances: [
                {
                    position: [-16.054481506347656, 0, -3.511462926864624],
                    rotation: [0, 0, 0],
                    scale: [4, 2, 4],
                },
            ],
        },
    ],

    [
        {
            name: "Windmill",
            url: "assets/glb/other/Windmill.gltf",
            instances: [
                { position: [4.96, 0, 26.3], rotation: [0, -0.79, 0], scale: [3, 3, 3] },
                { position: [0.7, 0, 22.7], rotation: [0, -0.59, 0], scale: [3, 3, 3] },
            ],
        },
        {
            name: "Temple",
            url: "assets/glb/other/Temple.gltf",
            instances: [{ position: [14, 0, -25.3], rotation: [0, -0.56, 0], scale: [3, 3, 3] }],
        },
        {
            name: "Logs",
            url: "assets/glb/other/Logs.gltf",
            instances: [
                { position: [14.5, 0.3, -12.2], rotation: [0, -0.71, 0], scale: [3, 3, 3] },
                { position: [17.6, 0.3, -5.63], rotation: [0, -0.64, 0], scale: [3, 3, 3] },
                { position: [15.38, 0.3, -8.87], rotation: [0, -0.39, 0], scale: [3, 3, 3] },
            ],
        },
        {
            name: "Storage",
            url: "assets/glb/other/Storage.gltf",
            instances: [{ position: [16.25, 0.3, -17.88], rotation: [0, -0.56, 0], scale: [3, 3, 3] }],
        },
        {
            name: "Mountain_Group_1",
            url: "assets/glb/other/Mountain_Group_1.gltf",
            instances: [
                {
                    position: [-15.012545585632324, 0, -25.88467025756836],
                    rotation: [0, 1.2041954477422578, 0],
                    scale: [4, 4, 4],
                },
            ],
        },
        {
            name: "Mountain_Group_2",
            url: "assets/glb/other/Mountain_Group_2.gltf",
            instances: [
                {
                    position: [-19.53233528137207, 0, -11.930508613586426],
                    rotation: [0, 0.7501188358858834, 0],
                    scale: [4, 4, 4],
                },
            ],
        },
        {
            name: "Mountain_Single",
            url: "assets/glb/other/Mountain_Single.gltf",
            instances: [
                {
                    position: [-18.89307403564453, 0, 0.9307221174240112],
                    rotation: [0, 0, 0],
                    scale: [4, 2, 4],
                },
            ],
        },
        {
            name: "MountainLarge_Single",
            url: "assets/glb/other/MountainLarge_Single.gltf",
            instances: [
                {
                    position: [-16.054481506347656, 0, -3.511462926864624],
                    rotation: [0, 0, 0],
                    scale: [4, 2, 4],
                },
            ],
        },
    ],

    [
        {
            name: "Windmill",
            url: "assets/glb/other/Windmill.gltf",
            instances: [
                { position: [4.96, 0, 26.3], rotation: [0, -0.79, 0], scale: [3, 3, 3] },
                { position: [0.7, 0, 22.7], rotation: [0, -0.59, 0], scale: [3, 3, 3] },
            ],
        },
        {
            name: "Temple",
            url: "assets/glb/other/Temple.gltf",
            instances: [{ position: [14, 0, -25.3], rotation: [0, -0.56, 0], scale: [3, 3, 3] }],
        },
        {
            name: "Logs",
            url: "assets/glb/other/Logs.gltf",
            instances: [
                { position: [14.5, 0.3, -12.2], rotation: [0, -0.71, 0], scale: [3, 3, 3] },
                { position: [17.6, 0.3, -5.63], rotation: [0, -0.64, 0], scale: [3, 3, 3] },
                { position: [15.38, 0.3, -8.87], rotation: [0, -0.39, 0], scale: [3, 3, 3] },
            ],
        },
        {
            name: "Storage",
            url: "assets/glb/other/Storage.gltf",
            instances: [{ position: [16.25, 0.3, -17.88], rotation: [0, -0.56, 0], scale: [3, 3, 3] }],
        },
        {
            name: "Mountain_Group_1",
            url: "assets/glb/other/Mountain_Group_1.gltf",
            instances: [
                {
                    position: [-15.012545585632324, 0, -25.88467025756836],
                    rotation: [0, 1.2041954477422578, 0],
                    scale: [4, 4, 4],
                },
            ],
        },
        {
            name: "Mountain_Group_2",
            url: "assets/glb/other/Mountain_Group_2.gltf",
            instances: [
                {
                    position: [-19.53233528137207, 0, -11.930508613586426],
                    rotation: [0, 0.7501188358858834, 0],
                    scale: [4, 4, 4],
                },
            ],
        },
        {
            name: "Mountain_Single",
            url: "assets/glb/other/Mountain_Single.gltf",
            instances: [
                {
                    position: [-18.89307403564453, 0, 0.9307221174240112],
                    rotation: [0, 0, 0],
                    scale: [4, 2, 4],
                },
            ],
        },
        {
            name: "MountainLarge_Single",
            url: "assets/glb/other/MountainLarge_Single.gltf",
            instances: [
                {
                    position: [-16.054481506347656, 0, -3.511462926864624],
                    rotation: [0, 0, 0],
                    scale: [4, 2, 4],
                },
            ],
        },
    ],

    // winter

    [
        {
            name: "Windmill",
            url: "assets/glb/other/Windmill.gltf",
            instances: [{ position: [14, 0, -21], rotation: [0, -0.59, 0], scale: [4, 4, 4] }],
        },
        {
            name: "Mine",
            url: "assets/glb/other/Mine.gltf",
            instances: [{ position: [-19, 0, -16], rotation: [0, 0.29, 0], scale: [5, 5, 5] }],
        },
        {
            name: "Houses",
            url: "assets/glb/other/Houses.gltf",
            instances: [
                { position: [-16, 0, -6.3], rotation: [0, -0.2, 0], scale: [4, 4, 4] },
                { position: [-12, 0, -0.3], rotation: [0, 0.2, 0], scale: [4, 4, 4] },
            ],
        },
        {
            name: "MountainLarge_Single",
            url: "assets/glb/other/MountainLarge_Single.gltf",
            instances: [
                { position: [17, 0, -30], rotation: [0, 0, 0], scale: [5, 3, 5] },
                { position: [20, 0, -27], rotation: [0, 0, 0], scale: [5, 4, 5] },
                { position: [20, 0, -30], rotation: [0, 0, 0], scale: [5, 5, 5] },
            ],
        },
    ],

    [
        {
            name: "Windmill",
            url: "assets/glb/other/Windmill.gltf",
            instances: [{ position: [14, 0, -21], rotation: [0, -0.59, 0], scale: [4, 4, 4] }],
        },
        {
            name: "Mine",
            url: "assets/glb/other/Mine.gltf",
            instances: [{ position: [-19, 0, -16], rotation: [0, 0.29, 0], scale: [5, 5, 5] }],
        },
        {
            name: "Houses",
            url: "assets/glb/other/Houses.gltf",
            instances: [
                { position: [-16, 0, -6.3], rotation: [0, -0.2, 0], scale: [4, 4, 4] },
                { position: [-12, 0, -0.3], rotation: [0, 0.2, 0], scale: [4, 4, 4] },
            ],
        },
        {
            name: "MountainLarge_Single",
            url: "assets/glb/other/MountainLarge_Single.gltf",
            instances: [
                { position: [17, 0, -30], rotation: [0, 0, 0], scale: [5, 3, 5] },
                { position: [20, 0, -27], rotation: [0, 0, 0], scale: [5, 4, 5] },
                { position: [20, 0, -30], rotation: [0, 0, 0], scale: [5, 5, 5] },
            ],
        },
    ],

    [
        {
            name: "Windmill",
            url: "assets/glb/other/Windmill.gltf",
            instances: [{ position: [14, 0, -21], rotation: [0, -0.59, 0], scale: [4, 4, 4] }],
        },
        {
            name: "Mine",
            url: "assets/glb/other/Mine.gltf",
            instances: [{ position: [-19, 0, -16], rotation: [0, 0.29, 0], scale: [5, 5, 5] }],
        },
        {
            name: "Houses",
            url: "assets/glb/other/Houses.gltf",
            instances: [
                { position: [-16, 0, -6.3], rotation: [0, -0.2, 0], scale: [4, 4, 4] },
                { position: [-12, 0, -0.3], rotation: [0, 0.2, 0], scale: [4, 4, 4] },
            ],
        },
        {
            name: "MountainLarge_Single",
            url: "assets/glb/other/MountainLarge_Single.gltf",
            instances: [
                { position: [17, 0, -30], rotation: [0, 0, 0], scale: [5, 3, 5] },
                { position: [20, 0, -27], rotation: [0, 0, 0], scale: [5, 4, 5] },
                { position: [20, 0, -30], rotation: [0, 0, 0], scale: [5, 5, 5] },
            ],
        },
    ],

    [
        {
            name: "Windmill",
            url: "assets/glb/other/Windmill.gltf",
            instances: [{ position: [14, 0, -21], rotation: [0, -0.59, 0], scale: [4, 4, 4] }],
        },
        {
            name: "Mine",
            url: "assets/glb/other/Mine.gltf",
            instances: [{ position: [-19, 0, -16], rotation: [0, 0.29, 0], scale: [5, 5, 5] }],
        },
        {
            name: "Houses",
            url: "assets/glb/other/Houses.gltf",
            instances: [
                { position: [-16, 0, -6.3], rotation: [0, -0.2, 0], scale: [4, 4, 4] },
                { position: [-12, 0, -0.3], rotation: [0, 0.2, 0], scale: [4, 4, 4] },
            ],
        },
        {
            name: "MountainLarge_Single",
            url: "assets/glb/other/MountainLarge_Single.gltf",
            instances: [
                { position: [17, 0, -30], rotation: [0, 0, 0], scale: [5, 3, 5] },
                { position: [20, 0, -27], rotation: [0, 0, 0], scale: [5, 4, 5] },
                { position: [20, 0, -30], rotation: [0, 0, 0], scale: [5, 5, 5] },
            ],
        },
    ],
    // lava
    [
        {
            name: "Fountain_00",
            url: "assets/glb/other/Fountain_00.glb",
            instances: [{ position: [-1, 0, 7.5], rotation: [0, 0.7, 0], scale: [1, 1, 1] }],
        },
        {
            name: "Tavern",
            url: "assets/glb/other/Tavern.glb",
            instances: [{ position: [-22, 0, -14], rotation: [0, -Math.PI, 0], scale: [0.85, 0.85, 0.85] }],
        },
        {
            name: "Statue_01",
            url: "assets/glb/other/Statue_01.glb",
            instances: [
                { position: [17.3, 0, 15.5], rotation: [0, 0.7, 0], scale: [1, 1, 1] },
                { position: [-17.3, 0, 25.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
                { position: [-21, 0, 25.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
                { position: [-19, 0, 28.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
            ],
        },
    ],
    [
        {
            name: "Fountain_00",
            url: "assets/glb/other/Fountain_00.glb",
            instances: [{ position: [-1, 0, 7.5], rotation: [0, 0.7, 0], scale: [1, 1, 1] }],
        },
        {
            name: "Tavern",
            url: "assets/glb/other/Tavern.glb",
            instances: [{ position: [-22, 0, -14], rotation: [0, -Math.PI, 0], scale: [0.85, 0.85, 0.85] }],
        },
        {
            name: "Statue_01",
            url: "assets/glb/other/Statue_01.glb",
            instances: [
                { position: [17.3, 0, 15.5], rotation: [0, 0.7, 0], scale: [1, 1, 1] },
                { position: [-17.3, 0, 25.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
                { position: [-21, 0, 25.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
                { position: [-19, 0, 28.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
            ],
        },
    ],
    [
        {
            name: "Fountain_00",
            url: "assets/glb/other/Fountain_00.glb",
            instances: [{ position: [-1, 0, 7.5], rotation: [0, 0.7, 0], scale: [1, 1, 1] }],
        },
        {
            name: "Tavern",
            url: "assets/glb/other/Tavern.glb",
            instances: [{ position: [-22, 0, -14], rotation: [0, -Math.PI, 0], scale: [0.85, 0.85, 0.85] }],
        },
        {
            name: "Statue_01",
            url: "assets/glb/other/Statue_01.glb",
            instances: [
                { position: [17.3, 0, 15.5], rotation: [0, 0.7, 0], scale: [1, 1, 1] },
                { position: [-17.3, 0, 25.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
                { position: [-21, 0, 25.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
                { position: [-19, 0, 28.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
            ],
        },
    ],
    [
        {
            name: "Fountain_00",
            url: "assets/glb/other/Fountain_00.glb",
            instances: [{ position: [-1, 0, 7.5], rotation: [0, 0.7, 0], scale: [1, 1, 1] }],
        },
        {
            name: "Tavern",
            url: "assets/glb/other/Tavern.glb",
            instances: [{ position: [-22, 0, -14], rotation: [0, -Math.PI, 0], scale: [0.85, 0.85, 0.85] }],
        },
        {
            name: "Statue_01",
            url: "assets/glb/other/Statue_01.glb",
            instances: [
                { position: [17.3, 0, 15.5], rotation: [0, 0.7, 0], scale: [1, 1, 1] },
                { position: [-17.3, 0, 25.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
                { position: [-21, 0, 25.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
                { position: [-19, 0, 28.5], rotation: [0, -0.7, 0], scale: [1, 1, 1] },
            ],
        },
    ],
];

// enemyChar, pathIdx, spawnAt, xOffset
export const STAGE_WAVES_DATA: [string, number, number, number][][][] = [
    /****************************************************/
    /********************** DESERT **********************/
    /****************************************************/
    // stage 01
    [
        // wave 1
        [...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0)],
        // wave 2
        [...waveSegment(EnemyChar.Alien, 5, 6, 0, 0)],
        // wave 3
        [...waveSegment(EnemyChar.Alien, 5, 6, 0, 0), ...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0)],
    ],

    // stage 02
    [
        // wave 1
        [...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0), ...waveSegment(EnemyChar.Tribal, 3, 5, 2.5, 2)],
        // wave 2
        [...waveSegment(EnemyChar.Squidle, 5, 6, 0, 2), ...waveSegment(EnemyChar.Tribal, 6, 5, 2.5, 1)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Alien, 5, 6, 0, 0),
            ...waveSegment(EnemyChar.Squidle, 5, 5, 0, 1),
            ...waveSegment(EnemyChar.Squidle, 5, 5, 0, 3),
        ],
    ],

    // stage 03
    [
        // wave 1
        [...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0)],
        // wave 2
        [...waveSegment(EnemyChar.Alien, 5, 6, 0, 0)],
        // wave 3
        [...waveSegment(EnemyChar.Alien, 5, 6, 0, 0), ...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0)],
    ],

    // stage 04
    [
        // wave 1
        [...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0)],
        // wave 2
        [...waveSegment(EnemyChar.Alien, 5, 6, 0, 0)],
        // wave 3
        [...waveSegment(EnemyChar.Alien, 5, 6, 0, 0), ...waveSegment(EnemyChar.Squidle, 5, 5, 0, 0)],
    ],

    /****************************************************/
    /********************** FOREST **********************/
    /****************************************************/

    // stage 05 - FOREST
    [
        // wave 1
        // count, interval, spawn_at, path

        [
            ...waveSegment(EnemyChar.Dino, 8, 4, 0, 0),
            ...waveSegment(EnemyChar.Bee, 3, 1, 0, 1),
            ...waveSegment(EnemyChar.Bee, 3, 1, 12, 1),
            ...waveSegment(EnemyChar.Bee, 3, 1, 24, 1),
            ...waveSegment(EnemyChar.Tribal, 2, 5, 4, 2),
        ],

        [
            ...waveSegment(EnemyChar.Dino, 10, 7, 3, 0),
            ...waveSegment(EnemyChar.Bee, 10, 4.6, 0, 1),
            ...waveSegment(EnemyChar.Tribal, 4, 4, 0, 2),
        ],

        [
            ...waveSegment(EnemyChar.Dino, 10, 2.5, 0, 0),
            ...waveSegment(EnemyChar.Bee, 10, 4.2, 0, 3),
            ...waveSegment(EnemyChar.Ninja, 6, 6, 6, 1),
            ...waveSegment(EnemyChar.Demon, 6, 6, 6, 2),
            // ...waveSegment(EnemyChar.DemonBoss, 1, 4, 0, 1),
        ],
    ],

    // stage 06 - FOREST
    [
        // wave 1
        [...waveSegment(EnemyChar.Bee, 6, 6, 0, 0), ...waveSegment(EnemyChar.Bee, 6, 6, 0, 2)],
        // [...waveSegment(EnemyChar.Spider, 1.4, 30, 0, 0), ...waveSegment(EnemyChar.Bee, 6, 6, 0, 2)],
        // wave 2
        [...waveSegment(EnemyChar.Dino, 3.2, 7), ...waveSegment(EnemyChar.Spider)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 2, 2, 0, 2, []),
            ...waveSegment(EnemyChar.Orc, 2, 2, 6, 0, []),
            ...waveSegment(EnemyChar.Orc, 2, 2, 12, 3),
            ...waveSegment(EnemyChar.Orc, 2, 2, 18, 1),
            ...waveSegment(EnemyChar.Spider, 2, 8, 0, 0),
            ...waveSegment(EnemyChar.Bee, 2, 8, 8, 1),
            ...waveSegment(EnemyChar.Spider, 2, 8, 16, 2),
            ...waveSegment(EnemyChar.Bee, 2, 8, 24, 3),
        ],
        [...waveSegment(EnemyChar.Tribal, 4, 6, 0, 3), ...waveSegment(EnemyChar.Spider, 0.8, 20, 10, 1)],
        // wave 4
        [...waveSegment(EnemyChar.Orc, 1, 1, 0, 2), ...waveSegment(EnemyChar.Spider, 1.5, 40, 0, 0)],
    ],

    // stage 07 - FOREST
    [
        // wave 1
        waveSegment(EnemyChar.Spider, 1.4, 30, 0, 3),
        // wave 2
        [...waveSegment(EnemyChar.Tribal, 3.2, 7), ...waveSegment(EnemyChar.Spider)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 2, 2, 0, 2, []),
            ...waveSegment(EnemyChar.Orc, 2, 2, 6, 0, []),
            ...waveSegment(EnemyChar.Orc, 2, 2, 12, 3),
            ...waveSegment(EnemyChar.Orc, 2, 2, 18, 1),
            ...waveSegment(EnemyChar.Spider, 2, 8, 0, 0),
            ...waveSegment(EnemyChar.Bee, 2, 8, 8, 1),
            ...waveSegment(EnemyChar.Spider, 2, 8, 16, 2),
            ...waveSegment(EnemyChar.Bee, 2, 8, 24, 3),
        ],
        [...waveSegment(EnemyChar.Tribal, 4, 6, 0, 3), ...waveSegment(EnemyChar.Spider, 0.8, 20, 10, 1)],
        // wave 4
        [...waveSegment(EnemyChar.Orc, 1, 1, 0, 2), ...waveSegment(EnemyChar.Spider, 1.5, 40, 0, 0)],
    ],
    // stage 08 - FOREST
    [
        // wave 1
        [
            ...waveSegment(EnemyChar.Spider, 10, 2.8, 0, 0),
            ...waveSegment(EnemyChar.Spider, 10, 2.8, 0, 2),
            ...waveSegment(EnemyChar.Spider, 10, 2.8, 28, 1),
            ...waveSegment(EnemyChar.Spider, 10, 2.8, 28, 3),
        ],
        // wave 2
        [...waveSegment(EnemyChar.Tribal, 7, 3.2, 0, 2), ...waveSegment(EnemyChar.Spider, 20, 2, 0, 0)],
        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 3, 8, 0, 1, []),
            ...waveSegment(EnemyChar.Orc, 3, 8, 6, 1, []),
            ...waveSegment(EnemyChar.Orc, 3, 8, 12, 2),
            ...waveSegment(EnemyChar.Wizard, 3, 8, 18, 3),
            ...waveSegment(EnemyChar.Spider, 2, 10, 0, 0),
            ...waveSegment(EnemyChar.Bee, 2, 10, 8, 1),
            ...waveSegment(EnemyChar.Spider, 2, 10, 16, 2),
            ...waveSegment(EnemyChar.Bee, 2, 10, 24, 3),
        ],
        [...waveSegment(EnemyChar.Tribal, 4, 6, 0, 3), ...waveSegment(EnemyChar.Spider, 0.8, 20, 10, 1)],
        // wave 4
        [...waveSegment(EnemyChar.Orc, 1, 1, 0, 2), ...waveSegment(EnemyChar.Spider, 1.5, 40, 0, 0)],
    ],

    /****************************************************/
    /********************** WINTER **********************/
    /****************************************************/

    // stage 09
    [
        // wave 1
        [...waveSegment(EnemyChar.Orc, 6, 5, 5, 0), ...waveSegment(EnemyChar.Spider, 20, 2.8, 0, 2)],
        // wave 2
        [...waveSegment(EnemyChar.Orc, 8, 5, 5, 0), ...waveSegment(EnemyChar.Spider, 30, 2, 0, 2)],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 10, 5, 5, 0),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Spider, 35, 2, 0, 2),
        ],

        // wave 4
        [
            ...waveSegment(EnemyChar.Orc, 15, 4, 5, 0),
            ...waveSegment(EnemyChar.Bee, 15, 4, 5, 1),
            ...waveSegment(EnemyChar.Spider, 42, 2, 0, 2),
        ],
    ],
    // stage 10
    [
        // wave 1
        [...waveSegment(EnemyChar.Orc, 6, 5, 5, 0), ...waveSegment(EnemyChar.Spider, 20, 2.8, 0, 2)],
        // wave 2
        [...waveSegment(EnemyChar.Orc, 8, 5, 5, 0), ...waveSegment(EnemyChar.Spider, 30, 2, 0, 2)],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 10, 5, 5, 0),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Spider, 35, 2, 0, 2),
        ],

        // wave 4
        [
            ...waveSegment(EnemyChar.Orc, 15, 4, 5, 0),
            ...waveSegment(EnemyChar.Bee, 15, 4, 5, 1),
            ...waveSegment(EnemyChar.Spider, 42, 2, 0, 2),
        ],
    ],
    // stage 11
    [
        // wave 1
        [...waveSegment(EnemyChar.Orc, 6, 5, 5, 0), ...waveSegment(EnemyChar.Spider, 20, 2.8, 0, 2)],
        // wave 2
        [...waveSegment(EnemyChar.Orc, 8, 5, 5, 0), ...waveSegment(EnemyChar.Spider, 30, 2, 0, 2)],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 10, 5, 5, 0),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Spider, 35, 2, 0, 2),
        ],

        // wave 4
        [
            ...waveSegment(EnemyChar.Orc, 15, 4, 5, 0),
            ...waveSegment(EnemyChar.Bee, 15, 4, 5, 1),
            ...waveSegment(EnemyChar.Spider, 42, 2, 0, 2),
        ],
    ],
    // stage 12
    [
        // wave 1
        [...waveSegment(EnemyChar.Orc, 6, 5, 5, 0), ...waveSegment(EnemyChar.Spider, 20, 2.8, 0, 2)],
        // wave 2
        [...waveSegment(EnemyChar.Orc, 8, 5, 5, 0), ...waveSegment(EnemyChar.Spider, 30, 2, 0, 2)],

        // wave 3
        [
            ...waveSegment(EnemyChar.Orc, 10, 5, 5, 0),
            ...waveSegment(EnemyChar.Bee, 10, 5, 5, 1),
            ...waveSegment(EnemyChar.Spider, 35, 2, 0, 2),
        ],

        // wave 4
        [
            ...waveSegment(EnemyChar.Orc, 15, 4, 5, 0),
            ...waveSegment(EnemyChar.Bee, 15, 4, 5, 1),
            ...waveSegment(EnemyChar.Spider, 42, 2, 0, 2),
        ],
    ],

    /****************************************************/
    /*********************** LAVA ***********************/
    /****************************************************/

    // stage 13
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        [...waveSegment(EnemyChar.Orc, 2), ...waveSegment(EnemyChar.Spider, 1.6, 20, 10)],
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 14
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Ninja, 3),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 15
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Ninja, 3),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
    ],
    // stage 16
    [
        // wave 1
        waveSegment(EnemyChar.Spider),
        // wave 2
        waveSegment(EnemyChar.Ninja, 3),
        // wave 3
        [...waveSegment(EnemyChar.Tribal, 2), ...waveSegment(EnemyChar.Spider)],
        // wave 4
        [...waveSegment(EnemyChar.Demon, 2), ...waveSegment(EnemyChar.Spider, 0.8, 20)],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 20),
        ],
        // wave 5
        [
            ...waveSegment(EnemyChar.Ninja, 3),
            ...waveSegment(EnemyChar.Demon, 2, 10, 22),
            ...waveSegment(EnemyChar.Spider, 0.8, 50),
        ],
        // wave 6
        [
            ...waveSegment(EnemyChar.Demon, 2),
            ...waveSegment(EnemyChar.Tribal, 2, 10, 22),
            ...waveSegment(EnemyChar.Ninja, 3, 10, 44),
            ...waveSegment(EnemyChar.Spider, 1.5, 100, 0, 0, [-1, 1]),
        ],
        [...waveSegment(EnemyChar.Orc, 1, 1), ...waveSegment(EnemyChar.Spider, 1.5, 40)],
    ],
];

export const GAME_LEVELS: GameLevel[] = [
    {
        area: GameArea.Desert,
        level: 0,
        initialGold: 250,
        mapURL: mapURLs.desert,
        paths: desertLevelPaths00,
        waves: STAGE_WAVES_DATA[0],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert,
    },
    {
        area: GameArea.Desert,
        level: 1,
        // initialGold: 260,
        initialGold: 4060,
        mapURL: mapURLs.desert,
        paths: desertLevelPaths01,
        waves: STAGE_WAVES_DATA[1],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert2,
    },
    {
        area: GameArea.Desert,
        level: 2,
        initialGold: 270,
        mapURL: mapURLs.desert,
        paths: desertLevelPaths00,
        waves: STAGE_WAVES_DATA[2],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert,
    },
    {
        area: GameArea.Desert,
        level: 3,
        initialGold: 280,
        mapURL: mapURLs.desert,
        paths: desertLevelPaths01,
        waves: STAGE_WAVES_DATA[3],
        initialCamPos: [0, 40, 62],
        cameraBounds: mediumBounds,
        towerBasePositions: towerBasePositions.desert2,
    },
    {
        area: GameArea.Forest,
        level: 4,
        initialGold: 320,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[4],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
    },
    {
        area: GameArea.Forest,
        level: 5,
        initialGold: 340,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[5],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
    },
    {
        area: GameArea.Forest,
        level: 6,
        // initialGold: 360,
        initialGold: 3800,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[6],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
    },
    {
        area: GameArea.Forest,
        level: 7,
        // initialGold: 380,
        initialGold: 3800,
        mapURL: mapURLs.forest,
        paths: forestLevelPaths,
        waves: STAGE_WAVES_DATA[7],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.forest,
    },
    {
        area: GameArea.Winter,
        level: 8,
        initialGold: 400,
        mapURL: mapURLs.winter,
        paths: winterLevelPaths,
        waves: STAGE_WAVES_DATA[8],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
    },
    {
        area: GameArea.Winter,
        level: 9,
        initialGold: 420,
        mapURL: mapURLs.winter,
        paths: winterLevelPaths,
        waves: STAGE_WAVES_DATA[9],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
    },
    {
        area: GameArea.Winter,
        level: 10,
        initialGold: 440,
        mapURL: mapURLs.winter,
        paths: winterLevelPaths,
        waves: STAGE_WAVES_DATA[10],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
    },
    {
        area: GameArea.Winter,
        level: 11,
        initialGold: 460,
        mapURL: mapURLs.winter,
        paths: winterLevelPaths,
        waves: STAGE_WAVES_DATA[11],
        initialCamPos: [0, 60, 60],
        cameraBounds: largeBounds,
        towerBasePositions: towerBasePositions.winter,
    },
    {
        area: GameArea.Lava,
        level: 12,
        initialGold: 480,
        mapURL: mapURLs.lava,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[12],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
    },
    {
        area: GameArea.Lava,
        level: 13,
        initialGold: 500,
        mapURL: mapURLs.lava,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[13],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
    },
    {
        area: GameArea.Lava,
        level: 14,
        initialGold: 520,
        mapURL: mapURLs.lava,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[14],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
    },
    {
        area: GameArea.Lava,
        level: 15,
        initialGold: 550,
        mapURL: mapURLs.lava,
        paths: lavaLevelPaths,
        waves: STAGE_WAVES_DATA[15],
        initialCamPos: [0, 60, 60],
        cameraBounds: smallBounds,
        towerBasePositions: towerBasePositions.lava,
    },
];

function waveSegment(
    e: EnemyChar,
    enemyCount = 4,
    interval = 2,
    startSpawningAt = 0,
    pathIdx = 0,
    xOffList = [0]
): [EnemyChar, number, number, number][] {
    // console.log("waveSegment", { e, enemyCount, interval, startSpawningAt, xOffList });

    return Array.from({ length: enemyCount }, (_, index) => [
        e,
        pathIdx,
        index * interval + startSpawningAt,
        xOffList[index % xOffList.length],
    ]);
}
