'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SuccessModalProps {
  orderId: number;
  onClose: () => void;
}

export default function SuccessModal({ orderId, onClose }: SuccessModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-md border-2 bg-[#c0c0c0] p-6 shadow-2xl"
        style={{
          borderTop: '2px solid #fff',
          borderLeft: '2px solid #fff',
          borderRight: '2px solid #808080',
          borderBottom: '2px solid #808080',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="mb-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-6xl"
          >
            ✅
          </motion.div>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-center font-vcr text-2xl text-purple-600">
          ¡Pedido Realizado!
        </h2>

        {/* Message */}
        <div className="mb-6 space-y-2 rounded border-2 border-gray-400 bg-white p-4 text-center">
          <p className="font-vt323 text-lg text-gray-800">
            Tu pedido ha sido procesado exitosamente.
          </p>
          <p className="font-vt323 text-base text-gray-600">
            Número de orden: <strong className="text-purple-600">#{orderId}</strong>
          </p>
          <p className="font-vt323 text-sm text-gray-500">
            Recibirás un email de confirmación pronto.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full border-2 bg-purple-600 px-6 py-3 font-vt323 text-lg text-white hover:bg-purple-700 active:bg-purple-800"
          style={{
            borderTop: '2px solid #fff',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #808080',
            borderBottom: '2px solid #808080',
          }}
        >
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );
}
