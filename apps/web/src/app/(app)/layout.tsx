import { Navbar } from '@/components/nav/Navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </>
  )
}
