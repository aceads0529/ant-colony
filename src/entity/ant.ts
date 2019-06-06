import {Vector} from '../world/vector';
import {Entity} from '../core/entity';
import {Graphics} from '../core/graphics/graphics';
import {Style} from '../core/graphics/style';

export class Ant extends Entity {

  private static idCounter: number = 0;

  public static style: Style = {
    lineWidth: 2, lineColor: 'black',
    fillColor: '#664'
  };

  public velocity: Vector;
  public readonly id: number;

  constructor(position?: Vector) {
    super(position);
    this.velocity = new Vector();

    this.id = Ant.idCounter++;
  }

  public update(tick: number, delta: number) {

    if ((tick + this.id) % 60 == 0) {
      this.velocity.x = (Math.random() * 2 - 1) * delta * 40;
      this.velocity.y = (Math.random() * 2 - 1) * delta * 40;
      this.velocity.normalize();
    }

    this.position.offset(this.velocity);
  }

  public draw(g: Graphics) {
    g.drawEllipse(Ant.style, this.position.x - 4, this.position.y - 4, 8, 8);
  }
}
