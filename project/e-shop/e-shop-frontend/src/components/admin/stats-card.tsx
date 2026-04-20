// stats-card.tsx
import { ArrowUp, ArrowDown } from "lucide-react"

type StatsCardProps = {
  label: string
  value: string | number
  change?: number
  icon?: React.ReactNode
}

export function StatsCard({ label, value, change, icon }: StatsCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0
  
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-zinc-200">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium tracking-widest text-zinc-500">
          {label}
        </p>
        {icon && <div className="text-zinc-400">{icon}</div>}
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-black text-zinc-900">{value}</span>
        {change && (
          <span className={`text-sm font-semibold flex items-center gap-1 ${
            isPositive ? "text-emerald-500" : isNegative ? "text-red-500" : "text-zinc-500"
          }`}>
            {isPositive && <ArrowUp className="h-3 w-3" />}
            {isNegative && <ArrowDown className="h-3 w-3" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  )
}