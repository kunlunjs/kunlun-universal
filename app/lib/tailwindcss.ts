export const tailwindcssRules: Record<
  | '弹性布局'
  | '定位'
  | '外边距'
  | '内边距'
  | '宽高'
  | '文本'
  | '圆角'
  | '边框'
  | '字体'
  | '背景'
  | '阴影'
  | '间距'
  | '网格'
  | '动画'
  | '显示'
  | '装饰'
  | '溢出'
  | '变换'
  | '渐变'
  | '悬浮'
  | '焦点'
  | '激活'
  | 'sm'
  | 'xs'
  | 'md'
  | 'lg'
  | 'xl'
  | '综合',
  string | string[] | RegExp
> = {
  弹性布局: /(flex|items-|justify-).*/,
  定位: /(absolute|relative).*/,
  外边距: /m[xy]?.*/,
  内边距: /p[xy]?.*/,
  圆角: /rounded.*/,
  文本: /text.*/,
  宽高: /[wh]-?/, // max-w-screen
  边框: /border.*/,
  间距: /space-.*/,
  背景: /bg-.*/,
  阴影: /shadow-.*/,
  网格: /(grid|gap-|col-).*/,
  动画: /animate-.*/,
  字体: /font-.*/,
  显示: /hidden|block|inline/,
  装饰: /(underline).*/,
  溢出: /overflow.*/,
  变换: /transition.*/,
  渐变: /gradient-|from-|via-|to-/,
  悬浮: /hover:/,
  焦点: /focus:/,
  激活: /active:/,
  xs: /xs:/,
  sm: /sm:/,
  md: /md:/,
  lg: /lg:/,
  xl: /xl:/,
  综合: ['sr-only', 'flow-root']
}
