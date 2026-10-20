'use client';

import { HomeHeader } from '@/components/layout/home-header';

// O site público usa só o HomeHeader. O antigo LegacyHeader (com login de
// cliente) saiu junto com o login do site público (decisão D2).
export function Header() {
  return <HomeHeader />;
}
