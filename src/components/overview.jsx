import { StatsCard } from "./stats-card"
import { RecentOrders } from "./recent-orders"
import { LiveInventory } from "./LiveInventory"

const stats = [
  { label: "REVENUE", value: "$142,840" },
  { label: "ORDERS", value: "8,432" },
  { label: "CUSTOMERS", value: "1,204" },
]

export function OverviewPage() {
  return (
    <main className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-zinc-100">
          TERMINAL OVERVIEW
        </h1>
        <p className="mt-1 text-xs tracking-widest text-zinc-400">
          OPERATIONAL METRICS ACROSS ALL DIGITAL TOUCHPOINTS.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Recent Orders */}
      <RecentOrders />

      {/* Live Inventory Stream */}
      <LiveInventory />
    </main>
  )
}