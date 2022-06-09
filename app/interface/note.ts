interface SEO {
  title: string
  description: string
}

export interface Note {
  title: string
  seo: SEO
  date: Date
  slug: string
  icon: string
  content: string
}

export interface NoteCard {
  title: string
  date: Date
  slug: string
  icon: string
}
