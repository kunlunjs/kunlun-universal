import type { FC, ReactNode } from 'react'
import { Footer } from '../global/Footer'
import { Header } from '../global/Header'

interface MainLayoutProps {
  children?: ReactNode
}

/**
 * 简单布局
 */
export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {/* 全屏表示如下： container h-screen w-screen */}
      {/* 4.25rem - Footer, 44px - Banner, 66px - Header */}
      <main className="min-h-[calc(100vh_-_4.25rem_-_44px_-_66px)]">
        {children}
      </main>
      <Footer />
    </>
  )
}
