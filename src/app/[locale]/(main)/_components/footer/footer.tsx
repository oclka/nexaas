import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import SocialLinks from '@/app/[locale]/(main)/_components/footer/social-links';
import { navigation } from '@/core/config';
import { oclka } from '@/core/config';
import { NavigationCategory, NavigationItem } from '@/core/config/navigation';
import LocaleSwitcher from '@/core/i18n/components/locale-switcher';
import NewsletterForm from '@/domains/newsletter/components/newsletter-form';
import Logo from '@/ui/components/logo';

export default async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-b bg-white pt-20 pb-4 dark:bg-transparent">
      <div className="mb-8 border-b md:mb-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-6">
          <Link href="/" aria-label="go home" className="block size-fit">
            <Logo />
          </Link>
          <SocialLinks />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-5 md:gap-0 lg:grid-cols-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-5 md:row-start-1 lg:col-span-3">
            {navigation.map((link: NavigationCategory, index: number) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium">{t(link.title)}</span>
                {link.items.map((item: NavigationItem, index: number) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{t(item.title)}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <NewsletterForm className="row-start-1 border-b pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1" />
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <small className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {year} &middot;{' '}
            <a
              href={oclka.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              OCLKA
            </a>{' '}
            &middot; {t('components.footer.allRightsReserved')}
          </small>
          <LocaleSwitcher className="size-9" variant="ghost" />
        </div>
      </div>
    </footer>
  );
}
