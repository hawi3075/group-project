import { useState } from "react"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { NewProductModal } from "./NewProductModal"
import { EditProductModal } from "./EditProductModal"
import type { Product } from "./EditProductModal"

// Type for new product input (without id and sizes)
type NewProductInput = {
  name: string
  color: string
  classification: string
  specs: string
  stock: number
  price: number
  image: string
}

const initialProducts: Product[] = [
  {
    id: "QB-9021",
    name: "VAPORMAX FLYKNIT 3",
    color: "MIDNIGHT BLACK",
    classification: "FOOTWEAR",
    specs: "Premium running shoes.",
    stock: 482,
    price: 189,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
    sizes: ["M", "L", "XL"],
  },
  {
    id: "QB-9022",
    name: "STUDIO PRO WIRELESS",
    color: "PEARL WHITE",
    classification: "ELECTRONICS",
    specs: "High-quality wireless headphones.",
    stock: 12,
    price: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    sizes: ["One Size"],
  },
  {
    id: "QB-9023",
    name: "CHRONOS GEN-Z",
    color: "SPACE GRAY",
    classification: "ELECTRONICS",
    specs: "Smart watch with health tracking.",
    stock: 0,
    price: 450,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop",
    sizes: ["S", "M", "L"],
  },
]

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalValue = products.reduce((sum, p) => sum + p.stock * p.price, 0)

  const handleAddProduct = (newProduct: NewProductInput) => {
    const id = `QB-${9024 + products.length}`
    setProducts([...products, { ...newProduct, id, sizes: [] }])
  }

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map((p) => 
      p.id === updatedProduct.id ? updatedProduct : p
    ))
  }

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== productId))
    }
  }

  return (
    <>
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-zinc-100">
              PRODUCT CATALOGUE
            </h1>
            <p className="mt-1 text-xs tracking-widest text-zinc-400">
              MANAGE YOUR GLOBAL INVENTORY THROUGH THE EFOY GEBYA TERMINAL.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            <Plus className="h-4 w-4" />
            ADD NEW PRODUCT
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3 text-zinc-400">
            <Search className="h-5 w-5" />
            <input
              type="text"
              placeholder="Search product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium tracking-wider text-zinc-400">
                <th className="pb-4">ID</th>
                <th className="pb-4">PRODUCT</th>
                <th className="pb-4">STOCK</th>
                <th className="pb-4">PRICE</th>
                <th className="pb-4">ACTIONS</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="py-4 text-sm text-zinc-400">{product.id}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-zinc-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-zinc-400">{product.color}</p>
                        {product.sizes && product.sizes.length > 0 && (
                          <p className="text-xs text-zinc-400">
                            Sizes: {product.sizes.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-medium text-zinc-900">
                    {product.stock}
                  </td>
                  <td className="py-4 text-sm font-medium text-zinc-900">
                    ${product.price}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setEditingProduct(product)}
                        className="text-zinc-400 hover:text-zinc-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-zinc-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-xs font-medium tracking-widest text-zinc-400">
              TOTAL VALUE
            </p>
            <p className="mt-2 text-4xl font-black text-emerald-500">
              ${totalValue.toLocaleString()}
            </p>
          </div>
         
        </div>
      </main>

      <NewProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
      />

      <EditProductModal
        product={editingProduct}
        isOpen={editingProduct !== null}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleEditProduct}
      />
    </>
  )
}