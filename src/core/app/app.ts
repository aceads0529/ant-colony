import {AppOptions, DEFAULT_APP_OPTIONS} from './app-options';
import {AppTime} from './app-time';
import {Grid} from '../../world/grid';
import {Ant} from '../../entity/ant';
import {Graphics} from '../graphics/graphics';
import {EntitySystem} from '../entity-system';

export class App {

  private readonly graphics: Graphics;
  private readonly options: AppOptions;

  private readonly time: AppTime;

  private readonly grid: Grid;

  constructor(canvas: HTMLCanvasElement, options?: Partial<AppOptions>) {
    this.graphics = new Graphics(canvas);
    this.options = {...options, ...DEFAULT_APP_OPTIONS};

    this.time = new AppTime(this.options.fps, this.update.bind(this));
    this.grid = new Grid();
  }

  public run() {
    this.initialize();
    this.time.start();
  }

  private initialize() {
    this.graphics.width = this.options.width;
    this.graphics.height = this.options.height;
    this.graphics.background = this.options.background;

    for (let i = 0; i < 1000; i++) {
      const ant = new Ant();
      ant.position.offset({x: 400, y: 400});

      this.grid.add(ant);
    }
  }

  private update() {
    this.grid.update(this.time.tick, this.time.delta);
    requestAnimationFrame(this.draw.bind(this));
  }

  private draw() {
    this.graphics.clear();
    this.grid.draw(this.graphics);

    // DEBUG
    this.graphics.drawText({fillColor: '#000'}, 't: ' + this.time.tick.toString(), 10, 10);
    this.graphics.drawText({fillColor: '#000'}, 'd: ' + this.time.delta.toFixed(3) + 's', 10, 30);
  }
}
