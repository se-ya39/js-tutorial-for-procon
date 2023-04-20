class Vector2 {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }
  normalized() {
    let normalized = new Vector2();
    normalized.x = Math.cos(Math.atan(this._y / this._x));
    normalized.y = Math.sin(Math.atan(this._y / this._x));
    return normalized;
  }
  set x(value) {
    this._x = value;
  }
  get x() {
    return this._x;
  }
  set y(value) {
    this._y = value;
  }
  get y() {
    return this._y;
  }
}

class GameLoopManager {
  constructor(func, cps, debug = false) {
    this.func = func;
    this.cps = cps;
    this.mpc = 1000 / this.cps;
    this.debug = debug;
    this.total_count = 0;
    this.total_time = 0;
  }
  start() {
    this.leastDelta = 0;
    this.start_time = Date.now();
    this.leastTime = Date.now();
    this.done();
  }

  done() {
    let now = Date.now();
    let deltaTime = now - this.leastTime;
    let delta = this.leastDelta - deltaTime;
    this.leastDelta = Math.max(0, this.mpc + delta);
    if (this.debug)
      console.log(
        deltaTime,
        "(",
        this.leastDelta,
        ")",
        this.total_time / this.total_count
      );
    setTimeout(this.func, this.leastDelta);
    this.leastTime = now;

    this.total_count++;
    this.total_time += deltaTime;
  }

  refresh_total() {
    this.total_count = 1;
    this.total_time = this.leastDelta;
  }
}

class CanvasObject {
  constructor({
    ctx = false,
    img = "assets/error.png",
    size = 50,
    position = new Vector2(0, 0),
    motion = new Vector2(0, 0),
    rotate = 0,
    rotation = 0,
    update = ()=>{},
  } = {}) {
    this.ctx = ctx ? ctx : undefined;
    this.image = new Image();
    this.image.src = img;
    this.size = size;
    this.position = position;
    this.motion = motion;
    this.rotate = rotate;
    this.rotation = rotation;
    this.update = update;
  }
  render() {
    let _X = this.position.x;
    let _Y = this.position.y;
    let phi = this.rotate * (Math.PI / 180);
    let X = _X * Math.cos(-phi) - _Y * Math.sin(-phi);
    let Y = _Y * Math.cos(-phi) + _X * Math.sin(-phi);
    this.ctx.rotate(phi);
    this.ctx.drawImage(
      this.image,
      X - this.size / 2,
      Y - this.size / 2,
      this.size,
      this.size
    );
    this.ctx.rotate(-phi);
  }
}
