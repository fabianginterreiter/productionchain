class Area {
  constructor(x1, y1, x2, y2) {
    this.cars = [];
    this.infos = [];
    this.xStart = x1;
    this.yStart = y1;
    this.xEnd = x2;
    this.yEnd = y2;
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

  addSections(sections) {
    this.sections = sections;
  }

  getRoutes() {
    return this.sections;
  }

  addCar(car) {
    this.cars.push(car);
  }

  addInfo(info) {
    this.infos.push(info);
  }

  getInfos() {
    return this.infos;
  }

  getCars() {
    return this.cars;
  }

  getNumberOfPositions() {
    var positions = 0;

    this.sections.forEach(function(section) {
      position+=section.getSteps();
    });

    return positions;
  }

  draw(ctx, x1, y1, x2, y2) {
    ctx.fillStyle="#BDBDBD";
    ctx.fillRect(x1, y1, x2-x1, y2-y1);

    ctx.rect(x1, y1, x2-x1, y2-y1);
    ctx.fillStyle="#000000";
  }
}