'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '@/components/PageWrapper'
import type { ContactFormData } from '@/types'

function ContactForm() {
  const searchParams = useSearchParams()
  const productFromQuery = searchParams.get('product') ?? ''

  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      productInterest: productFromQuery,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setSending(true)
    // Replace this with your email service (Resend, EmailJS, Formspree, etc.)
    // For now we simulate a successful send
    await new Promise((r) => setTimeout(r, 1200))
    console.log('Form submitted:', data)
    setSending(false)
    setSubmitted(true)
  }

  return (
    <PageWrapper>
      <div className="pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-10">

        {/* ─── Header ─────────────────────────────────────────────────── */}
        <div className="mb-20">
          <p className="font-inter text-[9px] tracking-[0.4em] text-oak-muted uppercase mb-4">
            OAK-A
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-oak-light font-light">
            Get in Touch
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ─── Left: context ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <p className="font-inter text-sm text-oak-muted leading-relaxed tracking-wide max-w-md">
              Whether you want to purchase something from the collection, commission
              a custom piece, or just want to know more about how something is made —
              this is the place to start.
            </p>

            <div className="flex flex-col gap-6">
              {[
                {
                  label: 'Response time',
                  value: 'Within 24 hours',
                },
                {
                  label: 'Instagram',
                  value: '@oak.a.label',
                  href: 'https://instagram.com',
                },
                {
                  label: 'For commissions',
                  value: 'Include your vision and sizing',
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="font-inter text-[9px] tracking-[0.25em] text-oak-muted uppercase">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-cormorant text-xl text-oak-light hover:text-oak-warm transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-cormorant text-xl text-oak-light">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Instagram CTA */}
            <div className="mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 font-inter text-[10px] tracking-[0.3em] text-oak-muted hover:text-oak-warm uppercase transition-colors duration-300"
              >
                Follow on Instagram
                <span className="w-8 h-px bg-current inline-block" />
              </a>
            </div>
          </div>

          {/* ─── Right: form ────────────────────────────────────────────── */}
          <div>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6 py-16"
                >
                  <div className="w-8 h-px bg-oak-warm" />
                  <h2 className="font-cormorant text-4xl text-oak-light font-light">
                    Message received.
                  </h2>
                  <p className="font-inter text-sm text-oak-muted leading-relaxed tracking-wide">
                    Thank you for reaching out. I will get back to you within 24 hours.
                    In the meantime, feel free to browse the collection.
                  </p>
                  <a
                    href="/shop"
                    className="font-inter text-[10px] tracking-[0.3em] text-oak-warm uppercase hover:text-oak-light transition-colors duration-300 w-fit"
                  >
                    Back to Shop →
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                      Name <span className="text-oak-warm">*</span>
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Your name"
                      className={errors.name ? 'border-red-900/60' : ''}
                    />
                    {errors.name && (
                      <span className="font-inter text-[9px] text-red-400 tracking-wide">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                      Email <span className="text-oak-warm">*</span>
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email',
                        },
                      })}
                      type="email"
                      placeholder="your@email.com"
                      className={errors.email ? 'border-red-900/60' : ''}
                    />
                    {errors.email && (
                      <span className="font-inter text-[9px] text-red-400 tracking-wide">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Product interest */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                      Piece of Interest
                    </label>
                    <input
                      {...register('productInterest')}
                      placeholder="Which piece are you asking about? (optional)"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                      Message <span className="text-oak-warm">*</span>
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={6}
                      placeholder="Tell me what you're looking for, your sizing, or anything else..."
                      className={`resize-none ${errors.message ? 'border-red-900/60' : ''}`}
                    />
                    {errors.message && (
                      <span className="font-inter text-[9px] text-red-400 tracking-wide">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Instagram (optional) */}
                  <div className="flex flex-col gap-2">
                    <label className="font-inter text-[9px] tracking-[0.3em] text-oak-muted uppercase">
                      Instagram Handle
                    </label>
                    <input
                      {...register('instagram')}
                      placeholder="@yourhandle (optional)"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-4 font-inter text-[10px] tracking-[0.35em] uppercase bg-oak-warm text-oak-950 hover:bg-oak-light disabled:opacity-50 disabled:cursor-not-allowed px-10 py-5 transition-colors duration-300 flex items-center justify-center gap-3"
                  >
                    {sending ? (
                      <>
                        <span className="w-3 h-3 border border-oak-950/40 border-t-oak-950 rounded-full animate-spin" />
                        Sending
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                  <p className="font-inter text-[9px] text-oak-muted/60 tracking-wider text-center">
                    No spam. No newsletters. Just a conversation.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  )
}
