'use client';

import { SentIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import PendingButton from '@/ui/components/form/pending-button';
import { Input } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';

export default function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();

  const onSubmit = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
    });
  };

  return (
    <form className="row-start-1 border-b pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1">
      <div className="space-y-4">
        <Label htmlFor="mail" className="block font-medium">
          {t('components.footer.newsletterForm.title')}
        </Label>
        <div className="flex">
          <Input
            type="email"
            id="mail"
            name="mail"
            placeholder={t('placeholders.yourEmail')}
            className="border-r-none h-8 rounded-r-none text-sm"
          />
          <PendingButton
            className="border-l-none border-muted-foreground rounded-l-none border-1"
            pending={isPending}
            pendingLabel={t('components.footer.newsletterForm.button')}
            pendingLabelClassName="md:hidden"
            onClick={onSubmit}
          >
            <HugeiconsIcon
              icon={SentIcon}
              aria-label={t('components.footer.newsletterForm.button')}
            />
            <span className="md:hidden">
              {t('components.footer.newsletterForm.button')}
            </span>
          </PendingButton>
        </div>
        <span className="text-muted-foreground block text-sm">
          {t('components.footer.newsletterForm.description')}
        </span>
      </div>
    </form>
  );
}
