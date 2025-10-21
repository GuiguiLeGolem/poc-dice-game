import { Character } from './Character'
import { Player } from './Player'

export class Enemy extends Character {
  image: string

  constructor(name: string, pv: number, diceFaces: number, image: string) {
    super(name)
    this.dice = Array.from({ length: diceFaces }, (_, i) => i + 1)
    this.image = image
    this.pv = pv
  }

  scaleWithPlayer(player: Player) {
    if (player.bossesKilled === 0) return

    const scaleFactor = 1 + player.bossesKilled * 0.2 // ex : +20% par boss
    this.pv = Math.round(this.pv * scaleFactor)
    this.dice = this.dice.map(face => Math.round(face * scaleFactor))
  }
}
