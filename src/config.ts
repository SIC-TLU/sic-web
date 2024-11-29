import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPONT: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPONT: process.env.NEXT_PUBLIC_API_ENDPONT
})

if (!configProject.success) {
  console.error(configProject.error.issues)
  throw new Error('Values define in .env file invalid!')
}

const envConfig = configProject.data
export default envConfig
