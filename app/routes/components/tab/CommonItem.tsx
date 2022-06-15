import {
  WindowsOutlined,
  DownloadOutlined,
  DislikeOutlined
} from '@ant-design/icons'
import 'antd/dist/antd.css'
export default function CommonItem() {
  return (
    <div
      className="hwb(225deg 91% 7%) hover:scale-102 border-2 border-solid bg-white p-2
    leading-[4rem] transition delay-150 duration-300 hover:-translate-y-1  hover:shadow-lg"
    >
      <a
        href="https://macwk.com/soft/bartender-4"
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex items-center px-8">
          <WindowsOutlined />
          <p className="px-4">
            {/* <Rate allowHalf defaultValue={2.5} /> */}
            <span>方便的管理菜单栏图标</span>
          </p>
          <div>
            <DownloadOutlined />
            <DislikeOutlined />
          </div>
        </div>
      </a>
    </div>
  )
}
