import {Entity} from '../core/entity';
import {Num2d} from './vector';
import {Graphics} from '../core/graphics/graphics';

export class Grid extends Entity {

  private readonly cells: GridCell[][];
  private readonly width: number;
  private readonly cellSize: number;

  private readonly entities: Entity[][];

  constructor(width = 16, cellSize = 64) {
    super();

    this.width = width;
    this.cellSize = cellSize;

    this.entities = [];
    this.cells = this.createCells();
  }

  public update(tick: number, delta: number) {
    if (tick % 8 == 0) {
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.width; y++) {
          this.cells[x][y].validate();
        }
      }
    }

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.width; y++) {
        for (let i = 0; i < this.cells[x][y].entities.length; i++) {
          this.cells[x][y].entities[i].update(tick, delta);
        }
      }
    }
  }

  public draw(g: Graphics) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.width; y++) {
        for (let i = 0; i < this.cells[x][y].entities.length; i++) {
          this.cells[x][y].entities[i].draw(g);
        }


        g.drawRect({lineColor: 'white'}, x * this.cellSize + 0.5, y * this.cellSize + 0.5, this.cellSize, this.cellSize);

        /*g.drawText(
          {fillColor: 'white', font: '12px monospace'},
          this.cells[x][y].entities.length.toString(),
          x * this.cellSize + 5,
          y * this.cellSize + 5);*/
      }
    }
  }

  public add(e: Entity) {
    const cell = this.getCellAt(e.position);

    if (cell) {
      cell.entities.push(e);
    }
  }

  private createCells() {
    const result: GridCell[][] = [];

    for (let x = 0; x < this.width; x++) {
      result[x] = [];

      for (let y = 0; y < this.width; y++) {
        result[x][y] = new GridCell(this, {x: x, y: y}, this.cellSize);
        this.entities.push(result[x][y].entities);
      }
    }

    return result;
  }

  private getCellAt(p: Num2d) {
    const x = Math.floor(p.x / this.cellSize);
    const y = Math.floor(p.y / this.cellSize);

    return this.isBounded(x) && this.isBounded(y) ? this.cells[x][y] : null;
  }

  private isBounded(v: number) {
    return v >= 0 && v < this.width;
  }
}

class GridCell {
  public readonly owner: Grid;
  public readonly coordinate: Num2d;
  public readonly size: number;

  public readonly entities: Entity[];

  private readonly absCoord: Num2d;

  constructor(owner: Grid, coord: Num2d, size: number) {
    this.owner = owner;
    this.size = size;

    this.coordinate = coord;
    this.absCoord = {x: coord.x * size, y: coord.y * size};

    this.entities = [];
  }

  public validate() {
    for (let i = 0; i < this.entities.length; i++) {
      if (!this.isBounded(this.entities[i].position)) {
        const removedEntity = this.entities.splice(i, 1)[0];
        i--;

        this.owner.add(removedEntity);
      }
    }
  }

  private isBounded(p: Num2d) {
    return p.x >= this.absCoord.x && p.x < this.absCoord.x + this.size
      && p.y >= this.absCoord.y && p.y < this.absCoord.y + this.size;
  }
}

interface EntityMetadata {
  registered: boolean;
}