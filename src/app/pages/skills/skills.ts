import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class SkillsComponent implements AfterViewInit {

  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  width = 900;
  height = 500;

  /* -----------------------------
        CHARACTER SPRITE SYSTEM
  ------------------------------*/
  characterImg = new Image();
  spriteLoaded = false;

  frameWidth = 200;
  frameHeight = 200;
  cropY = 40;
  cropHeight = 300;

  scale = 0.28;
  drawWidth = this.frameWidth * this.scale;
  drawHeight = this.cropHeight * this.scale;

  mario = {
    x: 100,
    y: 380,
    xVel: 0,
    yVel: 0,
    grounded: false,
    direction: 1,
    state: "idle",
    frame: 0,
    frameTimer: 0,
    frameInterval: 1000 / 6
  };

  gravity = 0.6;
  friction = 0.8;
  speed = 3;
  jumpPower = -12;
  keys: any = {};

  /* -----------------------------
        FLOATING SKILL TEXT
  ------------------------------*/
  floatingText: { text: string; x: number; y: number; opacity: number } | null = null;

  /* -----------------------------
        COIN SYSTEM
  ------------------------------*/
  coins: { x: number; y: number; opacity: number; rise: number }[] = [];
  score = 0;
  unlockProjects = false;

  addCoin(x: number, y: number) {
    this.coins.push({
      x,
      y,
      opacity: 1,
      rise: 0
    });

    this.score++;

    if (this.score >= 10) {
      this.unlockProjects = true;
    }
  }

  updateCoins() {
    this.coins.forEach(c => {
      c.rise += 1.5;
      c.opacity -= 0.02;
    });

    this.coins = this.coins.filter(c => c.opacity > 0);
  }

  drawCoins() {
    this.coins.forEach(c => {
      this.ctx.save();
      this.ctx.globalAlpha = c.opacity;

      // Pixel-style Mario coin (no image needed)
      this.ctx.fillStyle = "#F4D03F";
      this.ctx.fillRect(c.x - 8, c.y - c.rise, 16, 16);

      this.ctx.fillStyle = "#F1C40F";
      this.ctx.fillRect(c.x - 5, c.y - c.rise + 3, 10, 10);

      this.ctx.restore();
    });
  }

  /* -----------------------------
               BLOCKS
  ------------------------------*/
  blockImgs: Record<number, HTMLImageElement> = {};
  blockBounce: Record<number, number> = {};

  blocks = [
    { id: 1, skill: "Java",        x: 250, y: 300, blockImage: "assets/skills/blocks/java.png" },
    { id: 2, skill: "Python",      x: 350, y: 300, blockImage: "assets/skills/blocks/python.png" },
    { id: 3, skill: "Angular",     x: 450, y: 300, blockImage: "assets/skills/blocks/angular.png" },
    { id: 4, skill: "JavaScript",  x: 550, y: 300, blockImage: "assets/skills/blocks/js.png" },
    { id: 5, skill: "PHP",         x: 650, y: 300, blockImage: "assets/skills/blocks/php.png" }
  ];

  /* -----------------------------
            INITIALIZATION
  ------------------------------*/
  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;

    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;

    this.characterImg.src = "assets/skills/character.png";
    this.characterImg.onload = () => this.spriteLoaded = true;

    this.blocks.forEach(b => {
      const img = new Image();
      img.src = b.blockImage;
      this.blockImgs[b.id] = img;
      this.blockBounce[b.id] = 0;
    });

    this.initControls();
    this.gameLoop(0);
  }

  initControls() {
    window.addEventListener('keydown', (e) => this.keys[e.key] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key] = false);
  }

  /* -----------------------------
        BLOCK BOUNCE ANIMATION
  ------------------------------*/
  triggerBlockBounce(id: number) {
    this.blockBounce[id] = 10;
  }

  updateBlockBounce() {
    Object.keys(this.blockBounce).forEach(key => {
      const id = Number(key);
      if (this.blockBounce[id] > 0) this.blockBounce[id] -= 1;
    });
  }

  /* -----------------------------
        CHARACTER MOVEMENT
  ------------------------------*/
  updateMario() {
    if (this.keys["ArrowLeft"]) {
      this.mario.xVel = -this.speed;
      this.mario.direction = -1;
    }
    if (this.keys["ArrowRight"]) {
      this.mario.xVel = this.speed;
      this.mario.direction = 1;
    }

    if ((this.keys[" "] || this.keys["ArrowUp"]) && this.mario.grounded) {
      this.mario.yVel = this.jumpPower;
      this.mario.grounded = false;
    }

    this.mario.x += this.mario.xVel;
    this.mario.y += this.mario.yVel;

    this.mario.xVel *= this.friction;
    this.mario.yVel += this.gravity;

    if (this.mario.y + this.drawHeight >= 460) {
      this.mario.y = 460 - this.drawHeight;
      this.mario.yVel = 0;
      this.mario.grounded = true;
    }

    this.mario.state =
      !this.mario.grounded ? "jump" :
        (this.keys["ArrowLeft"] || this.keys["ArrowRight"]) ? "walk" :
          "idle";

    // collision + coin trigger
    this.blocks.forEach(b => {
      const offset = this.blockBounce[b.id];
      const top = b.y - offset;

      if (
        this.mario.x < b.x + 60 &&
        this.mario.x + this.drawWidth > b.x &&
        this.mario.y < top + 60 &&
        this.mario.y + this.drawHeight > top &&
        this.mario.yVel < 0
      ) {
        this.mario.yVel = 3;
        this.triggerBlockBounce(b.id);

        // Floating skill label
        this.floatingText = {
          text: b.skill.toUpperCase(),
          x: b.x + 30,
          y: top - 10,
          opacity: 1
        };

        // Add coin
        this.addCoin(b.x + 30, top);
      }
    });
  }

  /* -----------------------------
           CHARACTER ANIMATION
  ------------------------------*/
  updateAnimation(delta: number) {
    this.mario.frameTimer += delta;
    if (this.mario.frameTimer >= this.mario.frameInterval) {
      this.mario.frame++;
      this.mario.frameTimer = 0;
    }

    if (this.mario.state === "idle") this.mario.frame %= 1;
    if (this.mario.state === "walk") this.mario.frame %= 4;
    if (this.mario.state === "jump") this.mario.frame = 2;
  }

  /* -----------------------------
                DRAW
  ------------------------------*/
  drawMario() {
    if (!this.spriteLoaded) return;

    let frameIndex = 0;
    if (this.mario.state === "idle") frameIndex = 0;
    else if (this.mario.state === "walk") frameIndex = [1, 0, 1, 2][this.mario.frame % 4];
    else frameIndex = 2;

    this.ctx.save();

    if (this.mario.direction === -1) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.characterImg,
        frameIndex * this.frameWidth,
        this.cropY,
        this.frameWidth,
        this.cropHeight,
        -(this.mario.x + this.drawWidth),
        this.mario.y,
        this.drawWidth,
        this.drawHeight
      );
    } else {
      this.ctx.drawImage(
        this.characterImg,
        frameIndex * this.frameWidth,
        this.cropY,
        this.frameWidth,
        this.cropHeight,
        this.mario.x,
        this.mario.y,
        this.drawWidth,
        this.drawHeight
      );
    }

    this.ctx.restore();
  }

  drawBlocks() {
    this.blocks.forEach(b => {
      const offset = this.blockBounce[b.id];
      const img = this.blockImgs[b.id];

      if (img?.complete && img.naturalWidth > 0) {
        this.ctx.drawImage(img, b.x, b.y - offset, 60, 60);
      } else {
        this.ctx.fillStyle = "#ffaa00";
        this.ctx.fillRect(b.x, b.y - offset, 60, 60);
      }
    });
  }

  drawFloatingText() {
    if (!this.floatingText) return;

    const ft = this.floatingText;
    this.ctx.font = "16px 'PressStart2P'";
    this.ctx.fillStyle = `rgba(255,255,255,${ft.opacity})`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(ft.text, ft.x, ft.y);

    ft.y -= 0.6;
    ft.opacity -= 0.02;

    if (ft.opacity <= 0) this.floatingText = null;
  }

  drawScore() {
    // Make sure score text is drawn in a clean, unscaled space

      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);

      this.ctx.font = "16px 'PressStart2P'";
      this.ctx.fillStyle = "white";
      this.ctx.textAlign = "left";

      // Score only
      this.ctx.fillText("Score: " + this.score, 50, 50);

      this.ctx.restore();
    }

  drawGround() {
    this.ctx.fillStyle = "#654321";
    this.ctx.fillRect(0, 460, this.width, 40);
  }

  drawBackground() {
    this.ctx.fillStyle = "#8CC4BD";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /* -----------------------------
               GAME LOOP
  ------------------------------*/
  lastTime = 0;

  gameLoop(time: number) {
    const delta = time - this.lastTime;
    this.lastTime = time;
    this.updateMario();
    this.updateBlockBounce();
    this.updateAnimation(delta);
    this.updateCoins();

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawBackground();
    this.drawGround();
    this.drawBlocks();
    this.drawCoins();
    this.drawMario();
    this.drawFloatingText();
    this.drawScore();

    requestAnimationFrame(t => this.gameLoop(t));
  }
  goToContact() {
    window.location.href = "/contact";
  }
}
