class Entity {
  constructor(name, position) {
    this.name = name;
    this.moving = false;
    if (position) {
      this.position = position;
    } else {
      this.position = 1;
    }
    this.delta = 0;
  }
 
  draw(ctx, x, y) {
    ctx.font = "16px Arial";
    var nameSize = ctx.measureText(this.name);

    var padding = 7;

    var h = padding * 2 + 16;
    var w = padding * 2 + nameSize.width;

    ctx.fillStyle="#FFFFFF";  
    ctx.fillRect(x - w / 2, y - h / 2, w, h);


    
    ctx.strokeStyle="#000000";
    ctx.beginPath();
    ctx.rect(x - w / 2, y - h / 2, w, h);
    ctx.stroke();

    ctx.fillStyle="#000000";
    ctx.fillText(this.name, x - w/2 + padding, y + padding);

    this.block = {
      x: x - w / 2,
      y: y - h / 2,
      width: w,
      height: h
    };
  }

  click() {
    console.log("Click on: " + this.name);
  }

  getName() {
    return this.name;
  }

  isHover(x,y) {
    return (this.block.x <= x && x <= this.block.x + this.block.width) &&
      (this.block.y <= y && y <= this.block.y + this.block.height);
  }

  getPosition() {
    return this.position;
  }

  setPosition(position) {
    this.position = position;
  }

  isMoving() {
    return this.moving;
  }

  getDelta() {
    return this.delta;
  }

  setDelta(delta) {
    this.delta = delta;
  }

  move() {
    if (this.moving) {
      return;
    }
    this.moving = true;
    this.target = this.position + 1;
    this.delta = 0;
  }

  getTarget() {
    return this.target;
  }

  stop() {
    this.moving = false;
  }
}