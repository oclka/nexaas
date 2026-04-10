'use client';

import { Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useLocale } from 'next-intl';
import { ComponentProps } from 'react';

import { usePathname, useRouter } from '@/core/i18n/navigation';
import { supportedLocales } from '@/core/i18n/routing';
import { Button } from '@/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/components/ui/dropdown-menu';

export default function LocaleSwitcher({
  ...properties
}: Readonly<ComponentProps<typeof Button>>) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const code =
    supportedLocales.find((lang) => lang.code === locale)?.code ?? '';
  const currentCode = code.charAt(0).toUpperCase() + code.slice(1);

  const handleLocaleChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  const content = supportedLocales.map((lang) => (
    <DropdownMenuItem
      key={lang.code}
      onClick={() => handleLocaleChange(lang.code)}
    >
      {locale === lang.code && (
        <HugeiconsIcon
          icon={Tick02Icon}
          className="size-4"
          aria-hidden="true"
        />
      )}
      {lang.name}
    </DropdownMenuItem>
  ));

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button {...properties}>{currentCode}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{content}</DropdownMenuContent>
    </DropdownMenu>
  );
}
