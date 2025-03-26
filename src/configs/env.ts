/**
 * Environment
 */
const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'development'
    case 'production':
      return 'production'
    default:
      return 'development'
  }
}
export type Env = 'development' | 'production'
export const env: Env = getEnv()
