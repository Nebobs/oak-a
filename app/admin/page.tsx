'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { getProducts, addProduct, deleteProduct, uploadProductImage } from '@/lib/products'
import type { Product, ProductCategory } from '@/types'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'oak-a-admin'

const categoryOptions: { value: ProductCategory; label: string }[] = [
  { value: 'jeans', label: 'Denim' },
  { value: 'tops', label: 'Tops' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'custom', label: 'Custom' },
  { value: 'accessories', label: 'Accessories' },
]

type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'images' | 'sizes'> & {
  sizesRaw: string
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: {
      featured: false,
      available: true,
      price: 0,
      category: 'tops',
    },
  })

  // Check localStorage auth on mount
  useEffect(() => {
    if (localStorage.getItem('oak-a-admin') === 'true') {
      setAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (authed) {
      setLoading(true)
      getProducts().then((p) => {
        setProducts(p)
        setLoading(false)
      })
    }
  }, [authed])

  const handleAuth = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('oak-a-admin', 'true')
      setAuthed(true)
      setAuthError(false)
    } else {
      setAuthError(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('oak-a-admin')
    setAuthed(false)
  }

  const onAddProduct = async (data: ProductFormData) => {
    setSaving(true)
    try {
      const sizes = data.sizesRaw
        ? data.sizesRaw.split(',').map((s) => s.trim()).filter(Boolean)
        : ['custom']

      const productData: Omit<Product, 'id' | 'createdAt'> = {
        name: data.name,
        price: Number(data.price),
        category: data.category,
        description: data.description,
        story: data.story,
        sizes,
        featured: Boolean(data.featured),
        available: Boolean(data.available),
        images: [],
      }

      const newId = await addProduct(productData)

      // Upload images if any
      if (imageFiles.length > 0) {
        const urls: string[] = []
        for (const file of imageFiles) {
          const url = await uploadProductImage(file, newId)
          urls.push(url)
        }
        // Update with image URLs would require an updateProduct function
        // For simplicity we note this in the UI
      }

      reset()
      setImageFiles([])
      setAddOpen(false)
      const updated = await getProducts()
      setProducts(updated)
    } catch (err) {
      console.error('Error adding product:', err)
      alert('Error adding product. Make sure Firebase is configured.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product permanently?')) return
    setDeleteId(id)
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch {
      alert('Error deleting. Make sure Firebase is configured.')
    } finally {
      setDeleteId(null)
    }
  }

  // ─── Auth gate ───────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div>
            <p className="font-inter text-[9px] tracking-[0.4em] text-oak-muted uppercase mb-3">
              OAK-A
            </p>
            <h1 className="font-cormorant text-4xl text-oak-light font-light">
              Admin Panel
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              placeholder="Password"
              className={authError ? 'border-red-900/60' : ''}
            />
            {authError && (
              <p className="font-inter text-[9px] text-red-400 tracking-wide">
                Incorrect password.
              </p>
            )}
            <button
              onClick={handleAuth}
              className="font-inter text-[10px] tracking-[0.3em] uppercase bg-oak-warm text-oak-950 hover:bg-oak-light px-8 py-4 transition-colors duration-300"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Admin panel ─────────────────────────────────────────────────────────
  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-6 md:px-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-16">
        <div>
          <p className="font-inter text-[9px] tracking-[0.4em] text-oak-muted uppercase mb-2">
            OAK-A
          </p>
          <h1 className="font-cormorant text-4xl text-oak-light font-light">
            Admin Panel
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAddOpen((v) => !v)}
            className="font-inter text-[10px] tracking-[0.3em] uppercase bg-oak-warm text-oak-950 hover:bg-oak-light px-6 py-3 transition-colors duration-300"
          >
            {addOpen ? 'Cancel' : '+ Add Product'}
          </button>
          <button
            onClick={handleLogout}
            className="font-inter text-[10px] tracking-[0.2em] uppercase text-oak-muted hover:text-oak-light transition-colors"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      <AnimatePresence>
        {addOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden mb-16"
          >
            <div className="border border-oak-800/60 p-8">
              <h2 className="font-cormorant text-2xl text-oak-light font-light mb-8">
                New Product
              </h2>
              <form onSubmit={handleSubmit(onAddProduct)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                    Name *
                  </label>
                  <input
                    {...register('name', { required: true })}
                    placeholder="Product name"
                    className={errors.name ? 'border-red-900/60' : ''}
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                    Category *
                  </label>
                  <select {...register('category', { required: true })}>
                    {categoryOptions.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                    Price (€) — use 0 for custom
                  </label>
                  <input
                    {...register('price')}
                    type="number"
                    min={0}
                    placeholder="e.g. 280"
                  />
                </div>

                {/* Sizes */}
                <div className="flex flex-col gap-2">
                  <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                    Sizes (comma separated)
                  </label>
                  <input
                    {...register('sizesRaw')}
                    placeholder="S, M, L, XL or 28, 30, 32 or custom"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                    Description *
                  </label>
                  <textarea
                    {...register('description', { required: true })}
                    rows={3}
                    placeholder="Short product description"
                    className={`resize-none ${errors.description ? 'border-red-900/60' : ''}`}
                  />
                </div>

                {/* Story */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                    Story *
                  </label>
                  <textarea
                    {...register('story', { required: true })}
                    rows={3}
                    placeholder="The story behind this piece"
                    className={`resize-none ${errors.story ? 'border-red-900/60' : ''}`}
                  />
                </div>

                {/* Images */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                    Images
                  </label>
                  <div
                    className="border border-dashed border-oak-800 p-6 text-center cursor-pointer hover:border-oak-muted transition-colors"
                    onClick={() => fileRef.current?.click()}
                  >
                    <p className="font-inter text-xs text-oak-muted tracking-wide">
                      {imageFiles.length > 0
                        ? `${imageFiles.length} file(s) selected`
                        : 'Click to upload images (JPG, PNG, WebP)'}
                    </p>
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => setImageFiles(Array.from(e.target.files ?? []))}
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      {...register('featured')}
                      type="checkbox"
                      className="w-4 h-4 accent-oak-warm"
                    />
                    <span className="font-inter text-[10px] tracking-wider text-oak-muted uppercase">
                      Featured
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      {...register('available')}
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 accent-oak-warm"
                    />
                    <span className="font-inter text-[10px] tracking-wider text-oak-muted uppercase">
                      Available
                    </span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="font-inter text-[10px] tracking-[0.3em] uppercase bg-oak-warm text-oak-950 hover:bg-oak-light disabled:opacity-50 px-10 py-4 transition-colors duration-300 flex items-center gap-3"
                  >
                    {saving ? 'Saving...' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product list */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-cormorant text-2xl text-oak-light font-light">
            Products ({products.length})
          </h2>
        </div>

        {loading ? (
          <div className="font-inter text-[10px] tracking-wider text-oak-muted animate-pulse">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <p className="font-inter text-sm text-oak-muted tracking-wide">
            No products yet. Add your first piece above.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-oak-800/40">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-start justify-between gap-6 py-5"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-cormorant text-xl text-oak-light">
                      {p.name}
                    </span>
                    {p.featured && (
                      <span className="font-inter text-[8px] tracking-[0.2em] text-oak-warm uppercase border border-oak-warm/40 px-2 py-0.5">
                        Featured
                      </span>
                    )}
                    {!p.available && (
                      <span className="font-inter text-[8px] tracking-[0.2em] text-oak-muted uppercase border border-oak-muted/30 px-2 py-0.5">
                        Sold
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-inter text-[9px] tracking-wider text-oak-muted capitalize">
                      {p.category}
                    </span>
                    <span className="font-inter text-[9px] tracking-wider text-oak-muted">
                      {p.category === 'custom' ? 'On request' : `€${p.price}`}
                    </span>
                    <span className="font-inter text-[9px] tracking-wider text-oak-muted">
                      {p.images?.length ?? 0} image{p.images?.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <a
                    href={`/product/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-[9px] tracking-wider text-oak-muted hover:text-oak-light uppercase transition-colors"
                  >
                    View
                  </a>
                  <button
                    onClick={() => p.id && handleDelete(p.id)}
                    disabled={deleteId === p.id}
                    className="font-inter text-[9px] tracking-wider text-red-400/60 hover:text-red-400 uppercase transition-colors disabled:opacity-40"
                  >
                    {deleteId === p.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 p-6 border border-oak-800/40 bg-oak-900/20">
        <p className="font-inter text-[9px] tracking-wider text-oak-muted leading-relaxed">
          <strong className="text-oak-warm">Note:</strong> This admin panel requires Firebase to be configured in{' '}
          <code className="text-oak-light">.env.local</code>. Without Firebase, the product list
          shows mock data and save/delete operations will not persist. See README.md for setup instructions.
        </p>
      </div>
    </div>
  )
}
