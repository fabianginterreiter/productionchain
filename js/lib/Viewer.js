class View {
  constructor(name) {
    this.objects = [];
    this.field = new Field(name, this);

    var that = this;
    this.field.getCanvas().onclick = function(event) {
      that.click(event);
    };

    this.field.getCanvas().onmousemove = function(event) {
      that.onmousemove(event);
    }

    this.draw();
  }

  onmousemove(event) {
    var el = this.getHoverElement(event.layerX, event.layerY);
    if (el && el.click) {
      this.field.getCanvas().style.cursor = 'Pointer';
    } else {
      this.field.getCanvas().style.cursor = 'auto'; 
    }
  }

  click(event) {
    var el = this.getHoverElement(event.layerX, event.layerY);
    if (el) {
      if (el.click) {
        el.click();
      }
    }
  }

  getHoverElement(x, y) {
    for (var i = 0; i < this.objects.length; i++) {
      for (var j = this.objects[i].getCars().length - 1; j >= 0; j--) {
        var car = this.objects[i].getCars()[j];
        if (car.isHover(x,y)) {
          return car;          
        }
      } 
    }

    return null;
  }

  getSmaller(a,b) {
    return a < b ? a : b;
  }

  drawRoute(route) {
    var that = this;
    
    route.forEach(function(part) {

      part.draw(that.field.getContext(), 
        that.field.getX(part.getXStart()),
        that.field.getY(part.getYStart()),
        that.field.getX(part.getXEnd()),
        that.field.getY(part.getYEnd())
        );
    });
  }

  drawCar(car, position) {
    car.draw(this.field.getContext(), this.field.getX(position.x), this.field.getY(position.y));
  }

  calcDistance(startX, endX, steps, step) {
    var smallest = this.getSmaller(startX, endX);
    var sizePerStep = (endX - startX) / (steps + 1);
    return startX + sizePerStep * step;
  }

  calcPosition(route, position) {
    var x = -1;
    var y = -1;

    var step = position;
    for (var index = 0; index < route.length; index++) {
      var part = route[index];
      if (step > part.getSteps()) {
        step -= part.getSteps();
        continue;
      }

      x = this.calcDistance(part.getXStart(), part.getXEnd(), part.getSteps(), step);
      y = this.calcDistance(part.getYStart(), part.getYEnd(), part.getSteps(), step);

      break;
    }

    return {
      x: x,
      y: y
    }
  }

  getPointInTheMiddle(route, position) {
    var step = position;
    for (var index = 0; index < route.length; index++) {
      var part = route[index];
      if (step > part.getSteps()) {
        step -= part.getSteps();
        continue;
      }
      if (step == part.getSteps()) {
        return {
          x: part.getXEnd(),
          y: part.getYEnd()
        }
      }
      return null;
    }
    return null;
  }

  setObjects(objects) {
    this.objects = objects;
    this.drawIt();
  }

  isMoving() {
    var result;

    this.objects.some(function(object) {
      return object.getCars().some(function(car) {
        if (car.isMoving()) {
          return true;
        }
      });
    });

    for (var i = 0; i < this.objects.length; i++) {
      for (var c = 0; c < this.objects[i].getCars().length; c++) {
        if (this.objects[i].getCars()[c].isMoving()) {
          return true;
        }
      }
    }

    return false;
  }

  drawIt() {
    this.field.clear();

    var that = this;

    var speed = 0.5 * 30;

    this.objects.forEach(function(object) {
      object.draw(that.field.getContext(), 
        that.field.getX(object.getXStart()), 
        that.field.getY(object.getYStart()), 
        that.field.getX(object.getXEnd()), 
        that.field.getY(object.getYEnd()));

      that.drawRoute(object.getRoutes());

      object.getCars().forEach(function(car) {
        if (car.isMoving()) {
          var pIm = that.getPointInTheMiddle(object.getRoutes(), car.getPosition());

          var currentPosition = that.calcPosition(object.getRoutes(), car.getPosition());
          var nextPosition = that.calcPosition(object.getRoutes(), car.getTarget());

          car.setDelta(car.getDelta() + 1);

          var xNext = -1;
          var yNext = -1;

          if (pIm != null) {
            if (car.getDelta() < (speed / 2)) {
              var xDiff = pIm.x - currentPosition.x;
              var yDiff = pIm.y - currentPosition.y;

              xNext = currentPosition.x + xDiff/(speed / 2) * car.getDelta();
              yNext = currentPosition.y + yDiff/(speed / 2) * car.getDelta();
            } else {
              var xDiff = nextPosition.x - pIm.x;
              var yDiff = nextPosition.y - pIm.y;

              xNext = pIm.x + xDiff/ (speed / 2) * (car.getDelta() - (speed / 2));
              yNext = pIm.y + yDiff/ (speed / 2) * (car.getDelta() - (speed / 2));
            }
          } else {
            var xDiff = nextPosition.x - currentPosition.x;
            var yDiff = nextPosition.y - currentPosition.y;

            xNext = currentPosition.x + xDiff/speed * car.getDelta();
            yNext = currentPosition.y + yDiff/speed * car.getDelta();
          }

          if (car.getDelta() == speed) {
            car.setPosition(car.getPosition() + 1);
            car.stop();
          }

          that.drawCar(car, {
            x: xNext,
            y: yNext
          });
        } else {
          that.drawCar(car, that.calcPosition(object.getRoutes(), car.getPosition()));
        }
      });
    });
  }

  enforce() {
    this.doEnf = true;
  }

  draw() {
    if (this.doEnf || this.isMoving()) {
      this.drawIt();
      this.doEnf = false;
    }

    var that = this;

  setTimeout(function() {
        requestAnimationFrame(function() {
          that.draw();
        });
    }, 1000 / 30);
  }
}