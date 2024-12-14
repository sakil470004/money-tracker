// app/(dashboard)/layout.tsx
import { CurrencyProvider } from "@/context/currency-context"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <CurrencyProvider>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          <Sidebar />
        </div>
        <main className="md:pl-72">
          <Navbar />
          {children}
        </main>
      </div>
    </CurrencyProvider>
  )
}