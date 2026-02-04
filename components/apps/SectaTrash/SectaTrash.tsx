'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InventoryTab from './InventoryTab';
import StatsTab from './StatsTab';
import RanksTab from './RanksTab';
import AchievementsTab from './AchievementsTab';

type TabType = 'inventory' | 'stats' | 'ranks' | 'achievements';

interface Tab {
  id: TabType;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: 'inventory', label: 'Inventario', icon: '🪙' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'ranks', label: 'Ranks', icon: '🎖️' },
  { id: 'achievements', label: 'Logros', icon: '🏆' },
];

export default function SectaTrash() {
  const [activeTab, setActiveTab] = useState<TabType>('inventory');

  return (
    <div className="flex h-full flex-col bg-[#c0c0c0]">
      {/* Tabs Header */}
      <div className="flex border-b-2 border-[#808080]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 font-vt323 text-base transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-[#c0c0c0] bg-[#c0c0c0] text-gray-800'
                : 'border-2 border-[#808080] bg-[#dfdfdf] text-gray-600 hover:bg-[#c0c0c0]'
            }`}
            style={{
              borderTop: '2px solid #fff',
              borderLeft: '2px solid #fff',
              borderRight: '2px solid #808080',
              ...(activeTab === tab.id && {
                borderBottom: '2px solid #c0c0c0',
                marginBottom: '-2px',
              }),
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            
            {/* Active indicator */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-bubblegum-pink"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto bg-[#c0c0c0]">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {activeTab === 'inventory' && <InventoryTab />}
          {activeTab === 'stats' && <StatsTab />}
          {activeTab === 'ranks' && <RanksTab />}
          {activeTab === 'achievements' && <AchievementsTab />}
        </motion.div>
      </div>
    </div>
  );
}
