'use client';
import React from 'react';

export function handleCardGlowMove(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--mouse-x', x + 'px');
  e.currentTarget.style.setProperty('--mouse-y', y + 'px');
}
