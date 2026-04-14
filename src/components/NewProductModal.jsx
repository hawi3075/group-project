import { useState, useRef } from "react"
import { X, Upload } from "lucide-react"

export function NewProductModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    classification: "",
    color: "",
    stock: 0,
    price: 0,
    specs: "",
    image: "",
  })
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) : value,
    }))
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      
      // Store the file or convert to base64 for submission
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      image: formData.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
    })
    // Reset form
    setFormData({
      name: "",
      classification: "",
      color: "",
      stock: 0,
      price: 0,
      specs: "",
      image: "",
    })
    setImagePreview(null)
    onClose()
  }

  const handleClose = () => {
    // Clean up preview URL to prevent memory leaks
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setImagePreview(null)
    setFormData({
      name: "",
      classification: "",
      color: "",
      stock: 0,
      price: 0,
      specs: "",
      image: "",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">
              NEW PRODUCT
            </h2>
            <p className="text-xs tracking-widest text-zinc-400">
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
          {/* Image Upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <div
            onClick={handleImageClick}
            className="mb-6 flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 transition-colors hover:border-zinc-400 overflow-hidden"
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
                <p className="mt-2 text-xs font-medium tracking-wide text-zinc-400">
                  SELECT VISUAL ASSET
                </p>
              </>
            )}
          </div>

          {/* Form Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-400">
                PRODUCT NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item name"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-400">
                CLASSIFICATION
              </label>
              <input
                type="text"
                name="classification"
                value={formData.classification}
                onChange={handleChange}
                placeholder="Electronics..."
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-400">
              PRODUCT COLOR
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Midnight Black, Pearl White"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400"
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-400">
                INVENTORY LEVEL
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-400">
                UNIT PRICE ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium tracking-wide text-zinc-400">
              TECHNICAL SPECS
            </label>
            <textarea
              name="specs"
              value={formData.specs}
              onChange={handleChange}
              placeholder="Enter product details..."
              rows={3}
              className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400"
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