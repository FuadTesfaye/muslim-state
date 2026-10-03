'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Translations } from '@/lib/data';

export function PageHead({
  titleKey,
  subKey
}: {
  titleKey: keyof Translations;
  subKey: keyof Translations;
}) {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <h1 className="disp text-4xl md:text-5xl font-bold">{t(titleKey)}</h1>
      <p className="mt-2 max-w-2xl" style={{ color: 'var(--mute)' }}>
        {t(subKey)}
      </p>
    </div>
  );
}
