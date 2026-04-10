import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from './firebase'
import type { Product } from '@/types'

// ─── Mock data (used when Firebase is not configured) ─────────────────────────

export const mockProducts: Product[] = [
  {
    id: 'mock-1',
    name: 'Raw Selvedge No.1',
    price: 280,
    category: 'jeans',
    description:
      'Hand-cut from a single bolt of Japanese selvedge denim. Unfinished edges, raw hems. Every pair carries unique wear patterns from the process of making.',
    story:
      'Three weeks of pattern work. A single bolt of fabric sourced from a small mill outside Osaka. The first real piece from the workshop, and the one that made everything feel possible.',
    images: [],
    sizes: ['28', '30', '32', '34'],
    featured: true,
    available: true,
  },
  {
    id: 'mock-2',
    name: 'Workshop Overshirt',
    price: 195,
    category: 'tops',
    description:
      'Heavy cotton canvas, hand-stitched bartacks, dropped shoulders. A work shirt elevated into something worth keeping.',
    story:
      'Inspired by the shirts worn in workshops and studios for generations. Clothes that work as hard as the people in them.',
    images: [],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
    available: true,
  },
  {
    id: 'mock-3',
    name: 'Commission — Custom Piece',
    price: 0,
    category: 'custom',
    description:
      'Your vision, realized by hand. Every detail discussed. Every measurement taken. One garment, made entirely for you.',
    story:
      'The purest expression of what OAK-A is. One person, one garment, built around the specific shape and life of its wearer.',
    images: [],
    sizes: ['custom'],
    featured: true,
    available: true,
  },
  {
    id: 'mock-4',
    name: 'Belgian Linen Shirt',
    price: 165,
    category: 'tops',
    description:
      'Washed Belgian linen, relaxed silhouette, hand-finished collar. Meant to be worn every day and look better for it.',
    story:
      'Started as a personal piece. Three different people asked to buy it before it was finished. So it became part of the collection.',
    images: [],
    sizes: ['S', 'M', 'L'],
    featured: false,
    available: true,
  },
  {
    id: 'mock-5',
    name: 'Carpenter Trouser',
    price: 240,
    category: 'jeans',
    description:
      'Wide-leg, heavy cotton canvas, utility pockets placed by hand. Work wear for people who make things.',
    story:
      'Built for movement. Built for making. Built to last longer than any trend that might surround it.',
    images: [],
    sizes: ['28', '30', '32', '34', '36'],
    featured: false,
    available: true,
  },
  {
    id: 'mock-6',
    name: 'Studio Coat',
    price: 420,
    category: 'outerwear',
    description:
      'Structured long coat in natural wool blend. Hand-felled seams, functioning horn buttons. A piece built for decades.',
    story:
      'The hardest thing I have ever made. Took four attempts to get the collar right. The one I am most proud of.',
    images: [],
    sizes: ['S', 'M', 'L'],
    featured: false,
    available: true,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isFirebaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
}

// ─── Read operations ──────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  if (!isFirebaseConfigured()) return mockProducts
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product)
  } catch {
    return mockProducts
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts()
  return all.filter((p) => p.featured && p.available)
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isFirebaseConfigured()) {
    return mockProducts.find((p) => p.id === id) ?? null
  }
  try {
    const snap = await getDoc(doc(db, 'products', id))
    if (!snap.exists()) return null
    return { id: snap.id, ...snap.data() } as Product
  } catch {
    return mockProducts.find((p) => p.id === id) ?? null
  }
}

// ─── Write operations (admin) ─────────────────────────────────────────────────

export async function addProduct(
  product: Omit<Product, 'id' | 'createdAt'>
): Promise<string> {
  const docRef = await addDoc(collection(db, 'products'), {
    ...product,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, 'products', id))
}

export async function uploadProductImage(
  file: File,
  productId: string
): Promise<string> {
  const storageRef = ref(storage, `products/${productId}/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}
