'use client';

import React, { useEffect, useState } from 'react';

const formatTime = (date: Date) =>
  date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

export default function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return <span className="taskbar-clock">{formatTime(now)}</span>;
}
