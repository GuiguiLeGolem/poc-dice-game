<template>
  <div>
    <h2>{{ player.name }} — PV : {{ player.pv }}/{{ player.maxPv }} — Dices : {{ player.dices }}</h2>
    <p>Salle actuelle : {{ currentRoom.type }}</p>

    <div v-if="enemy">
      <p>{{ enemy.name }} — PV : {{ enemy.pv }}</p>
      <img :src="enemy.image" style="height: 400px; width: auto;"/>
      <button @click="attackEnemy">⚔️ Attaquer</button>
    </div>

    <div v-else>
      <button @click="nextRoom">➡️ Passer à la salle suivante</button>
    </div>

    <div v-if="gameOver">
      <h2>💀 Partie terminée 💀</h2>
      <p>Ennemis vaincus : {{ player.enemiesKilled }}</p>
      <p>Boss vaincus : {{ player.bossesKilled }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Player } from '../classes/Player'
import { Room } from '../classes/Room'
import { Enemy } from '../classes/Enemy'
import { Boss } from '../classes/Boss'

const player = reactive(new Player("Guigui le Golem", 50, 10)) as Player
const currentRoom = reactive(new Room())
const enemy = ref<Enemy | Boss | null>(currentRoom.content)
const gameOver = ref(false)

function attackEnemy() {
  if (!enemy.value) return

  player.attackTarget(enemy.value)

  if (!enemy.value.isAlive()) {
    if (currentRoom.type === 'enemy') player.enemiesKilled++
    if (currentRoom.type === 'boss') player.bossesKilled++
    enemy.value = null
    //alert("💥 Ennemi vaincu !")
    return
  }

  // Ennemi riposte
  player.pv -= enemy.value.rollDice()

  if (player.pv <= 0) {
    player.pv = 0
    gameOver.value = true
    alert("💀 Tu es mort... 💀")
  }
}

function nextRoom() {
  if (gameOver.value) return

  const newRoom = new Room()
  Object.assign(currentRoom, newRoom)
  enemy.value = newRoom.content

  if (newRoom.type === 'heal' || newRoom.type === 'attackUp') {
    newRoom.applyEffect(player)
    enemy.value = null
  } else if(player.bossesKilled > 0) {
    enemy.value.scaling(player.bossesKilled)
  }
}
</script>
