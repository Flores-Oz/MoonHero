class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.video('bg', 'assets/video.mp4', 'loadeddata', false, true);
    this.load.audio('song', 'assets/song.mp3');
  }

  create() {
  this.gameOver = false;

  this.bgVideo = this.add.video(400, 300, 'bg');

  this.bgVideo.on('created', () => {
    const videoWidth = this.bgVideo.video.videoWidth;
    const videoHeight = this.bgVideo.video.videoHeight;

    const scaleX = 800 / videoWidth;
    const scaleY = 600 / videoHeight;
    const scale = Math.min(scaleX, scaleY);

    this.bgVideo.setScale(scale);
  });

  this.bgVideo.play(true);

  this.song = this.sound.add('song');
  this.song.play();

  this.add.rectangle(400, 300, 800, 600, 0x000000, 0.35);

  this.receptor = this.add.rectangle(400, 500, 140, 20, 0xff0000);
  this.add.line(0, 0, 0, 500, 800, 500, 0xffffff).setOrigin(0, 0);

  this.statusText = this.add.text(20, 20, 'Presiona ESPACIO cuando la nota llegue a la barra', {
    fontSize: '20px',
    color: '#ffffff'
  });

  this.notesData = [];
  for (let t = 1000; t <= 20000; t += 1000) {
    this.notesData.push({ time: t, spawned: false });
  }

  this.notes = [];
  this.startTime = this.time.now;
  this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}
  update(time, delta) {
    if (this.gameOver) return;

    const currentTime = time - this.startTime;

    // Crear notas antes de su tiempo objetivo
    this.notesData.forEach((noteData) => {
      if (!noteData.spawned && currentTime >= noteData.time - 2000) {
        noteData.spawned = true;

        const note = this.add.circle(400, 0, 20, 0x00ff00);

        this.notes.push({
          shape: note,
          targetTime: noteData.time,
          hit: false
        });
      }
    });

    // Mover notas
    this.notes.forEach((note) => {
      if (!note.hit) {
        note.shape.y += 2.5;

        // Si se pasó del receptor, falla
        if (note.shape.y > 540) {
          this.fail();
        }
      }
    });

    // Input
    if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
      this.checkHit();
    }
  }

  checkHit() {
    let hitSomething = false;

    this.notes.forEach((note) => {
      if (note.hit) return;

      const distance = Math.abs(note.shape.y - this.receptor.y);

      if (distance <= 30) {
        note.hit = true;
        note.shape.destroy();
        hitSomething = true;
        this.statusText.setText('¡Bien!');
      }
    });

    if (!hitSomething) {
      this.statusText.setText('Muy temprano o muy tarde');
    }
  }

  fail() {
    if (this.gameOver) return;

    this.gameOver = true;

    this.statusText.setText('Fallaste. Video y música en pausa.');

    if (this.bgVideo) {
      this.bgVideo.setPaused(true);
    }

    if (this.song) {
      this.song.pause();
    }
  }
}