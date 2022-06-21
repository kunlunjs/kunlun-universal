// <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
export function source(html: string, spacing = 'relative') {
  return `
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        let links = [...document.querySelectorAll('a')]
        let forms = [...document.querySelectorAll('form')]
        links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()))
        forms.forEach(form => form.addEventListener('submit', (e) => e.preventDefault()))
      })
    </script>
    <script src="${origin}/scripts/tailwindcss.js"></script>
    <link rel="stylesheet" href="${origin}/styles/tailwind.css">
    <body class="${spacing}">
      ${html}
    </body>
  `
}

export function insertScriptAndStyles(
  html: string,
  spacing = 'relative',
  scripts?: string,
  styles?: string
) {
  return `
    ${scripts ? `<script>${scripts}</script>\n` : ''}
    ${styles ? `<style>${styles}</style>\n` : ''}
    <body class="${spacing}">${html}</body>
  `
}
