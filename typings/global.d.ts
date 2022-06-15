declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string
      SERVER_PORT: string
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
    }
  }
}

export {}
