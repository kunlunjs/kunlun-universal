import { useState } from 'react'
import Development from './Development'
export default function Tab() {
  const tabs = [
    { name: '开发相关', index: 0, isshow: true },
    { name: '设计相关', index: 1, isshow: true },
    { name: '音乐', index: 2, isshow: true },
    { name: '影视', index: 3, isshow: true },
    { name: '其它', index: 4, isshow: true }
  ]
  const [tab, setTab] = useState(0)
  const changeTabs = (val: number) => {
    setTab(val)
  }
  const showMain = (idx: number) => {
    switch (idx) {
      case 0:
        return <Development />
      case 1:
        return <div>我是tab {idx}</div>
      case 2:
        return <div>我是tab {idx}</div>
      case 3:
        return <div>我是tab {idx}</div>
      case 4:
        return <div>我是tab {idx}</div>
      default:
        break
    }
  }
  return (
    <div className="flex w-full">
      <ul className="m-8 w-200px hover:cursor-pointer">
        {tabs.map((item, idx) => {
          return (
            <li
              key={item.index}
              className={
                tab === idx
                  ? 'p-4 text-blue-600 hover:text-blue-600 '
                  : 'p-4 hover:text-blue-600'
              }
              onClick={() => {
                changeTabs(idx)
              }}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
      <section className="flex-1 m-4">{showMain(tab)}</section>
    </div>
  )
}
