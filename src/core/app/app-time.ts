export class AppTime {

  private readonly _fps: number;
  private readonly callback: () => void;

  private _tick: number;
  private _delta: number;

  private lastTick?: Date;
  private intervalId?: any;

  public get tick(): number {
    return this._tick;
  }

  public get delta(): number {
    return this._delta;
  }

  public get fps(): number {
    return this._fps;
  }

  constructor(fps: number, callback: () => void) {
    this._fps = fps;
    this.callback = callback;
    this._tick = 0;
    this._delta = 0;
  }

  public step(delta?: number) {
    this._delta = delta !== undefined ? delta : this.getDelta();
    this._tick++;

    this.callback();
  }

  public start() {
    this.intervalId = setInterval(this.step.bind(this), 1000 / this.fps);
    this._delta = this.getDelta();
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  public toggle() {
    if (this.intervalId) {
      this.stop();
    } else {
      this.start();
    }
  }

  private getDelta() {
    const now = new Date();
    const result = this.lastTick ? (now.valueOf() - this.lastTick.valueOf()) / 1000 : 0;
    this.lastTick = now;

    return result;
  }
}
