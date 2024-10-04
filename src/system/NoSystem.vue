<script setup lang="ts">
import { store, type Preferences } from '@/state/store'
import { useRouter } from 'vue-router'

const router = useRouter()

if (store.system !== '') {
  router.push('/' + store.system)
} else {
  router.push('/d20')
}
</script>

<template>
</template>
