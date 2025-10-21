import { describe, it, expect } from 'vitest'
import { Room } from '../../src/classes/Room'
import { Player } from '../../src/classes/Player'

describe('Room', () => {
  it('génère bien un type de salle valide', () => {
    const room = new Room()
    const validTypes = ['enemy', 'boss', 'heal', 'attackUp']
    expect(validTypes).toContain(room.type)
  })

  it('crée un ennemi quand le type est enemy', () => {
    const room = new Room()
    room.type = 'enemy'
    room.generateRoom()
    expect(room.content).not.toBeNull()
    expect(room.content?.name).toBeTypeOf('string')
  })

  it('applique correctement un effet de soin', () => {
    const player = new Player('Guigui', 50, 10)
    player.pv = 20
    const room = new Room()
    room.type = 'heal'
    room.applyEffect(player)
    expect(player.pv).toBeGreaterThan(20)
  })
})
