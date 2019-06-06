import {Vector} from '../world/vector';
import {Graphics} from './graphics/graphics';

export class Entity {
  public position: Vector;

  constructor(position?: Vector) {
    this.position = position || new Vector();
  }

  public update(tick: number, delta: number) {
  }

  public draw(g: Graphics) {
  }
}
