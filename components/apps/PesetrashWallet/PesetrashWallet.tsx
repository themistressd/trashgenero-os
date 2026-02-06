'use client';

import React from 'react';

const transactions = [
  { id: 'tx-1', label: 'Compra en Trashtienda', amount: -120, date: '12 Oct' },
  { id: 'tx-2', label: 'Ritual completado', amount: 50, date: '10 Oct' },
  { id: 'tx-3', label: 'Bonus diario', amount: 20, date: '09 Oct' },
];

export default function PesetrashWallet() {
  return (
    <div className="flex h-full flex-col gap-4 bg-[#c0c0c0] p-4">
      <div className="border-b-2 border-[#808080] pb-3">
        <div className="font-vcr text-2xl text-bubblegum-pink">Pesetrash.exe</div>
        <div className="font-vt323 text-sm text-gray-700">
          Wallet oficial de la Secta: saldo y movimientos.
        </div>
      </div>

      <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
        <div className="font-vt323 text-xs text-gray-600">Saldo actual</div>
        <div className="font-vcr text-3xl text-green-700">🪙 5,420</div>
      </div>

      <div className="rounded border-2 border-[#808080] bg-[#dfdfdf] p-4">
        <div className="mb-3 font-vcr text-lg text-gray-800">Movimientos recientes</div>
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between border border-[#808080] bg-white px-3 py-2 font-vt323 text-sm"
            >
              <div>
                <div className="text-gray-800">{transaction.label}</div>
                <div className="text-xs text-gray-500">{transaction.date}</div>
              </div>
              <div className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                {transaction.amount < 0 ? '' : '+'}
                {transaction.amount} 🪙
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
