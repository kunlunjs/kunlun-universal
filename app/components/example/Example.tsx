import clsx from 'clsx'
import prism from 'prismjs'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { IconLoading } from '~/components/icon/Loading'
import type { KLComponent } from '~/interface/component'
import { allBreakpoints } from '~/lib/breakpoints'
import { source } from '~/lib/component'
import { Breakpoint, Copy, Direction } from './buttons'
import { Range } from './Range'
import { Tags } from './Tags'

type ExampleProps = {
  item: KLComponent
  name: string
  spacing: string
}

export const Example: FC<ExampleProps> = ({ name, item, spacing }) => {
  const [code, setCode] = useState<string>()
  const [html, setHtml] = useState<string>()
  const [direction, setDirection] = useState<'horizontal' | 'verticle'>(
    'horizontal'
  )
  const [width, setWidth] = useState<string>('100%')
  const [range, setRange] = useState<number>(1348)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  })

  const breakpoints = allBreakpoints

  const { id, title, spacing: space, tags } = item

  const slug = title.toLowerCase().replace(/\s/g, '-')

  const componentSpacing: string = space ? space : spacing

  useEffect(() => {
    async function fetchHtml() {
      const response = await fetch(`/components/${name}/${id}.html`)
      const text = await response.text()

      setCode(text)
      setHtml(source(text, componentSpacing))

      return
    }

    if (inView) {
      fetchHtml()
    }
  }, [inView])

  useEffect(() => {
    prism.highlightAll()
  })

  useEffect(() => {
    range === 1348 ? setWidth('100%') : setWidth(`${range}px`)
  }, [range])

  const handleWidth = (width: string) => {
    setWidth(width)

    width === '100%'
      ? setRange(1348)
      : setRange(Number(width.replace('px', '')))
  }

  const bw = direction === 'horizontal' ? 'w-1/2' : 'w-full'

  return (
    <div className="-mt-20 pt-20" ref={ref} id={slug}>
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

              {title}
            </a>
          </h2>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Range range={range} onChange={setRange} />

            {breakpoints.map(({ name, icon, width: breakpoint }) => (
              <Breakpoint
                key={name}
                text={name}
                icon={icon}
                size={breakpoint}
                onClick={(width: string) => handleWidth(width)}
                active={width === breakpoint}
              />
            ))}

            <strong className="inline-block w-20 rounded-lg bg-black py-2.5 text-center text-xs font-medium text-white">
              @ {width}
            </strong>
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

          <div
            className={clsx(
              'flex',
              direction === 'horizontal' ? 'flex-row' : 'flex-col'
            )}
          >
            <div className={bw}>
              <iframe
                className="h-[200px] w-full border-r-0 bg-white ring-2 ring-black lg:h-[400px] lg:transition-all"
                loading="lazy"
                srcDoc={html}
                style={{ maxWidth: width }}
                title={`${title} Component`}
              ></iframe>
            </div>

            <div className={bw}>
              <pre className="h-[200px] overflow-auto p-4 ring-2 ring-black lg:h-[400px]">
                <code className="language-html">{code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
