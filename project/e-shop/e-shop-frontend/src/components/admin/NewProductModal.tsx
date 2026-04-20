import { useState, useRef } from "react"
import { X, Upload } from "lucide-react"

// Define the available sizes
const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size"] as const
type Size = typeof AVAILABLE_SIZES[number]

// Define the form data type
type FormDataType = {
  name: string
  classification: string
  color: string
  sizes: Size[]
  stock: number
  price: number
  specs: string
  image: string
}

// Define the props for the modal
type NewProductModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: FormDataType) => void
}

// Default image URL for fallback
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"

export function NewProductModal({ isOpen, onClose, onSubmit }: NewProductModalProps) {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    classification: "",
    color: "",
    sizes: [],
    stock: 0,
    price: 0,
    specs: "",
    image: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) : value,
    }))
  }

  const handleSizeToggle = (size: Size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }))
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      image: formData.image || DEFAULT_IMAGE,
    })
    // Reset form after submission
    setFormData({
      name: "",
      classification: "",
      color: "",
      sizes: [],
      stock: 0,
      price: 0,
      specs: "",
      image: "",
    })
    setImagePreview(null)
    onClose()
  }

  const handleClose = () => {
    // Clean up object URL to prevent memory leaks
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setImagePreview(null)
    setFormData({
      name: "",
      classification: "",
      color: "",
      sizes: [],
      stock: 0,
      price: 0,
      specs: "",
      image: "",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">
              NEW PRODUCT
            </h2>
            <p className="text-xs tracking-widest text-zinc-500">
              INVENTORY MANAGEMENT PROTOCOL
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onClick={handleImageClick}
            className="mb-6 flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 transition-colors hover:border-zinc-400 overflow-hidden"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <Upload className="h-6 w-6 text-zinc-400" />
                <p className="mt-2 text-xs font-medium tracking-wide text-zinc-500">
                  SELECT VISUAL ASSET
                </p>
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-500">
                PRODUCT NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item name"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-500"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-500">
                CLASSIFICATION
              </label>
              <input
                type="text"
                name="classification"
                value={formData.classification}
                onChange={handleChange}
                placeholder="Electronics..."
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-500">
              PRODUCT COLOR
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Midnight Black, Pearl White"
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-500"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-xs font-medium tracking-wide text-zinc-500">
              AVAILABLE SIZES
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    formData.sizes.includes(size)
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {formData.sizes.length > 0 && (
              <p className="mt-2 text-xs text-zinc-500">
                Selected: {formData.sizes.join(", ")}
              </p>
            )}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-500">
                INVENTORY LEVEL
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-500">
                UNIT PRICE ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-500">
              TECHNICAL SPECS
            </label>
            <textarea
              name="specs"
              value={formData.specs}
              onChange={handleChange}
              placeholder="Enter product details..."
              rows={3}
              className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            ADD PRODUCT
          </button>
        </form>
      </div>
    </div>
  )
}