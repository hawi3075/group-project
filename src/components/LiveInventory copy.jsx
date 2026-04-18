const products = [
  {
    id: "1",
    name: "NEOWATCH SERIES 7",
    price: "$799.00",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
  },
  {
    id: "2",
    name: "STUDIO BEATS PRO",
    price: "$349.00",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  },
  {
    id: "3",
    name: "PULSE RUNNER X",
    price: "$180.00",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  },
  {
    id: "4",
    name: "OPTIC 35MM CAM",
    price: "$1,120.00",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=400&fit=crop",
  },
]

export function LiveInventory() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-black tracking-tight text-zinc-100">
        LIVE INVENTORY STREAM
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-xl bg-zinc-800">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <p className="text-sm font-bold tracking-tight text-zinc-400">
                {product.name}
              </p>
              <p className="text-sm font-semibold text-zinc-400">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}