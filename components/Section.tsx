'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { Translations } from '@/lib/data';

export function Section({
  titleKey,
  subKey,
  href,
  children
}: {
  titleKey: keyof Translations;
  subKey: keyof Translations;
  href: string;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <section className="mt-14">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="disp text-3xl font-bold">{t(titleKey)}</h2>
          <p className="text-sm" style={{ color: 'var(--mute)' }}>
            {t(subKey)}
          </p>
        </div>
        <Link href={href} className="btn2">
          {t('more')}
        </Link>
      </div>
      {children}
    </section>
  );
}
