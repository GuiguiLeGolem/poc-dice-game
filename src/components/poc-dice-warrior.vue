<template>
  <div>
    <h1>Oe</h1>
    <!-- Affiche l'objet entier en JSON -->
    <pre>{{ JSON.stringify(monObjet, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// Création d'un objet complexe
const monObjet = reactive({
  class: {
    name: "Warrior",
    dices: [
      { values: [1, 2, 3, 4, 5, 6] },
      { values: [1, 2, 3, 4, 5, 6] },
      { values: [1, 2, 3, 4, 5, 6] },
      { values: [1, 2, 3, 4, 5, 6] },
      { values: [1, 2, 3, 4, 5, 6] },
    ],
    skills: [
      { name: "", degats: 25 }
    ]
  },
  cards: {

  }
})
</script>
