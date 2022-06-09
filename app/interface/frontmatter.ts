interface SEO {
  title: string
  description: string
}

interface Components {
  title: string
  spacing?: string
}

export interface FrontMatter {
  title: string
  seo: SEO
  icon: string
  spacing: string
  components: Components
}
