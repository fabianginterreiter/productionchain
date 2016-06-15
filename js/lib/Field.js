 class Field {
  constructor(name, target) {
    this.fieldsX = 40;
    this.fieldsY = 33;

    this.target = target;
    this.canvas = document.getElementById(name);

    this.setSizes();

    var that = this;
    window.onresize = function(event) {
      that.setSizes();
      that.target.enforce();
    };

    this.ctx = canvas.getContext("2d");
  }

  getCanvas() {
    return this.canvas;
  }

  setSizes() {
    this.width = this.canvas.parentNode.offsetWidth;
    this.height = this.canvas.parentNode.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    var v1 = this.fieldsX / this.fieldsY;
    var v2 = this.width / this.height;

    var xFactor = -1;
    var yFactor = -1;

    if (v1 > v2) {
      if (v1 > 1) {
        yFactor = this.height;
        xFactor = this.height / this.fieldsY * this.fieldsX;
      } else {
        yFactor = this.width / this.fieldsX * this.fieldsY;
        xFactor = this.width;
      }
    } else if (v1 < v2) {
      if (v2 > 1) {
        yFactor = this.height;
        xFactor = this.height / this.fieldsY * this.fieldsX;
      } else {
        yFactor = this.width / this.fieldsX * this.fieldsY;
        xFactor = this.width;
      }
    } else {
      xFactor = this.width;
      yFactor = this.height;
    }

    this.widthOfOne = xFactor / this.fieldsX;
    this.heightOfOne = yFactor / this.fieldsY;
  }

  getX(x) {
    return x * this.widthOfOne;
  }

  getY(y) {
    return y * this.heightOfOne;
  }

  getContext() {
    return this.ctx;
  }

  clear() {
    this.ctx.beginPath();
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
}