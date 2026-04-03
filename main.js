import BootScene from "./scenes/BootScene.js";
import MenuScene from "./scenes/MenuScene.js";
import LevelSelectScene from "./scenes/LevelSelectScene.js";
import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  backgroundColor: "#050816",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
  },
  scene: [BootScene, MenuScene, LevelSelectScene, GameScene],
};

new Phaser.Game(config);