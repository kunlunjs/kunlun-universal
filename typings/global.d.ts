declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
    }
  }
}

export {}
