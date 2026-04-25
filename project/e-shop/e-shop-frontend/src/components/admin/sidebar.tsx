import { LayoutGrid, Package, ShoppingCart, Users, BarChart3, User, ChevronLeft, type LucideIcon } from "lucide-react"

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
  onBack?: () => void  // ✅ Optional back handler
}

export function Sidebar({ activeItem, onItemClick, onBack }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-white text-zinc-900 border-r border-zinc-200">
      {/* Header with Back Button + Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {/* ✅ Back Button */}
          {onBack && (
            <button 
              onClick={onBack}
              className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
              title="Go back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          
          {/* ✅ Red "e" Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-lg">e</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-zinc-900">Efoy-Gebeya</span>
          </div>
        </div>
        
        <p className="text-xs tracking-widest text-zinc-500 ml-11">TERMINAL</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
              activeItem === item.id
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="border-t border-zinc-200 p-4">
        <button
          onClick={() => onItemClick("profile")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
            activeItem === "profile"
              ? "bg-zinc-100 text-zinc-900"
              : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          }`}
        >
          <User className="h-5 w-5" />
          
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-purple-500">
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
              SB
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-700 truncate">SIHAM BIRHANU</p>
            <p className="text-xs text-zinc-500 truncate">SYSTEM ADMIN</p>
          </div>
        </button>
      </div>
    </aside>
  )
}