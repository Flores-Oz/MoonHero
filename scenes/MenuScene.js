export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x0b1020);

    this.add.text(width / 2, 170, "MOON HERO", {
      fontSize: "72px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(width / 2, 250, "Rhythm Game Prototype", {
      fontSize: "30px",
      color: "#cbd5e1"
    }).setOrigin(0.5);

    const playBtn = this.add.rectangle(width / 2, 470, 340, 95, 0x2563eb)
      .setInteractive({ useHandCursor: true });

    this.add.text(width / 2, 470, "JUGAR", {
      fontSize: "38px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    playBtn.on("pointerover", () => playBtn.setFillStyle(0x3b82f6));
    playBtn.on("pointerout", () => playBtn.setFillStyle(0x2563eb));

    playBtn.on("pointerdown", () => {
      this.scene.start("LevelSelectScene");
    });

    this.add.text(width / 2, 940, "A S D F para tocar las notas", {
      fontSize: "28px",
      color: "#94a3b8"
    }).setOrigin(0.5);
  }
}