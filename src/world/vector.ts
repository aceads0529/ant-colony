export interface Num2d {
  x: number;
  y: number;
}

export class Vector implements Num2d {

  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public add(p: Num2d) {
    return new Vector(this.x + p.x, this.y + p.y);
  }

  public sub(p: Num2d) {
    return new Vector(this.x - p.x, this.y - p.y);
  }

  public mul(p: Num2d) {
    return new Vector(this.x * p.x, this.y * p.y);
  }

  public div(p: Num2d) {
    return new Vector(this.x / p.x, this.y / p.y);
  }

  public scalarmul(s: number) {
    return new Vector(this.x * s, this.y * s);
  }

  public scalardiv(s: number) {
    return new Vector(this.x / s, this.y / s);
  }

  public magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  public distance(p: Num2d) {
    return this.sub(p).magnitude();
  }

  public offset(p: Num2d) {
    this.x += p.x;
    this.y += p.y;
  }

  public normal() {
    const mag = this.magnitude();
    return mag != 0 ? this.scalardiv(mag) : new Vector();
  }

  public normalize() {
    const mag = this.magnitude();

    if (mag != 0) {
      this.x /= mag;
      this.y /= mag;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }
}
