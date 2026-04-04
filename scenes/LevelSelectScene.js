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

function buildBadAppleChart() {
  return [
    ...generatePatternSection(0, 40000, 760, [0, 1, 2, 3]),
    ...generatePatternSection(43000, 90000, 700, [0, 2, 1, 3]),
    ...generatePatternSection(93000, 145000, 660, [0, 1, 0, 2, 1, 3]),
    ...generatePatternSection(148000, 200000, 720, [3, 2, 1, 0]),
    ...generatePatternSection(203000, 240000, 640, [0, 1, 2, 1, 0, 2, 3, 2])
  ];
}

export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super("LevelSelectScene");
    this.codeInputOverlay = null;
  }

  createRoundedButton(x, y, width, height, options) {
    const {
      title = "Botón",
      subtitle = "",
      onClick = () => {},
      baseColor = 0x1e3a8a,
      hoverColor = 0x2563eb,
      glowColor = 0x60a5fa,
      borderColor = 0xbfd7ff,
      radius = 24,
      titleSize = "34px",
      subtitleSize = "20px",
      locked = false
    } = options;

    const container = this.add.container(x, y);

    const glow = this.add.graphics();
    const bg = this.add.graphics();
    const shine = this.add.graphics();

    const drawButton = (fillColor, strokeAlpha = 0.45) => {
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

    drawGlow(locked ? 0.04 : 0.10);
    drawButton(baseColor, 0.45);
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

    if (locked) {
      container.alpha = 0.82;
    }

    hitArea.on("pointerover", () => {
      drawGlow(locked ? 0.09 : 0.20);
      drawButton(hoverColor, 0.75);

      this.tweens.add({
        targets: container,
        scaleX: 1.03,
        scaleY: 1.03,
        duration: 120,
        ease: "Power2"
      });
    });

    hitArea.on("pointerout", () => {
      drawGlow(locked ? 0.04 : 0.10);
      drawButton(baseColor, 0.45);

      this.tweens.add({
        targets: container,
        scaleX: 1,
        scaleY: 1,
        duration: 120,
        ease: "Power2"
      });
    });

    hitArea.on("pointerdown", () => {
      this.cameras.main.flash(150, 80, 120, 255);

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

  getLevels() {
    return [
      {
        id: "promise",
        name: "Promise",
        duration: "2:55",
        difficulty: "Normal",
        requiredCode: null,
        video: "assets/video/Promise.mp4",
        audio: "assets/audio/promise.wav",
        chart: buildPromiseChart()
      },
      {
        id: "electricAngel",
        name: "Electric Angel",
        duration: "3:18",
        difficulty: "Normal",
        requiredCode: "ANGEL-02",
        video: "assets/video/ElectricAngel.mp4",
        audio: "assets/audio/electric.wav",
        chart: buildElectricAngelChart()
      },
      {
        id: "miku",
        name: "Miku",
        duration: "4:05",
        difficulty: "Easy",
        requiredCode: "MIKU-03",
        video: "assets/video/Miku.mp4",
        audio: "assets/audio/miku.wav",
        chart: buildMikuChart()
      },
      {
        id: "badApple",
        name: "Bad Apple",
        duration: "3:39",
        difficulty: "Hard",
        requiredCode: "APPLE-04",
        video: "assets/video/BadApple.mp4",
        audio: "assets/audio/badapple.wav",
        chart: buildBadAppleChart(),
        videoScale: 1.12
      }
    ];
  }

  isLevelUnlocked(level) {
    if (level.id === "promise") return true;
    return !!this.unlocks[level.id];
  }

  openCodePrompt(level) {
    this.showCodeInput(level);
  }

  showCodeInput(level) {
    const { width, height } = this.scale;

    if (this.codeInputOverlay) {
      this.codeInputOverlay.destroy(true);
      this.codeInputOverlay = null;
    }

    let typedText = "";
    let isClosing = false;

    const overlay = this.add.container(0, 0);
    this.codeInputOverlay = overlay;

    const dim = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.72)
      .setInteractive();

    const glow = this.add.graphics();
    glow.fillStyle(0x60a5fa, 0.14);
    glow.fillRoundedRect(width / 2 - 290, height / 2 - 190, 580, 380, 30);

    const panel = this.add.rectangle(width / 2, height / 2, 540, 340, 0x0f172a, 0.98)
      .setStrokeStyle(3, 0x93c5fd, 0.95);

    const shine = this.add.graphics();
    shine.fillStyle(0xffffff, 0.05);
    shine.fillRoundedRect(width / 2 - 245, height / 2 - 145, 490, 70, 22);

    const title = this.add.text(width / 2, height / 2 - 112, `Código para ${level.name}`, {
      fontSize: "34px",
      color: "#ffffff",
      fontStyle: "bold",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    const subtitle = this.add.text(width / 2, height / 2 - 72, "Ingresa la contraseña para desbloquear este nivel", {
      fontSize: "18px",
      color: "#cbd5e1",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    const inputGlow = this.add.graphics();
    const drawInputGlow = (alpha = 0.18) => {
      inputGlow.clear();
      inputGlow.fillStyle(0x3b82f6, alpha);
      inputGlow.fillRoundedRect(width / 2 - 182, height / 2 - 28, 364, 76, 20);
    };
    drawInputGlow(0.12);

    const inputBox = this.add.rectangle(width / 2, height / 2 + 10, 340, 52, 0x020617, 1)
      .setStrokeStyle(2, 0x60a5fa, 0.95);

    const inputText = this.add.text(width / 2, height / 2 + 10, "", {
      fontSize: "28px",
      color: "#ffffff",
      fontFamily: "monospace",
      fontStyle: "bold"
    }).setOrigin(0.5);

    const cursor = this.add.text(width / 2, height / 2 + 10, "|", {
      fontSize: "28px",
      color: "#93c5fd",
      fontFamily: "monospace",
      fontStyle: "bold"
    }).setOrigin(0, 0.5);

    const messageText = this.add.text(width / 2, height / 2 + 62, "Escribe el código y presiona ENTER", {
      fontSize: "18px",
      color: "#94a3b8",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    const cancelButton = this.createRoundedButton(width / 2 - 100, height / 2 + 125, 160, 52, {
      title: "Cancelar",
      subtitle: "",
      titleSize: "24px",
      baseColor: 0x334155,
      hoverColor: 0x475569,
      glowColor: 0x94a3b8,
      borderColor: 0xe2e8f0,
      radius: 18,
      onClick: () => {
        closeOverlay();
      }
    });

    const acceptButton = this.createRoundedButton(width / 2 + 100, height / 2 + 125, 160, 52, {
      title: "Aceptar",
      subtitle: "",
      titleSize: "24px",
      baseColor: 0x1d4ed8,
      hoverColor: 0x2563eb,
      glowColor: 0x60a5fa,
      borderColor: 0xbfd7ff,
      radius: 18,
      onClick: () => {
        submitCode();
      }
    });

    overlay.add([
      dim,
      glow,
      panel,
      shine,
      title,
      subtitle,
      inputGlow,
      inputBox,
      inputText,
      cursor,
      messageText,
      cancelButton,
      acceptButton
    ]);

    overlay.setAlpha(0);
    panel.setScale(0.92);

    this.tweens.add({
      targets: overlay,
      alpha: 1,
      duration: 140,
      ease: "Power2"
    });

    this.tweens.add({
      targets: [
        panel,
        inputBox,
        inputText,
        cursor,
        title,
        subtitle,
        messageText,
        cancelButton,
        acceptButton
      ],
      scaleX: { from: 0.92, to: 1 },
      scaleY: { from: 0.92, to: 1 },
      duration: 180,
      ease: "Back.Out"
    });

    this.tweens.add({
      targets: cursor,
      alpha: { from: 1, to: 0.15 },
      duration: 530,
      yoyo: true,
      repeat: -1
    });

    const refreshInput = () => {
      const displayValue = typedText || "— — — —";
      inputText.setText(displayValue);
      inputText.setColor(typedText ? "#ffffff" : "#64748b");

      const bounds = inputText.getBounds();
      cursor.x = inputText.x + bounds.width / 2 + 4;
    };

    const showMessage = (text, color = "#94a3b8") => {
      messageText.setText(text);
      messageText.setColor(color);
    };

    const closeOverlay = () => {
      if (isClosing) return;
      isClosing = true;

      this.input.keyboard.off("keydown", onKeyDown);

      this.tweens.add({
        targets: overlay,
        alpha: 0,
        duration: 120,
        ease: "Power2",
        onComplete: () => {
          if (this.codeInputOverlay === overlay) {
            this.codeInputOverlay = null;
          }
          overlay.destroy(true);
        }
      });
    };

    const submitCode = () => {
      const code = typedText.trim().toUpperCase();

      if (!code) {
        showMessage("Ingresa un código", "#fbbf24");
        return;
      }

      if (code === level.requiredCode) {
        this.unlocks[level.id] = true;
        localStorage.setItem("moonhero_unlocks", JSON.stringify(this.unlocks));
        showMessage(`${level.name} desbloqueado`, "#4ade80");

        this.time.delayedCall(500, () => {
          closeOverlay();
          this.scene.restart();
        });
      } else {
        showMessage("Código incorrecto", "#f87171");
        this.cameras.main.shake(130, 0.003);

        this.tweens.add({
          targets: [inputBox, inputText, cursor],
          x: "-=8",
          duration: 45,
          yoyo: true,
          repeat: 3,
          ease: "Sine.easeInOut",
          onComplete: () => {
            inputBox.x = width / 2;
            inputText.x = width / 2;
            refreshInput();
          }
        });
      }
    };

    const onKeyDown = (event) => {
      if (isClosing) return;

      if (event.key === "Escape") {
        closeOverlay();
        return;
      }

      if (event.key === "Enter") {
        submitCode();
        return;
      }

      if (event.key === "Backspace") {
        typedText = typedText.slice(0, -1);
        refreshInput();
        return;
      }

      if (event.key === " ") {
        if (typedText.length < 18) {
          typedText += "-";
          refreshInput();
        }
        return;
      }

      if (/^[a-zA-Z0-9-]$/.test(event.key) && typedText.length < 18) {
        typedText += event.key.toUpperCase();
        refreshInput();
      }
    };

    this.input.keyboard.on("keydown", onKeyDown);

    refreshInput();
  }

  handleLevelClick(level) {
    if (this.isLevelUnlocked(level)) {
      this.scene.start("GameScene", { levelData: level });
    } else {
      this.openCodePrompt(level);
    }
  }

  shutdown() {
    if (this.codeInputOverlay) {
      this.codeInputOverlay.destroy(true);
      this.codeInputOverlay = null;
    }

    this.input.keyboard.removeAllListeners("keydown");
  }

  create() {
    const { width, height } = this.scale;

    this.events.once("shutdown", this.shutdown, this);
    this.events.once("destroy", this.shutdown, this);

    this.unlocks = JSON.parse(localStorage.getItem("moonhero_unlocks") || "{}");

    this.add.rectangle(width / 2, height / 2, width, height, 0x070b17);

    this.add.circle(width * 0.15, height * 0.2, 220, 0x2563eb, 0.07);
    this.add.circle(width * 0.85, height * 0.18, 180, 0x7c3aed, 0.06);
    this.add.circle(width * 0.82, height * 0.82, 250, 0x2563eb, 0.05);

    const panelGlow = this.add.rectangle(width / 2, height / 2, 1280, 860, 0x3b82f6, 0.05);
    this.add.rectangle(width / 2, height / 2, 1240, 820, 0x0b1020, 0.82)
      .setStrokeStyle(2, 0x1e3a8a, 0.45);

    this.add.text(width / 2 + 3, 124 + 3, "SELECCIÓN DE NIVELES", {
      fontSize: "58px",
      color: "#1e3a8a",
      fontStyle: "bold",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    this.add.text(width / 2, 124, "SELECCIÓN DE NIVELES", {
      fontSize: "58px",
      color: "#ffffff",
      fontStyle: "bold",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    this.add.text(width / 2, 182, "Completa niveles para obtener los códigos", {
      fontSize: "24px",
      color: "#94a3b8",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    const levels = this.getLevels();

    levels.forEach((level, index) => {
      const startY = 280;
      const gap = 130;
      const y = startY + (index * gap);
      const unlocked = this.isLevelUnlocked(level);

      this.createRoundedButton(width / 2, y, 560, 96, {
        title: unlocked ? level.name : `${level.name} 🔒`,
        subtitle: unlocked
          ? `${level.duration} • ${level.difficulty}`
          : "Bloqueado • requiere código",
        baseColor: unlocked ? 0x1f3f8f : 0x374151,
        hoverColor: unlocked ? 0x315ee8 : 0x4b5563,
        glowColor: unlocked ? 0x74a9ff : 0x9ca3af,
        borderColor: unlocked ? 0xc7dbff : 0xd1d5db,
        radius: 24,
        locked: !unlocked,
        onClick: () => {
          this.handleLevelClick(level);
        }
      });
    });

    this.createRoundedButton(130, 70, 170, 56, {
      title: "← Volver",
      subtitle: "",
      titleSize: "26px",
      baseColor: 0x334155,
      hoverColor: 0x475569,
      glowColor: 0x94a3b8,
      borderColor: 0xe2e8f0,
      radius: 18,
      onClick: () => {
        this.scene.start("MenuScene");
      }
    });

    this.add.text(width / 2, 780, "Orden de progreso: Promise → Electric Angel → Miku → Bad Apple", {
      fontSize: "22px",
      color: "#cbd5e1",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    this.add.text(width / 2, 850, "Al completar un nivel recibirás el código del siguiente", {
      fontSize: "18px",
      color: "#64748b",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    this.tweens.add({
      targets: panelGlow,
      alpha: { from: 0.03, to: 0.07 },
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });
  }
}