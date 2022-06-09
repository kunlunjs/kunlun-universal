declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.bmp'
declare module '*.gif'
declare module '*.jpg'
declare module '*.png'
declare module '*.jpeg'
declare module '*.webp'

declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}
declare module '*.module.less' {
  const classes: Record<string, string>
  export default classes
}
declare module '*.module.scss' {
  const classes: Record<string, string>
  export default classes
}
