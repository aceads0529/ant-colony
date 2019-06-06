import {Style} from './style';

export class Graphics {

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.getContext();
  }

  public get width() {
    return this.canvas.width;
  }

  public set width(v: number) {
    this.canvas.width = v;
  }

  public get height() {
    return this.canvas.height;
  }

  public set height(v: number) {
    this.canvas.height = v;
  }

  public get background() {
    return this.canvas.style.background || 'none';
  }

  public set background(v: string) {
    this.canvas.style.background = v;
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public drawRect(style: Style, x: number, y: number, width: number, height: number) {
    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.context.closePath();

    this.render(style);
  }

  public drawEllipse(style: Style, x: number, y: number, width: number, height: number) {
    width /= 2;
    height /= 2;

    this.context.beginPath();
    this.context.ellipse(x + width, y + height, width, height, 0, 0, Math.PI * 2);
    this.context.closePath();

    this.render(style);
  }

  public drawText(style: Style, text: string, x: number, y: number) {
    this.applyStyle(style);

    if (style.fillColor) {
      this.context.fillText(text, x, y);
    }

    if (style.lineWidth || style.lineColor) {
      this.context.strokeText(text, x, y);
    }
  }

  private render(style: Style) {
    this.applyStyle(style);

    if (style.fillColor) {
      this.context.fill();
    }

    if (style.lineWidth || style.lineColor) {
      this.context.stroke();
    }
  }

  private applyStyle(value: Style) {
    this.context.strokeStyle = value.lineColor || 'black';
    this.context.fillStyle = value.fillColor || 'black';
    this.context.lineWidth = value.lineWidth || 1;

    this.context.font = value.font || '14px monospace';
    this.context.textBaseline = 'top';
  }

  private getContext(): CanvasRenderingContext2D {
    const graphics = this.canvas.getContext('2d');

    if (graphics == null) {
      throw new Error('Unable to get 2D graphics context from canvas');
    } else {
      return graphics;
    }
  }
}
