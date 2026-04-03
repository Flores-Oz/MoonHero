import level1Chart from "./charts/level1Chart.js";
import level2Chart from "./charts/level2Chart.js";
import level3Chart from "./charts/level3Chart.js";

const LEVELS = [
  {
    id: 0,
    key: "level1",
    name: "Nivel 1",
    videoKey: "bgVideo1",
    musicKey: "song1",
    chart: level1Chart,
    unlocked: true,
  },
  {
    id: 1,
    key: "level2",
    name: "Nivel 2",
    videoKey: "bgVideo2",
    musicKey: "song2",
    chart: level2Chart,
    unlocked: true,
  },
  {
    id: 2,
    key: "level3",
    name: "Nivel 3",
    videoKey: "bgVideo3",
    musicKey: "song3",
    chart: level3Chart,
    unlocked: true,
  },
];

export default LEVELS;