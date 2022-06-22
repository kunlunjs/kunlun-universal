import clsx from 'clsx'
import prism from 'prismjs'
import type { FC } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import { useEffect, useState } from 'react'
// FIXME: 服务端不可用
// import { useInView } from 'react-intersection-observer'
import { IconLoading } from '~/components/icon/Loading'
import type { KLComponent } from '~/interface/component'
import { allBreakpoints } from '~/lib/breakpoints'
import { source, insertScriptAndStyles } from '~/lib/component'
import { Breakpoint, Copy, Direction } from './buttons'
import { Range } from './Range'
import { Tags } from './Tags'

type ExampleProps = {
  item: KLComponent | KLComponent[]
  name: string
  spacing: string
}

// app/data/components/hyperui/alters.mdx: { name: 'hyperui/alerts', item: { id: '1', spacing: false, tags: [], title: 'Simple' }, spacing: 'flex flex-col gap-4 max-w-sm mx-auto p-8' }
// app/data/components/css-secrets/$dynamic.mdx: { name: 'css-secrets', item: [{ id: 'ampersands', spacing: false, tags: [], title: 'Ampersands' }], spacing: '' }
export const Example: FC<ExampleProps> = ({ name, item, spacing }) => {
  const codeRef = useRef<Record<string, string>>({})
  const [code, setCode] = useState<string>()
  const [html, setHtml] = useState<string>()
  const [direction, setDirection] = useState<'horizontal' | 'verticle'>(
    'verticle'
  )
  const [width, setWidth] = useState<string>('100%')
  const [range, setRange] = useState<number>(1348)
  const [tabs, setTabs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)
  // const { ref, inView } = useInView({
  //   threshold: 0,
  //   triggerOnce: true
  // })

  const breakpoints = allBreakpoints

  let id: string
  let title: string
  let space: string | boolean | undefined
  let tags: string[] = []
  if (Array.isArray(item)) {
    title = item[0].title
    tags = item[0]?.tags || []
    space = item[0]?.spacing
  } else {
    id = item.id
    title = item.title
    tags = item?.tags || []
    space = item?.spacing
  }

  const slug = title!.toLowerCase().replace(/\s/g, '-')

  const componentSpacing: string = space ? space : spacing

  useEffect(
    () => {
      async function fetchFiles() {
        const response = await Promise.all(
          (item as KLComponent[]).map(i => {
            return fetch(`/components/${name}/${i.id}`)
          })
        )
        const codes = await Promise.all(
          response.map((i, ix) => {
            return i.text()
          })
        )
        const files = codes.map((i, ix) => ({
          file: `${name}/${(item as KLComponent[])[ix].id}`,
          code: i
        }))
        const _tabs = (item as KLComponent[]).map(i => `${name}/${i.id}`)
        setTabs(_tabs)
        setActiveTab(_tabs[0])
        setCode(files[0].code)
        const scripts: string[] = []
        const styles: string[] = []
        for (const file of files) {
          if (file.file.endsWith('.css')) {
            styles.push(file.code)
          }
          if (file.file.endsWith('.js')) {
            scripts.push(file.code)
          }
        }
        codeRef.current = files.reduce((a, b) => {
          a[b.file] = b.code
          return a
        }, {} as Record<string, string>)
        setHtml(
          insertScriptAndStyles(
            files.find(i => i.file.endsWith('.html'))!.code,
            spacing,
            scripts.join(`\n`),
            styles.join(`\n`)
          )
        )
        return
      }
      async function fetchHtml() {
        const response = await fetch(`/components/${name}/${id}.html`)
        const text = await response.text()
        const tab = `${name}/${id}.html`
        setTabs([tab])
        setActiveTab(tab)
        setCode(text)
        setHtml(source(text, componentSpacing))

        return
      }

      if (/* inView && */ Array.isArray(item) && item.length) {
        fetchFiles()
      }
      if (/* inView && */ !Array.isArray(item)) {
        fetchHtml()
      }
    },
    [
      /* inView */
    ]
  )

  useEffect(() => {
    prism.highlightAll()
  })

  useEffect(() => {
    range === 1348 ? setWidth('100%') : setWidth(`${range}px`)
  }, [range])

  const handleTab = useCallback((tab: string) => {
    setActiveTab(tab)
    setCode(tab)
  }, [])

  const handleWidth = (width: string) => {
    setWidth(width)

    width === '100%'
      ? setRange(1348)
      : setRange(Number(width.replace('px', '')))
  }

  const isHorizontal = direction === 'horizontal'
  const bw = isHorizontal ? 'w-1/2' : 'w-full'
  const suffix =
    activeTab
      ?.trim()
      ?.match(/\.(html|css|less|scss|sass|js|jsx|ts|tsx)$/)?.[1] || 'html'

  return (
    <div /* ref={ref} */ className="-mt-20 pt-20" id={slug}>
      <Tags tags={tags} />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black sm:text-xl">
            <a href={`#${slug}`} className="group relative block">
              <span
                className="hidden group-hover:opacity-25 lg:absolute lg:inset-y-0 lg:-left-6 lg:block lg:opacity-0 lg:transition"
                aria-hidden="true"
              >
                #
              </span>

              {title!}
            </a>
          </h2>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {direction === 'verticle' && (
              <>
                <Range range={range} onChange={setRange} />
                {breakpoints.map(({ name, icon, width: breakpoint }) => (
                  <Breakpoint
                    key={name}
                    text={name}
                    icon={icon}
                    size={breakpoint}
                    active={width === breakpoint}
                    onClick={(width: string) => handleWidth(width)}
                  />
                ))}
                <strong className="inline-block w-20 rounded-lg bg-black py-2.5 text-center text-xs font-medium text-white">
                  @ {width}
                </strong>
              </>
            )}
            {code && (
              <div className="flex items-center gap-4">
                <Direction direction={direction} onClick={setDirection} />
                <Copy code={code} />
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          {!code && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg bg-white"
              aria-hidden="true"
            >
              <IconLoading />
            </div>
          )}

          <div className={clsx('flex', isHorizontal ? 'flex-row' : 'flex-col')}>
            <div className={bw}>
              <iframe
                className="h-[200px] w-full border-r-0 bg-white ring-1 ring-black lg:h-[400px] lg:transition-all"
                loading="lazy"
                srcDoc={html}
                style={{ maxWidth: width }}
                title={`${title!} Component`}
              ></iframe>
            </div>

            <div className={bw}>
              <ul className="flex border-b border-gray-100">
                {tabs.map(tab => (
                  <li key={tab} className="max-w-fit flex-1">
                    <a
                      className={`relative block cursor-pointer pb-2 ${
                        isHorizontal ? 'pt-0' : 'pt-2'
                      }`}
                      onClick={() => handleTab(tab)}
                    >
                      {tab === activeTab && (
                        <span className="absolute inset-x-0 -bottom-px h-[2px] w-full bg-orange-500"></span>
                      )}
                      <div className="flex items-center justify-center px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 flex-shrink-0 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                        <span className="ml-3 text-sm font-medium text-gray-900">
                          {' '}
                          {tab}{' '}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              {activeTab && (
                <div>
                  <pre className="h-[200px] overflow-auto p-4 lg:h-[372px]">
                    <code className={`language-${suffix}`}>
                      {Array.isArray(item) ? codeRef.current[activeTab] : code}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
