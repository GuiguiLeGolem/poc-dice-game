import { Enemy } from './Enemy'
import { Boss } from './Boss'
import { Player } from './Player'

export type RoomType = 'enemy' | 'boss' | 'heal' | 'attackUp'

// 🧠 Petite fonction utilitaire de random
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export class Room {
  type: RoomType
  content: Enemy | Boss | null = null

  private static goons = [
    { name: "Gotham Goon", image: "https://m.media-amazon.com/images/I/61JyALvWl0L.jpg" },
    { name: "Two Face Goon", image: "https://images.shoutwiki.com/lego/thumb/2/23/Bat006.jpg/250px-Bat006.jpg" },
    { name: "Joker Goon", image: "https://www.templeofbricks.com/img/minifigs/lego-dc-superheroes/minifig-lego-dc-superheroes-sh020.png" },
    { name: "Pimp", image: "https://static.wikia.nocookie.net/legomarveldc/images/5/58/Riddler_Henchman.png" }
  ]

  private static bosses = [
    { name: "François Hollande", image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcS-R_0235Z8FZygaGpt4VwzRl4PX1V979-1Hb_dBo9Z58a6KTq6ey1crLdfPIXIxUz0fRODzEOR0AYgTLI" },
    { name: "Nicolas Sarkozy", image: "https://pictures.laprovence.com/cdn-cgi/image/width=800,format=auto,quality=80/media/melody/2025/10/19/files-former-french-president-nicolas-sarkozy-leaves-in-front-of-his-wife-french-italian-singer-carl-1760852082_6857cf5059e86ac57cf5059e89067cv_.jpg" },
    { name: "Valéry Giscard d'Estaing", image: "https://s.france24.com/media/display/bc96d042-34f0-11eb-b3a7-005056a98db9/w:1280/p:16x9/f1572416773a76996dccbea68c6211b9edd16462.jpg" },
    { name: "Jacques Chirac", image: "https://www.radiofrance.fr/s3/cruiser-production/2019/09/3c93e523-7c5b-4332-a204-d338fea04ca0/1200x680_chirac.jpg" }
  ]

  constructor() {
    this.generateRoom()
  }

  // 🎲 Génération aléatoire factorisée
  generateRoom() {
    const types: RoomType[] = ['enemy', 'boss', 'heal', 'attackUp']

    if(!this.type)
      this.type = getRandomItem(types)

    switch (this.type) {
      case 'enemy': {
        const { name, image } = getRandomItem(Room.goons)
        this.content = new Enemy(name, 10, 6, image)
        break
      }
      case 'boss': {
        const { name, image } = getRandomItem(Room.bosses)
        this.content = new Boss(name, 30, 10, image)
        break
      }
      default:
        this.content = null
        break
    }
  }

  generateRoomWithPrederteminatedType(type: RoomType) {
    const types: RoomType[] = ['enemy', 'boss', 'heal', 'attackUp']
    
    this.type = type;

    switch (this.type) {
      case 'enemy': {
        const { name, image } = getRandomItem(Room.goons)
        this.content = new Enemy(name, 10, 6, image)
        break
      }
      case 'boss': {
        const { name, image } = getRandomItem(Room.bosses)
        this.content = new Boss(name, 30, 10, image)
        break
      }
      default:
        this.content = null
        break
    }
  }

  // 💚 Effets des salles spéciales
  applyEffect(player: Player) {
    switch (this.type) {
      case 'heal':
        player.heal(0.15)
        console.log(`💚 Tu récupères 15% de tes PV ! (${player.pv}/${player.maxPv})`)
        break
      case 'attackUp':
        player.addDice(3)
        console.log(`💪 Ta force augmente ! Tu gagnes un nouveau dé à 3 faces !`)
        break
    }
  }
}
