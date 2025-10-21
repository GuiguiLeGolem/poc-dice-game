import { Character } from './Character'
import { Enemy } from './Enemy'

export class Player extends Character {
  maxPv: number = 0
  dices: Array<Array<number>> = []
  enemiesKilled: number = 0
  bossesKilled: number = 0

  constructor(name: string, pv: number, diceFaces: number) {
    super(name)
    this.pv = pv
    this.maxPv = pv

    this.dice = Array.from({ length: diceFaces }, (_, i) => i + 1)
    this.dices.push(this.dice)
  }

  attackTarget(target: Enemy) {
    var damage = 0

    if(this.dices.length < 2){
      damage = this.rollDice()
    } else {
      damage = this.rollAllDices()
    }
    
    target.pv -= damage
    console.log(`${this.name} inflige ${damage} dégâts à ${target.name}`)
  }

  rollAllDices(): number {
    let totalDamage = 0

    for (const dice of this.dices) {
      const roll = this.rollDiceFrom(dice)
      totalDamage += roll
      console.log(`🎲 Dé lancé (${dice.length} faces) → ${roll}`)
    }

    return totalDamage
  }

  private rollDiceFrom(dice: number[]): number {
    const randomIndex = Math.floor(Math.random() * dice.length)
    return dice[randomIndex]
  }

  heal(percent: number) {
    const healAmount = Math.floor(this.maxPv * percent)
    this.pv = Math.min(this.pv + healAmount, this.maxPv)
  }

  addDice(diceFaces: number){
    const newDice = Array.from({ length: diceFaces }, (_, i) => i + 1)
    this.dices.push(newDice)
  }
}

