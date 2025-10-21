<template>
  <div>
    <div>
      <p>{{ player.name }}</p>
    </div>

    <div>
      <p>{{ enemy.name }} — PV : {{ enemy.pv }}</p>
      <img :src="enemy.image" style="height: 400px; width: auto;" />
    </div>

    <div>
      <button @click="inflictDamage">
        <p>Roll the Dice</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Enemy } from '../classes/Enemy'
import { Player } from '../classes/Player'

const player = reactive(new Player("Guigui le Golem", 100, 10))
const enemy = reactive(new Enemy("Goon", 20, 6,"https://m.media-amazon.com/images/I/61JyALvWl0L.jpg"))

function inflictDamage(): void {
  const damage = player.rollDice()
  enemy.pv -= damage

  if (enemy.pv <= 0) {
    enemy.pv = 0
    alert("💥 GG ! L'ennemi est KO 💥")
  }
}
</script>
