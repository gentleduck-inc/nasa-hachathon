export const DEFAULT_QUEUE_NAME = 'mars-processing'

export interface ProcessRunPayload {
  runId: string
  recipeId: string
  moduleId?: string
  input: Record<string, number>
}

export interface QueueOptions {
  attempts?: number
  backoff?: { type: 'fixed' | 'exponential'; delay: number } | number
  removeOnComplete?: number | boolean
  removeOnFail?: number | boolean
  jobId?: string
}
