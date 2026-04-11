'use client';

import { Orbit01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { ComponentProps } from 'react';

import { Button } from '@/ui/components/ui/button';
import { cn } from '@/ui/helpers/utils';

interface Properties extends ComponentProps<typeof Button> {
  pending: boolean;
  pendingLabel: string;
  pendingLabelClassName?: string;
}

export default function PendingButton({
  children,
  pendingLabel,
  pendingLabelClassName,
  pending,
  disabled,
  ...properties
}: Readonly<Properties>) {
  const t = useTranslations('components.pendingButton');

  if (!pendingLabel) {
    pendingLabel = t('pendingLabel');
  }

  return (
    <Button
      {...properties}
      disabled={pending || disabled}
      className={cn(properties.className)}
    >
      {pending ? (
        <>
          <HugeiconsIcon
            icon={Orbit01Icon}
            className="animate-spin"
            aria-hidden="true"
          />
          <span className={cn('italic', pendingLabelClassName)}>
            {pendingLabel}...
          </span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
