import { LayoutGrid, Package, ShoppingCart, Users, BarChart3, type LucideIcon } from "lucide-react"

// Define the type for navigation items
type NavItem = {
  id: string
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { id: "overview", label: "OVERVIEW", icon: LayoutGrid },
  { id: "products", label: "PRODUCTS", icon: Package },
  { id: "orders", label: "ORDERS", icon: ShoppingCart },
  { id: "guests", label: "GUESTS", icon: Users },
  { id: "analytics", label: "ANALYTICS", icon: BarChart3 },
]

// Define the props for the Sidebar component
type SidebarProps = {
  activeItem: string
  onItemClick: (itemId: string) => void
}

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-zinc-900 text-white">
      <div className="p-6">
        <p className="text-xs tracking-widest text-zinc-400">TERMINAL</p>
        <h1 className="text-xl font-bold tracking-tight">EFOY GEBYA</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
              activeItem === item.id
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="border-t border-zinc-800 p-4">
        <button
          onClick={() => onItemClick("profile")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
            activeItem === "profile"
              ? "bg-zinc-800"
              : "hover:bg-zinc-800"
          }`}
        >
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
              SB
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-white">SIHAM BIRHANU</p>
            <p className="text-xs text-zinc-400">SYSTEM ADMIN</p>
          </div>
        </button>
      </div>
    </aside>
  )
}