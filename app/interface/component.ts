export interface KLComponent {
  id: string
  title: string
  spacing?: string
  tags?: string[]
}

export type KLComponents = Array<KLComponent>

export interface KLComponentPage {
  title: string
  slug: string
  icon?: string
  spacing?: string
  components?: KLComponents
}

export type KLComponentType = 'application' | 'ecommerce'

export interface KLComponentCard {
  // [k: string]: any
  title: string
  slug: string
  icon: string
  count: number
  tags?: string[]
  categories: string[]
}
