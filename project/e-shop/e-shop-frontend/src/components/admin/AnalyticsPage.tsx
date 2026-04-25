// AnalyticsPage.tsx
import { Package, Users, BarChart3 } from "lucide-react"

export function AnalyticsPage() {
  return (
    <main className="flex-1 p-8 bg-zinc-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-zinc-900">
          PERFORMANCE <span className="text-red-500">ANALYTICS</span>
        </h1>
        <p className="mt-1 text-xs tracking-widest text-zinc-500">
          Real-time financial synthesis and inventory velocity mapping.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
            <BarChart3 className="h-6 w-6 text-purple-500" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium tracking-widest text-zinc-500">TOTAL REVENUE</p>
            <p className="mt-2 text-4xl font-black text-zinc-900">$0</p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <Package className="h-6 w-6 text-blue-500" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium tracking-widest text-zinc-500">TOTAL ORDERS</p>
            <p className="mt-2 text-4xl font-black text-zinc-900">5</p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50">
            <Users className="h-6 w-6 text-amber-500" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium tracking-widest text-zinc-500">ACTIVE CUSTOMERS</p>
            <p className="mt-2 text-4xl font-black text-zinc-900">21</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Trends */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200 lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900">REVENUE TRENDS</h2>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-zinc-900">$0</span>
              <span className="text-xs text-zinc-500">Last 30 Days</span>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50">
            <div className="flex items-center gap-2 text-zinc-400">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm font-medium">Revenue chart visualization area</span>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="rounded-xl bg-zinc-900 p-6 text-white">
          <h2 className="text-sm font-bold tracking-tight text-zinc-400">TOP CATEGORIES</h2>
          <div className="mt-6 flex h-64 flex-col items-center justify-center rounded-lg bg-zinc-800/50">
            <p className="text-sm text-zinc-500">No category data available</p>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
        <h2 className="text-xl font-black tracking-tight text-zinc-900">TOP SELLING PRODUCTS</h2>
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50">
          <p className="text-sm text-zinc-400">No product data available</p>
        </div>
      </div>
    </main>
  )
}