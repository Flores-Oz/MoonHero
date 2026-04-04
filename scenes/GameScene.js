export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  init(data) {
    this.levelData = data.levelData || {
      id: "promise",
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
    };
  }

  preload() {
    this.videoKey = `bgVideo_${this.levelData.id}`;
    this.songKey = `song_${this.levelData.id}`;

    if (!this.cache.video.exists(this.videoKey)) {
      this.load.video(this.videoKey, this.levelData.video, "loadeddata", false, true);
    }

    if (!this.cache.audio.exists(this.songKey)) {
      this.load.audio(this.songKey, [this.levelData.audio]);
    }
  }

  showResultsPanel(rank, accuracy, unlockInfo) {
    this.resultOverlay = this.add.rectangle(
      this.width / 2,
      this.height / 2,
      this.width,
      this.height,
      0x000000,
      0.72
    ).setDepth(20);

    this.resultPanel = this.add.rectangle(
      this.width / 2,
      this.height / 2,
      760,
      560,
      0x0b1020,
      0.96
    )
      .setStrokeStyle(3, 0x60a5fa, 0.6)
      .setDepth(21);

    this.add.text(this.width / 2, this.height / 2 - 220, "RESULTADOS", {
      fontFamily: "Georgia, serif",
      fontSize: "48px",
      color: "#f8fafc",
      fontStyle: "bold"
    }).setOrigin(0.5).setDepth(22);

    this.add.text(this.width / 2, this.height / 2 - 160, `Rango: ${rank}`, {
      fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
      fontSize: "40px",
      color: "#facc15",
      fontStyle: "bold"
    }).setOrigin(0.5).setDepth(22);

    this.add.text(this.width / 2, this.height / 2 - 95, `Score: ${this.score}`, {
      fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
      fontSize: "30px",
      color: "#ffffff"
    }).setOrigin(0.5).setDepth(22);

    this.add.text(this.width / 2, this.height / 2 - 50, `Accuracy: ${accuracy.toFixed(2)}%`, {
      fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
      fontSize: "28px",
      color: "#cbd5e1"
    }).setOrigin(0.5).setDepth(22);

    this.add.text(this.width / 2, this.height / 2 + 5, `Perfect: ${this.perfectCount}`, {
      fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
      fontSize: "28px",
      color: "#22c55e"
    }).setOrigin(0.5).setDepth(22);

    this.add.text(this.width / 2, this.height / 2 + 45, `Good: ${this.goodCount}`, {
      fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
      fontSize: "28px",
      color: "#eab308"
    }).setOrigin(0.5).setDepth(22);

    this.add.text(this.width / 2, this.height / 2 + 85, `Miss: ${this.missCount}`, {
      fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
      fontSize: "28px",
      color: "#ef4444"
    }).setOrigin(0.5).setDepth(22);

    this.add.text(this.width / 2, this.height / 2 + 125, `Max Combo: ${this.maxCombo}`, {
      fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
      fontSize: "28px",
      color: "#93c5fd"
    }).setOrigin(0.5).setDepth(22);

    this.add.text(this.width / 2, this.height / 2 + 180, "Código del siguiente nivel", {
      fontFamily: "Georgia, serif",
      fontSize: "26px",
      color: "#f8fafc",
      fontStyle: "bold"
    }).setOrigin(0.5).setDepth(22);

    this.nextCodeText = this.add.text(this.width / 2, this.height / 2 + 230, unlockInfo.code, {
      fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
      fontSize: "40px",
      color: "#60a5fa",
      fontStyle: "bold",
      backgroundColor: "#111827",
      padding: { left: 22, right: 22, top: 12, bottom: 12 }
    }).setOrigin(0.5).setDepth(22);

    this.continueButton = this.createRoundedButton(
      this.width / 2,
      this.height / 2 + 300,
      280,
      74,
      {
        title: "CONTINUAR",
        baseColor: 0x1f3f8f,
        hoverColor: 0x315ee8,
        glowColor: 0x74a9ff,
        borderColor: 0xc7dbff,
        radius: 22,
        titleSize: "28px",
        onClick: () => {
          this.scene.start("LevelSelectScene");
        }
      }
    );

    this.continueButton.setDepth(23);
  }

  createRoundedButton(x, y, width, height, options) {
    const {
      title = "Botón",
      subtitle = "",
      onClick = () => {},
      baseColor = 0x1f3f8f,
      hoverColor = 0x315ee8,
      glowColor = 0x74a9ff,
      borderColor = 0xc7dbff,
      radius = 24,
      titleSize = "38px",
      subtitleSize = "20px"
    } = options;

    const container = this.add.container(x, y);

    const glow = this.add.graphics();
    const bg = this.add.graphics();
    const shine = this.add.graphics();

    const drawButton = (fillColor, strokeAlpha = 0.5) => {
      bg.clear();
      bg.fillStyle(fillColor, 1);
      bg.fillRoundedRect(-width / 2, -height / 2, width, height, radius);
      bg.lineStyle(2, borderColor, strokeAlpha);
      bg.strokeRoundedRect(-width / 2, -height / 2, width, height, radius);
    };

    const drawGlow = (alpha = 0.12) => {
      glow.clear();
      glow.fillStyle(glowColor, alpha);
      glow.fillRoundedRect(
        -width / 2 - 8,
        -height / 2 - 8,
        width + 16,
        height + 16,
        radius + 8
      );
    };

    const drawShine = () => {
      shine.clear();
      shine.fillStyle(0xffffff, 0.06);
      shine.fillRoundedRect(
        -width / 2 + 10,
        -height / 2 + 8,
        width - 20,
        height * 0.42,
        radius
      );
    };

    drawGlow(0.12);
    drawButton(baseColor, 0.5);
    drawShine();

    const titleText = this.add.text(0, subtitle ? -12 : 0, title, {
      fontSize: titleSize,
      color: "#ffffff",
      fontStyle: "bold",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    const subtitleText = this.add.text(0, 24, subtitle, {
      fontSize: subtitleSize,
      color: "#dbeafe",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    if (!subtitle) {
      subtitleText.setVisible(false);
    }

    const hitArea = this.add.rectangle(0, 0, width, height, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    container.add([glow, bg, shine, titleText, subtitleText, hitArea]);

    hitArea.on("pointerover", () => {
      drawGlow(0.22);
      drawButton(hoverColor, 0.75);

      this.tweens.add({
        targets: container,
        scaleX: 1.04,
        scaleY: 1.04,
        duration: 120,
        ease: "Power2"
      });
    });

    hitArea.on("pointerout", () => {
      drawGlow(0.12);
      drawButton(baseColor, 0.5);

      this.tweens.add({
        targets: container,
        scaleX: 1,
        scaleY: 1,
        duration: 120,
        ease: "Power2"
      });
    });

    hitArea.on("pointerdown", () => {
      this.cameras.main.flash(180, 80, 120, 255);

      this.tweens.add({
        targets: container,
        scaleX: 0.98,
        scaleY: 0.98,
        duration: 70,
        yoyo: true,
        ease: "Power2"
      });

      onClick();
    });

    return container;
  }

  create() {
    this.width = this.scale.width;
    this.height = this.scale.height;

    this.scrollSpeed = 200;
    this.noteSpawnY = -30;
    this.receptorY = this.height * 0.84;

    this.perfectWindow = 90;
    this.goodWindow = 180;
    this.missWindow = 260;
    this.globalOffset = -120;

    this.maxLives = 5;
    this.lives = 5;
    this.gameOver = false;
    this.levelFinished = false;

    this.laneWidth = 110;
    this.receptorWidth = 110;
    this.receptorHeight = 24;
    this.noteWidth = 72;
    this.noteHeight = 28;

    this.maxCombo = 0;
    this.perfectCount = 0;
    this.goodCount = 0;
    this.missCount = 0;

    this.resultOverlay = null;
    this.resultPanel = null;
    this.nextCodeText = null;
    this.continueButton = null;

    this.retryButton = null;
    this.backButton = null;

    this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x05070d, 1)
      .setDepth(-20);

    this.bgVideo = this.add.video(this.width / 2, this.height / 2, this.videoKey);
    this.bgVideo.setOrigin(0.5);
    this.bgVideo.setDepth(-10);

    this.bgVideo.once("loadeddata", () => {
      const videoElement = this.bgVideo.video;

      if (videoElement && videoElement.videoWidth && videoElement.videoHeight) {
        const sourceW = videoElement.videoWidth;
        const sourceH = videoElement.videoHeight;

        const baseScale = Math.min(
          (this.width * 0.88) / sourceW,
          (this.height * 0.88) / sourceH
        );

        const finalScale = baseScale;

        const finalW = sourceW * finalScale;
        const finalH = sourceH * finalScale;

        this.bgVideo.setDisplaySize(finalW, finalH);
        this.bgVideo.setPosition(this.width / 2, this.height / 2);
      }
    });

    this.bgVideo.play(true);

    this.music = this.sound.add(this.songKey, {
      volume: 0.7,
      loop: false
    });

    this.music.once("complete", () => {
      this.tryFinishLevel();
    });

    this.add.rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.2)
      .setDepth(-5);

    this.add.rectangle(this.width / 2, this.height / 2, this.width * 0.42, this.height, 0x101826, 0.40)
      .setDepth(0);

    this.add.rectangle(this.width / 2, this.receptorY, this.width * 0.46, 8, 0xffffff, 0.15)
      .setDepth(1);

    this.lanes = [
      { x: this.width * 0.38, key: "A", color: 0x00ffcc },
      { x: this.width * 0.46, key: "S", color: 0xffff00 },
      { x: this.width * 0.54, key: "D", color: 0xff66cc },
      { x: this.width * 0.62, key: "F", color: 0x66aaff }
    ];

    this.score = 0;
    this.combo = 0;
    this.notes = this.add.group();

    this.approachTime = ((this.receptorY - this.noteSpawnY) / this.scrollSpeed) * 1000;

    const baseChart = Array.isArray(this.levelData.chart) ? this.levelData.chart : [];

    this.chartStartDelay = 5000;

    const shiftedChart = baseChart.map((note) => ({
      ...note,
      time: note.time + this.chartStartDelay
    }));

    this.chart = this.normalizeChart(shiftedChart);

    this.chartIndex = 0;
    this.songStartTime = null;
    this.musicStarted = false;

    this.createLanes();
    this.createReceptors();
    this.createInput();
    this.createUI();

    this.time.delayedCall(300, () => {
      this.startLevel();
    });
  }

  normalizeChart(chart) {
    if (!Array.isArray(chart)) return [];

    const minGap = 320;
    const sorted = [...chart].sort((a, b) => a.time - b.time);

    const normalized = [];

    for (const note of sorted) {
      const prev = normalized[normalized.length - 1];

      if (!prev) {
        normalized.push({ ...note });
        continue;
      }

      const gap = note.time - prev.time;

      if (gap < minGap) {
        normalized.push({
          ...note,
          time: prev.time + minGap
        });
      } else {
        normalized.push({ ...note });
      }
    }

    return normalized;
  }

  getUnlockCodeForLevel() {
    const levelId = this.levelData.id || "";

    const unlockMap = {
      promise: {
        unlocks: "electricAngel",
        code: "ANGEL-02"
      },
      electricAngel: {
        unlocks: "miku",
        code: "MIKU-03"
      },
      miku: {
        unlocks: null,
        code: null
      }
    };

    return unlockMap[levelId] || { unlocks: null, code: null };
  }

  saveUnlockedLevel(levelId) {
    if (!levelId) return;

    const saved = JSON.parse(localStorage.getItem("moonhero_unlocks") || "{}");
    saved[levelId] = true;
    localStorage.setItem("moonhero_unlocks", JSON.stringify(saved));
  }

  saveUnlockCode(code, unlockedLevelId) {
    if (!code || !unlockedLevelId) return;

    const saved = JSON.parse(localStorage.getItem("moonhero_codes") || "{}");
    saved[code] = unlockedLevelId;
    localStorage.setItem("moonhero_codes", JSON.stringify(saved));
  }

  calculateAccuracy() {
    const totalJudged = this.perfectCount + this.goodCount + this.missCount;

    if (totalJudged <= 0) return 0;

    const earned =
      (this.perfectCount * 1) +
      (this.goodCount * 0.65) +
      (this.missCount * 0);

    return (earned / totalJudged) * 100;
  }

  getRank(accuracy) {
    if (accuracy >= 98) return "SS";
    if (accuracy >= 93) return "S";
    if (accuracy >= 85) return "A";
    if (accuracy >= 75) return "B";
    if (accuracy >= 65) return "C";
    return "D";
  }

  startLevel() {
    if (this.musicStarted || this.gameOver) return;

    this.music.play();
    this.musicStarted = true;
    this.songStartTime = this.time.now;
    this.showFeedback(this.levelData.name);
  }

  getSongTime() {
    if (!this.musicStarted || !this.music) {
      return 0;
    }

    return (this.music.seek * 1000) + this.globalOffset;
  }

  createLanes() {
    for (const lane of this.lanes) {
      this.add.rectangle(lane.x, this.height / 2, this.laneWidth, this.height, 0xffffff, 0.035)
        .setDepth(0.5);

      this.add.rectangle(lane.x, this.height / 2, 6, this.height, 0xffffff, 0.10)
        .setDepth(1);

      this.add.rectangle(lane.x, this.receptorY, this.laneWidth, 140, lane.color, 0.06)
        .setDepth(1);
    }
  }

  createReceptors() {
    this.receptors = [];

    for (let i = 0; i < this.lanes.length; i++) {
      const lane = this.lanes[i];

      const receptor = this.add.rectangle(
        lane.x,
        this.receptorY,
        this.receptorWidth,
        this.receptorHeight,
        0xffffff,
        0.9
      ).setDepth(2);

      receptor.setStrokeStyle(3, lane.color, 1);
      receptor.laneIndex = i;

      this.receptors.push(receptor);

      this.add.text(lane.x, this.receptorY + 50, lane.key, {
        fontFamily: "'Trebuchet MS', 'Verdana', sans-serif",
        fontSize: "32px",
        color: "#ffffff",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 4
      })
        .setOrigin(0.5)
        .setDepth(2);
    }
  }

  createInput() {
    this.keys = this.input.keyboard.addKeys("A,S,D,F");

    this.input.keyboard.on("keydown-A", () => this.handleLanePress(0));
    this.input.keyboard.on("keydown-S", () => this.handleLanePress(1));
    this.input.keyboard.on("keydown-D", () => this.handleLanePress(2));
    this.input.keyboard.on("keydown-F", () => this.handleLanePress(3));
  }

  createUI() {
  const uiFont = "'Trebuchet MS', 'Verdana', sans-serif";

  this.scoreText = this.add.text(40, 30, "Score: 0", {
    fontFamily: uiFont,
    fontSize: "36px",
    color: "#ffffff",
    stroke: "#000000",
    strokeThickness: 4
  }).setDepth(4);

  this.comboText = this.add.text(40, 75, "Combo: 0", {
    fontFamily: uiFont,
    fontSize: "36px",
    color: "#ffffff",
    stroke: "#000000",
    strokeThickness: 4
  }).setDepth(4);

  this.livesText = this.add.text(40, 120, `Lives: ${this.lives}`, {
    fontFamily: uiFont,
    fontSize: "36px",
    color: "#ff8080",
    fontStyle: "bold",
    stroke: "#000000",
    strokeThickness: 4
  }).setDepth(4);

  this.feedbackText = this.add.text(this.width / 2, 80, "Preparado...", {
    fontFamily: uiFont,
    fontSize: "42px",
    color: "#ffffff",
    fontStyle: "bold",
    stroke: "#000000",
    strokeThickness: 6
  })
    .setOrigin(0.5)
    .setDepth(4);

  this.gameOverText = this.add.text(this.width / 2, this.height / 2 - 80, "", {
    fontFamily: uiFont,
    fontSize: "72px",
    color: "#ff4d4d",
    fontStyle: "bold",
    align: "center",
    stroke: "#000000",
    strokeThickness: 8
  })
    .setOrigin(0.5)
    .setDepth(5);

  this.levelNameText = this.add.text(this.width - 40, 30, this.levelData.name, {
    fontFamily: uiFont,
    fontSize: "32px",
    color: "#ffffff",
    fontStyle: "bold",
    stroke: "#000000",
    strokeThickness: 4
  })
    .setOrigin(1, 0)
    .setDepth(4);
  }

  createGameOverButtons() {
    if (this.retryButton) this.retryButton.destroy();
    if (this.backButton) this.backButton.destroy();

    this.retryButton = this.createRoundedButton(
      this.width / 2,
      this.height / 2 + 60,
      320,
      90,
      {
        title: "REINTENTAR",
        baseColor: 0x1f3f8f,
        hoverColor: 0x315ee8,
        glowColor: 0x74a9ff,
        borderColor: 0xc7dbff,
        radius: 24,
        titleSize: "34px",
        onClick: () => {
          this.scene.restart({ levelData: this.levelData });
        }
      }
    );

    this.backButton = this.createRoundedButton(
      this.width / 2,
      this.height / 2 + 160,
      320,
      80,
      {
        title: "VOLVER",
        baseColor: 0x1e293b,
        hoverColor: 0x334155,
        glowColor: 0x64748b,
        borderColor: 0x94a3b8,
        radius: 20,
        titleSize: "28px",
        onClick: () => {
          this.scene.start("LevelSelectScene");
        }
      }
    );
  }

  spawnNote(laneIndex, targetTime = null) {
    const lane = this.lanes[laneIndex];

    const glow = this.add.rectangle(
      lane.x,
      this.noteSpawnY,
      this.noteWidth + 26,
      this.noteHeight + 18,
      lane.color,
      0.22
    ).setDepth(2.8);

    const note = this.add.rectangle(
      lane.x,
      this.noteSpawnY,
      this.noteWidth,
      this.noteHeight,
      lane.color,
      1
    ).setDepth(3);

    this.tweens.add({
      targets: glow,
      alpha: 0.45,
      scaleX: 1.08,
      scaleY: 1.12,
      duration: 280,
      yoyo: true,
      repeat: -1
    });

    note.glow = glow;
    note.laneIndex = laneIndex;
    note.hit = false;
    note.targetTime = targetTime;

    this.notes.add(note);
  }

  handleLanePress(laneIndex) {
    if (this.gameOver || !this.musicStarted || this.levelFinished) return;

    const receptor = this.receptors[laneIndex];

    this.tweens.killTweensOf(receptor);
    receptor.scaleY = 1;

    receptor.setFillStyle(0xffffff, 1);

    this.tweens.add({
      targets: receptor,
      scaleY: 1.5,
      duration: 60,
      yoyo: true
    });

    this.time.delayedCall(100, () => {
      if (receptor.active) {
        receptor.setFillStyle(0xffffff, 0.9);
      }
    });

    const currentSongTime = this.getSongTime();

    let bestNote = null;
    let bestDelta = Number.MAX_VALUE;

    this.notes.getChildren().forEach((note) => {
      if (!note.active || note.hit) return;
      if (note.laneIndex !== laneIndex) return;

      const delta = Math.abs(currentSongTime - note.targetTime);

      if (delta < bestDelta) {
        bestDelta = delta;
        bestNote = note;
      }
    });

    if (!bestNote) {
      this.registerMiss("MISS");
      return;
    }

    if (bestDelta <= this.perfectWindow) {
      this.registerHit(bestNote, "PERFECT", 150, bestDelta);
    } else if (bestDelta <= this.goodWindow) {
      this.registerHit(bestNote, "GOOD", 100, bestDelta);
    } else {
      this.registerMiss("MISS");
    }
  }

  spawnPerfectParticles(x, y, color = 0xffffff) {
    for (let i = 0; i < 8; i++) {
      const particle = this.add.circle(x, y, Phaser.Math.Between(3, 6), color, 1)
        .setDepth(4);

      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const distance = Phaser.Math.Between(24, 52);

      const targetX = x + Math.cos(angle) * distance;
      const targetY = y + Math.sin(angle) * distance;

      this.tweens.add({
        targets: particle,
        x: targetX,
        y: targetY,
        alpha: 0,
        scale: 0.2,
        duration: 320,
        ease: "Cubic.easeOut",
        onComplete: () => particle.destroy()
      });
    }
  }

 registerHit(note, label, points, delta = null) {
    note.hit = true;

    if (note.glow) {
      this.tweens.killTweensOf(note.glow);
    }

    const hitX = note.x;
    const hitY = this.receptorY;

    this.combo++;
    this.maxCombo = Math.max(this.maxCombo, this.combo);
    this.score += points;

    if (label === "PERFECT") {
      this.perfectCount++;
    } else if (label === "GOOD") {
      this.goodCount++;
    }

    this.scoreText.setText(`Score: ${this.score}`);
    this.comboText.setText(`Combo: ${this.combo}`);

    if (label === "PERFECT") {
      this.spawnPerfectParticles(hitX, hitY, 0xffffff);
    }

    this.tweens.killTweensOf(this.cameras.main);
    this.cameras.main.zoom = 1;

    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1.02,
      duration: 60,
      yoyo: true
    });

    if (delta !== null) {
      this.showFeedback(label);
    } else {
      this.showFeedback(label);
    }

    this.tweens.add({
      targets: [note, note.glow].filter(Boolean),
      scaleX: 1.25,
      scaleY: 1.25,
      alpha: 0,
      duration: 120,
      ease: "Back.easeOut",
      onComplete: () => {
        if (note.glow && note.glow.active) {
          note.glow.destroy();
        }
        if (note.active) {
          note.destroy();
        }
        this.tryFinishLevel();
      }
    });
  }

  registerMiss(label = "MISS") {
    if (this.gameOver || this.levelFinished) return;

    this.combo = 0;
    this.lives--;
    this.missCount++;

    this.comboText.setText(`Combo: ${this.combo}`);
    this.livesText.setText(`Lives: ${Math.ceil(this.lives)}`);
    this.showFeedback(label);

    if (this.lives <= 0) {
      this.triggerGameOver();
      return;
    }

    this.tryFinishLevel();
  }

  triggerGameOver() {
    this.gameOver = true;

    if (this.music && this.music.isPlaying) {
      this.music.stop();
    }

    if (this.bgVideo) {
      this.bgVideo.pause();
    }

    this.notes.getChildren().forEach((note) => {
      if (note.glow) {
        this.tweens.killTweensOf(note.glow);
        note.glow.destroy();
      }
      if (note.active) note.destroy();
    });

    this.gameOverText.setColor("#ff4d4d");
    this.gameOverText.setText("GAME OVER");
    this.feedbackText.setText("");

    this.createGameOverButtons();
  }

  tryFinishLevel() {
    if (this.gameOver || this.levelFinished) return;
    if (!this.musicStarted) return;

    const noMoreChart = this.chartIndex >= this.chart.length;
    const activeNotes = this.notes.getChildren().filter((note) => note.active).length;
    const songEnded = !this.music.isPlaying && this.musicStarted;

    if (noMoreChart && activeNotes === 0 && songEnded) {
      this.finishLevel();
    }
  }

  finishLevel() {
    this.levelFinished = true;

    if (this.bgVideo) {
      this.bgVideo.stop();
    }

    if (this.music && this.music.isPlaying) {
      this.music.stop();
    }

    this.notes.getChildren().forEach((note) => {
      if (note.glow) {
        this.tweens.killTweensOf(note.glow);
        note.glow.destroy();
      }
      if (note.active) note.destroy();
    });

    this.gameOverText.setColor("#22c55e");
    this.gameOverText.setText("NIVEL COMPLETADO");
    this.feedbackText.setText("");

    const accuracy = this.calculateAccuracy();
    const rank = this.getRank(accuracy);

    const unlockInfo = this.getUnlockCodeForLevel();

    if (unlockInfo.unlocks && unlockInfo.code) {
      this.saveUnlockCode(unlockInfo.code, unlockInfo.unlocks);
    }

    this.showResultsPanel(rank, accuracy, unlockInfo);
  }

  showFeedback(text) {
    let color = "#ffffff";

    if (text.includes("PERFECT")) color = "#22c55e";
    else if (text.includes("GOOD")) color = "#eab308";
    else if (text.includes("MISS")) color = "#ef4444";

    this.feedbackText.setColor(color);
    this.feedbackText.setText(text);
    this.feedbackText.alpha = 1;

    this.tweens.killTweensOf(this.feedbackText);

    this.tweens.add({
      targets: this.feedbackText,
      alpha: 0,
      duration: 500
    });
  }

  update(_, delta) {
    if (this.gameOver || this.levelFinished) return;

    const currentSongTime = this.getSongTime();

    if (this.musicStarted && this.songStartTime !== null) {
      while (
        this.chartIndex < this.chart.length &&
        currentSongTime >= this.chart[this.chartIndex].time - this.approachTime
      ) {
        const chartNote = this.chart[this.chartIndex];
        this.spawnNote(chartNote.lane, chartNote.time);
        this.chartIndex++;
      }
    }

    this.notes.getChildren().forEach((note) => {
      if (!note.active) return;

      note.y += this.scrollSpeed * (delta / 1000);

      if (note.glow && note.glow.active) {
        note.glow.y = note.y;
        note.glow.x = note.x;
      }

      const tooLateByTime = currentSongTime - note.targetTime > this.missWindow;
      const passedLine = note.y > this.receptorY + 20;

      if (tooLateByTime && passedLine && !note.hit) {
        if (note.glow) {
          this.tweens.killTweensOf(note.glow);
          note.glow.destroy();
        }

        note.destroy();
        this.registerMiss("MISS");
      }
    });

    this.tryFinishLevel();
  }
}