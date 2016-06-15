

class Section {
  constructor(xStart, yStart, xEnd, yEnd, steps) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.xEnd = xEnd;
    this.yEnd = yEnd;
    this.steps = steps;
  }  

  getXStart() {
    return this.xStart;
  }

  getYStart() {
    return this.yStart;
  }

  getXEnd() {
    return this.xEnd;
  }

  getYEnd() {
    return this.yEnd;
  }

  getSteps() {
    return this.steps;
  }

  draw(ctx, x1, y1, x2, y2) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}
