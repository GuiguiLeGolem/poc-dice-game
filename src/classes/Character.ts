export class Character {
  name: string
  pv: number
  dice: number[]

  constructor(name: string) {
    this.name = name
  }

  rollDice(): number {
    const randomIndex = Math.floor(Math.random() * this.dice.length)
    return this.dice[randomIndex]
  }

  isAlive(): boolean {
    return this.pv > 0
  }
}
