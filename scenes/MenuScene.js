export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
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
    const { width, height } = this.scale;

    // Fondo base
    this.add.rectangle(width / 2, height / 2, width, height, 0x070b17);

    // Círculos decorativos de fondo para dar profundidad
    this.add.circle(width * 0.15, height * 0.2, 220, 0x1d4ed8, 0.08);
    this.add.circle(width * 0.85, height * 0.18, 180, 0x7c3aed, 0.07);
    this.add.circle(width * 0.8, height * 0.82, 260, 0x2563eb, 0.05);

    // Panel principal
    this.add.rectangle(width / 2, height / 2, 1100, 760, 0x0b1020, 0.78)
      .setStrokeStyle(2, 0x1e3a8a, 0.45);

    // Glow suave detrás del panel
    const panelGlow = this.add.rectangle(width / 2, height / 2, 1140, 800, 0x3b82f6, 0.06);

    // Línea decorativa superior
    this.add.rectangle(width / 2, 110, 220, 4, 0x60a5fa, 0.9);

    // Título con sombra/glow simulado
    this.add.text(width / 2 + 3, 172 + 3, "MOON HERO", {
      fontSize: "74px",
      color: "#1e3a8a",
      fontStyle: "bold",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    this.add.text(width / 2, 172, "MOON HERO", {
      fontSize: "74px",
      color: "#f8fafc",
      fontStyle: "bold",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    // Subtítulo nuevo
    this.add.text(width / 2, 250, "MayMoon, the Unbeatable Heroine of Rhythm", {
      fontSize: "26px",
      color: "#cbd5e1",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    this.add.text(width / 2, 292, "Press the beat. Survive the song.", {
      fontSize: "20px",
      color: "#64748b",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    // Botón principal redondeado
    this.createRoundedButton(width / 2, 470, 340, 95, {
      title: "JUGAR",
      subtitle: "",
      baseColor: 0x1f3f8f,
      hoverColor: 0x315ee8,
      glowColor: 0x74a9ff,
      borderColor: 0xc7dbff,
      radius: 24,
      titleSize: "38px",
      onClick: () => {
        this.scene.start("LevelSelectScene");
      }
    });

    // Texto de ayuda
    this.add.text(width / 2, 900, "A  S  D  F  para tocar las notas", {
      fontSize: "26px",
      color: "#94a3b8",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    this.add.text(width / 2, 945, "Selecciona una canción y sigue el ritmo", {
      fontSize: "20px",
      color: "#64748b",
      fontFamily: "Georgia, serif"
    }).setOrigin(0.5);

    // Brillo suave animado del panel
    this.tweens.add({
      targets: panelGlow,
      alpha: { from: 0.04, to: 0.09 },
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });
  }
}