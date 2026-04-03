function generatePatternSection(startTime, endTime, interval, pattern) {
  const chart = [];
  let time = startTime;
  let index = 0;

  while (time <= endTime) {
    chart.push({
      time,
      lane: pattern[index % pattern.length]
    });

    time += interval;
    index++;
  }

  return chart;
}

function buildPromiseChart() {
  return [
    ...generatePatternSection(0, 30000, 850, [0, 1, 2, 3]),
    ...generatePatternSection(32000, 65000, 800, [0, 2, 1, 3]),
    ...generatePatternSection(68000, 100000, 750, [0, 1, 0, 1, 2, 3]),
    ...generatePatternSection(103000, 135000, 800, [3, 2, 1, 0]),
    ...generatePatternSection(138000, 170000, 700, [0, 1, 2, 1, 0, 2, 3, 2])
  ];
}

function buildMikuChart() {
  return [
    ...generatePatternSection(0, 40000, 800, [0, 1, 2, 3]),
    ...generatePatternSection(43000, 90000, 750, [0, 2, 1, 3]),
    ...generatePatternSection(93000, 140000, 700, [0, 1, 0, 2, 1, 3]),
    ...generatePatternSection(143000, 190000, 750, [3, 2, 1, 0]),
    ...generatePatternSection(193000, 240000, 680, [0, 1, 2, 1, 0, 2, 3, 2])
  ];
}

function buildElectricAngelChart() {
  return [
    ...generatePatternSection(0, 35000, 780, [0, 1, 2, 3]),
    ...generatePatternSection(38000, 80000, 720, [0, 2, 1, 3]),
    ...generatePatternSection(83000, 125000, 680, [0, 1, 0, 2, 1, 3]),
    ...generatePatternSection(128000, 160000, 720, [3, 2, 1, 0]),
    ...generatePatternSection(163000, 193000, 650, [0, 1, 2, 1, 0, 2, 3, 2])
  ];
}

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
        chart: buildPromiseChart()
      },
      {
        id: 2,
        name: "Miku",
        video: "assets/video/Miku.mp4",
        audio: "assets/audio/miku.wav",
        chart: buildMikuChart()
      },
      {
        id: 3,
        name: "Electric Angel",
        video: "assets/video/ElectricAngel.mp4",
        audio: "assets/audio/electric.wav",
        chart: buildElectricAngelChart()
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