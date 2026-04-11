import Image from 'next/image';

import { app } from '@/core/config';
import { cn } from '@/ui/helpers/utils';

/**
 * Examples:
 * <Logo />
 * <Logo className="[--logo-size:2.5rem]" />
 * <Logo className="[&_span]:hidden sm:[&_span]:block" />
 * <Logo className="[--logo-size:20px] text-blue-600 [&_span]:text-sm" />
 */

interface Properties {
  className?: string; // Tout passe par ici désormais
}

export default function Logo({ className }: Properties) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="relative size-[var(--logo-size,1.5rem)] shrink-0">
        <Image src={app.logo} alt="Logo" fill className="object-contain" />
      </div>
      <span className="text-md truncate tracking-tight">{app.name}</span>
    </div>
  );
}
