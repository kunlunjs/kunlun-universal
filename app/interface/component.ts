export interface Component {
  id?: string
  title: string
  spacing?: string
  tags?: string[]
}

export type Components = Array<Component>

export interface ComponentPage {
  title: string
  slug: string
  icon?: string
  spacing?: string
  components?: Components
}

export interface ComponentCard {
  title: string
  slug: string
  icon: string
  count: number
  tags?: string[]
}
