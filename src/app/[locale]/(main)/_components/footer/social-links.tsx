import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { app, socialLinks } from '@/core/config';

export default async function SocialLinks() {
  const t = await getTranslations('components.footer');

  return (
    <div className="flex flex-wrap justify-center gap-6 text-sm">
      {socialLinks.map((link) => (
        <Link
          href={link.href}
          aria-label={t('socialLink', { app: app.name, social: link.name })}
          key={link.name}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary block"
        >
          <HugeiconsIcon icon={link.icon} className="size-5" />
        </Link>
      ))}
    </div>
  );
}
