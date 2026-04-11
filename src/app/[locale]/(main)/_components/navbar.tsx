'use client';

import { Cancel01Icon, Menu01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useScroll } from 'motion/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { navigation } from '@/core/config/navigation.config';
import LocaleSwitcher from '@/core/i18n/components/locale-switcher';
import Logo from '@/ui/components/logo';
import ThemeToggle from '@/ui/components/theme-toggle';
import { buttonVariants } from '@/ui/components/ui/button';
import { cn } from '@/ui/helpers/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const t = useTranslations();

  const items = navigation
    .flatMap((category) =>
      category.items.filter((item) => (item.order ?? 0) > 0),
    )
    .toSorted((a, b) => (a.order as number) - (b.order as number));

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) =>
      setScrolled(v > 0.05),
    );
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header className="fixed top-0 z-50 w-full font-sans" data-testid="navbar">
      <div
        className={cn(
          'absolute inset-0 -z-10 transition-all duration-300',
          scrolled
            ? 'bg-background/80 h-full border-b backdrop-blur-xl'
            : 'h-0 bg-transparent',
        )}
      />

      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="z-50 block size-fit shrink-0"
          aria-label={t('labels.backToHome')}
        >
          <Logo />
        </Link>

        <div
          data-testid="navbar-menu"
          className={cn(
            'transition-all duration-200 ease-out',
            'bg-background fixed top-18 right-6 left-6 flex flex-col gap-2 rounded-xl border p-5 shadow-lg lg:hidden',
            'lg:pointer-events-auto lg:static lg:flex lg:flex-1 lg:translate-y-0 lg:flex-row lg:items-center lg:justify-between lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none',
            isOpen
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-4 opacity-0',
          )}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:gap-8">
            {items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground block py-1 text-base font-normal transition-colors"
                >
                  {t(item.title)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-muted/50 flex flex-row items-center justify-end gap-3 border-t pt-2 lg:border-none lg:pt-0">
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href="#login"
            >
              {t('labels.login')}
            </Link>
            <Link
              className={buttonVariants({ variant: 'default' })}
              href="#sign-up"
            >
              {t('labels.signUp')}
            </Link>
            <div className="flex items-center gap-1">
              <ThemeToggle className="size-8" />
              <LocaleSwitcher className="size-9" variant="ghost" />
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground z-50 -mr-2 p-2 lg:hidden"
        >
          {isOpen ? (
            <HugeiconsIcon icon={Cancel01Icon} />
          ) : (
            <HugeiconsIcon icon={Menu01Icon} />
          )}
        </button>
      </nav>
    </header>
  );
}
