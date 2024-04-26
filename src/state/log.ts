import { reactive } from 'vue'

interface Result {
  roll: Array<number>,
  display: number,
  modifier: number,
  time: string,
}

export interface Log {
  startTime: number
  results: Array<Result>
}

export const log: Log = reactive({
  startTime: Date.now(),
  results: []
})
