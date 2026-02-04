'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DiscountBadge from './DiscountBadge';
import { useCartStore } from '@/lib/store/cartStore';
import { useGamification } from '@/lib/hooks/useGamification';
import { getRankDiscount } from '@/lib/constants/ranks';
import { createOrder } from '@/lib/api/woocommerce';
import type { BillingAddress, CheckoutLineItem } from '@/types/woocommerce';

interface CheckoutProps {
  onSuccess: (orderId: number) => void;
  onBack: () => void;
}

export default function Checkout({ onSuccess, onBack }: CheckoutProps) {
  const { items, clearCart, getSubtotal } = useCartStore();
  const { gamification } = useGamification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'ES',
    payment_method: 'bacs',
  });

  // Get user rank and discount
  const rankSlug = gamification?.rank?.slug || 'novicia-normativa';
  const rankData = getRankDiscount(rankSlug);

  // Calculate totals
  const subtotal = getSubtotal();
  const discountAmount = (subtotal * rankData.discount) / 100;
  const total = subtotal - discountAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const billing: BillingAddress = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        address_1: formData.address_1,
        address_2: formData.address_2,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode,
        country: formData.country,
      };

      const line_items: CheckoutLineItem[] = items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const order = await createOrder({
        billing,
        shipping: billing,
        payment_method: formData.payment_method,
        payment_method_title: formData.payment_method === 'bacs' ? 'Transferencia Bancaria' : 'Tarjeta de Crédito',
        set_paid: false,
        line_items,
      });

      clearCart();
      onSuccess(order.id);
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Error al procesar el pedido. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b-2 border-gray-400 pb-3">
        <h2 className="font-vcr text-2xl text-purple-600">💳 Checkout</h2>
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="border-2 bg-[#c0c0c0] px-3 py-1 font-vt323 text-base hover:bg-[#dfdfdf] disabled:opacity-50"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          ← Volver al carrito
        </button>
      </div>

      <div className="flex flex-1 gap-6 overflow-auto">
        {/* Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Info */}
            <div className="space-y-3 rounded border-2 border-gray-400 bg-white p-4">
              <h3 className="font-vt323 text-lg font-bold text-gray-800">
                Información Personal
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-vt323 text-sm text-gray-700">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full border-2 px-3 py-2 font-vt323 text-base focus:outline-none"
                    style={{
                      borderTop: '2px solid #808080',
                      borderLeft: '2px solid #808080',
                      borderRight: '2px solid #fff',
                      borderBottom: '2px solid #fff',
                    }}
                  />
                </div>

                <div>
                  <label className="mb-1 block font-vt323 text-sm text-gray-700">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full border-2 px-3 py-2 font-vt323 text-base focus:outline-none"
                    style={{
                      borderTop: '2px solid #808080',
                      borderLeft: '2px solid #808080',
                      borderRight: '2px solid #fff',
                      borderBottom: '2px solid #fff',
                    }}
                  />
                </div>

                <div>
                  <label className="mb-1 block font-vt323 text-sm text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 px-3 py-2 font-vt323 text-base focus:outline-none"
                    style={{
                      borderTop: '2px solid #808080',
                      borderLeft: '2px solid #808080',
                      borderRight: '2px solid #fff',
                      borderBottom: '2px solid #fff',
                    }}
                  />
                </div>

                <div>
                  <label className="mb-1 block font-vt323 text-sm text-gray-700">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 px-3 py-2 font-vt323 text-base focus:outline-none"
                    style={{
                      borderTop: '2px solid #808080',
                      borderLeft: '2px solid #808080',
                      borderRight: '2px solid #fff',
                      borderBottom: '2px solid #fff',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3 rounded border-2 border-gray-400 bg-white p-4">
              <h3 className="font-vt323 text-lg font-bold text-gray-800">
                Dirección de Envío
              </h3>

              <div>
                <label className="mb-1 block font-vt323 text-sm text-gray-700">
                  Dirección *
                </label>
                <input
                  type="text"
                  name="address_1"
                  required
                  value={formData.address_1}
                  onChange={handleChange}
                  className="w-full border-2 px-3 py-2 font-vt323 text-base focus:outline-none"
                  style={{
                    borderTop: '2px solid #808080',
                    borderLeft: '2px solid #808080',
                    borderRight: '2px solid #fff',
                    borderBottom: '2px solid #fff',
                  }}
                />
              </div>

              <div>
                <label className="mb-1 block font-vt323 text-sm text-gray-700">
                  Dirección 2 (opcional)
                </label>
                <input
                  type="text"
                  name="address_2"
                  value={formData.address_2}
                  onChange={handleChange}
                  className="w-full border-2 px-3 py-2 font-vt323 text-base focus:outline-none"
                  style={{
                    borderTop: '2px solid #808080',
                    borderLeft: '2px solid #808080',
                    borderRight: '2px solid #fff',
                    borderBottom: '2px solid #fff',
                  }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block font-vt323 text-sm text-gray-700">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border-2 px-3 py-2 font-vt323 text-base focus:outline-none"
                    style={{
                      borderTop: '2px solid #808080',
                      borderLeft: '2px solid #808080',
                      borderRight: '2px solid #fff',
                      borderBottom: '2px solid #fff',
                    }}
                  />
                </div>

                <div>
                  <label className="mb-1 block font-vt323 text-sm text-gray-700">
                    Provincia *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border-2 px-3 py-2 font-vt323 text-base focus:outline-none"
                    style={{
                      borderTop: '2px solid #808080',
                      borderLeft: '2px solid #808080',
                      borderRight: '2px solid #fff',
                      borderBottom: '2px solid #fff',
                    }}
                  />
                </div>

                <div>
                  <label className="mb-1 block font-vt323 text-sm text-gray-700">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    required
                    value={formData.postcode}
                    onChange={handleChange}
                    className="w-full border-2 px-3 py-2 font-vt323 text-base focus:outline-none"
                    style={{
                      borderTop: '2px solid #808080',
                      borderLeft: '2px solid #808080',
                      borderRight: '2px solid #fff',
                      borderBottom: '2px solid #fff',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 rounded border-2 border-gray-400 bg-white p-4">
              <h3 className="font-vt323 text-lg font-bold text-gray-800">
                Método de Pago
              </h3>

              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="w-full border-2 bg-white px-3 py-2 font-vt323 text-base focus:outline-none"
                style={{
                  borderTop: '2px solid #808080',
                  borderLeft: '2px solid #808080',
                  borderRight: '2px solid #fff',
                  borderBottom: '2px solid #fff',
                }}
              >
                <option value="bacs">Transferencia Bancaria</option>
                <option value="card">Tarjeta de Crédito</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded border-2 border-red-600 bg-red-50 p-3">
                <p className="font-vt323 text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border-2 bg-purple-600 px-6 py-4 font-vcr text-xl text-white hover:bg-purple-700 active:bg-purple-800 disabled:opacity-50"
              style={{
                borderTop: '2px solid #fff',
                borderLeft: '2px solid #fff',
                borderRight: '2px solid #808080',
                borderBottom: '2px solid #808080',
              }}
            >
              {isSubmitting ? '⏳ Procesando...' : `💳 Realizar Pedido - €${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-0 space-y-3">
            <h3 className="font-vt323 text-lg font-bold text-gray-800">
              Resumen del Pedido
            </h3>

            {/* Rank Discount Badge */}
            {rankData.discount > 0 && (
              <DiscountBadge
                emoji={rankData.emoji}
                name={rankData.name}
                discount={rankData.discount}
              />
            )}

            {/* Items */}
            <div className="space-y-2 rounded border-2 border-gray-400 bg-white p-3">
              {items.map((item) => (
                <div key={item.key} className="flex justify-between font-vt323 text-sm">
                  <span>
                    {item.quantity}x {item.product.name}
                  </span>
                  <span>€{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 rounded border-2 border-gray-400 bg-white p-3">
              <div className="flex justify-between font-vt323 text-base">
                <span>Subtotal:</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>

              {rankData.discount > 0 && (
                <div className="flex justify-between font-vt323 text-base text-green-600">
                  <span>Descuento (-{rankData.discount}%):</span>
                  <span>-€{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between border-t-2 border-gray-400 pt-2 font-vcr text-xl text-purple-600">
                <span>Total:</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
