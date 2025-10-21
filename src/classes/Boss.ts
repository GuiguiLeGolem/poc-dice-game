import { Enemy } from './Enemy'

export class Boss extends Enemy {
  constructor(name: string, pv: number, diceFaces: number, image: string) {
    super(name, pv, diceFaces, image)
  }
}
