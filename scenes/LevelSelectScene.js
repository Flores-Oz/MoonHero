export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super("LevelSelectScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x111827);

    this.add.text(width / 2, 120, "SELECCIÓN DE NIVELES", {
      fontSize: "56px",
      color: "#ffffff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    const levels = [
      {
        id: 1,
        name: "Promise",
        video: "assets/video/Promise.mp4",
        audio: "assets/audio/promise.wav",
        chart: [
          { time: 1000, lane: 0 },
          { time: 1600, lane: 1 },
          { time: 2200, lane: 2 },
          { time: 2800, lane: 3 },

          { time: 3600, lane: 0 },
          { time: 4200, lane: 1 },
          { time: 4800, lane: 2 },
          { time: 5400, lane: 3 },

          { time: 6200, lane: 0 },
          { time: 6800, lane: 2 },
          { time: 7400, lane: 1 },
          { time: 8000, lane: 3 },

          { time: 9000, lane: 0 },
          { time: 9800, lane: 1 },
          { time: 10600, lane: 2 },
          { time: 11400, lane: 3 }
        ]
      },
      {
        id: 2,
        name: "Miku",
        video: "assets/video/Miku.mp4",
        audio: "assets/audio/miku.wav",
        chart: [
          { time: 1000, lane: 0 },
          { time: 1600, lane: 1 },
          { time: 2200, lane: 2 },
          { time: 2800, lane: 3 },

          { time: 3600, lane: 1 },
          { time: 4200, lane: 0 },
          { time: 4800, lane: 2 },
          { time: 5400, lane: 3 },

          { time: 3800, lane: 0 },
          { time: 4200, lane: 2 },
          { time: 4600, lane: 1 },
          { time: 8000, lane: 3 },

          { time: 6200, lane: 0 },
          { time: 6800, lane: 1 },
          { time: 7400, lane: 2 },
          { time: 6600, lane: 3 },

          { time: 9000, lane: 1 },
          { time: 9800, lane: 2 },
          { time: 10600, lane: 0 },
          { time: 11400, lane: 3 }
        ]
      },
      {
        id: 3,
        name: "Electric Angel",
        video: "assets/video/ElectricAngel.mp4",
        audio: "assets/audio/electric.wav",
        chart: [
          { time: 900, lane: 0 },
          { time: 1200, lane: 2 },
          { time: 1500, lane: 1 },
          { time: 1800, lane: 3 },

          { time: 2100, lane: 0 },
          { time: 2400, lane: 1 },
          { time: 2700, lane: 2 },
          { time: 3000, lane: 3 },

          { time: 3400, lane: 1 },
          { time: 3800, lane: 0 },
          { time: 4200, lane: 2 },
          { time: 4600, lane: 3 },

          { time: 5000, lane: 0 },
          { time: 5300, lane: 2 },
          { time: 5600, lane: 1 },
          { time: 5900, lane: 3 },

          { time: 6200, lane: 0 },
          { time: 6500, lane: 1 },
          { time: 6800, lane: 2 },
          { time: 7100, lane: 3 }
        ]
      }
    ];

    levels.forEach((level, index) => {
      const y = 300 + (index * 140);

      const btn = this.add.rectangle(width / 2, y, 520, 90, 0x1d4ed8)
        .setInteractive({ useHandCursor: true });

      this.add.text(width / 2, y, level.name, {
        fontSize: "34px",
        color: "#ffffff",
        fontStyle: "bold"
      }).setOrigin(0.5);

      btn.on("pointerover", () => btn.setFillStyle(0x2563eb));
      btn.on("pointerout", () => btn.setFillStyle(0x1d4ed8));

      btn.on("pointerdown", () => {
        this.scene.start("GameScene", { levelData: level });
      });
    });

    const back = this.add.text(80, 60, "← Volver", {
      fontSize: "30px",
      color: "#ffffff",
      backgroundColor: "#334155",
      padding: { x: 14, y: 8 }
    }).setInteractive({ useHandCursor: true });

    back.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}