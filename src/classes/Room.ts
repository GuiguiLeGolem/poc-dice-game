import { Enemy } from './Enemy'
import { Boss } from './Boss'
import { Player } from './Player'

export type RoomType = 'enemy' | 'boss' | 'heal' | 'attackUp'

export class Room {
  type: RoomType
  content: Enemy | Boss | null = null

  constructor() {
    const types: RoomType[] = ['enemy', 'boss', 'heal', 'attackUp']
    this.type = types[Math.floor(Math.random() * types.length)]

    if (this.type === 'enemy') {
      this.content = new Enemy("Goon (LEGO Edition)", 6, 20, "https://m.media-amazon.com/images/I/61JyALvWl0L.jpg")
    } else if (this.type === 'boss') {
      this.content = new Boss("Nicolas Sarkozy", 10, 50, "https://pictures.laprovence.com/cdn-cgi/image/width=800,format=auto,quality=80/media/melody/2025/10/19/files-former-french-president-nicolas-sarkozy-leaves-in-front-of-his-wife-french-italian-singer-carl-1760852082_6857cf5059e86ac57cf5059e89067cv_.jpg")
    }
  }

  applyEffect(player: Player) {
    if (this.type === 'heal') {
      player.heal(0.15)
      console.log(`💚 Tu récupères 15% de tes PV ! (${player.pv}/${player.maxPv})`)
    } else if (this.type === 'attackUp') {
      player.addDice(3)
      console.log(`⚔️ Ta force augmente ! Tu as gagné un nouveau dès à 3 faces (ca existe pas, c'est un cylindre chef)`)
    }
  }
}
