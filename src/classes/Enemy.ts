import { Character } from './Character'

export class Enemy extends Character {
  image: string

  constructor(name: string, pv: number, diceFaces: number, image: string) {
    super(name)
    this.dice = Array.from({ length: diceFaces }, (_, i) => i + 1)
    this.image = image
    this.pv = pv
  }

  scaling(scale: number){
    this.pv = this.pv * scale
    this.dice.forEach(diceFace => {
      diceFace = diceFace * scale
    })
  }
}
