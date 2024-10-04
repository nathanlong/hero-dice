<script setup lang="ts">
import { store, type Preferences } from '@/state/store'
import { useRouter } from 'vue-router'

const router = useRouter()

if (store.system !== '') {
  router.push('/hero-dice/' + store.system)
} else {
  router.push('/hero-dice/d20')
}
</script>

<template>
</template>
