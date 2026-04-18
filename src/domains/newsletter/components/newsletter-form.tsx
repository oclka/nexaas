'use client';

import { SentIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { Controller } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { subscribeToNewsletter } from '@/domains/newsletter/actions';
import PendingButton from '@/ui/components/form/pending-button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/ui/components/ui/field';
import { Input } from '@/ui/components/ui/input';
import { cn } from '@/ui/helpers';
import { useZodForm } from '@/ui/hooks/use-zod-form';

interface Properties {
  className?: string;
}

export default function NewsletterForm({ className }: Readonly<Properties>) {
  const t = useTranslations();
  const schema = z.object({
    email: z.email({ error: t('validations.email') }),
  });
  const form = useZodForm(schema, {
    defaultValues: {
      email: '',
    },
  });
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitted(true);
    startTransition(async () => {
      const { success, error } = await subscribeToNewsletter(data.email);
      console.log(success, error);
      if (success) {
        form.reset();
        toast.success(t('components.newsletterForm.confirm.title'), {
          description: t('components.newsletterForm.confirm.description'),
        });
      } else {
        toast.error(t('errors.unexpected'));
      }
      setIsSubmitted(false);
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate={true}
      className={className}
    >
      <div className="space-y-4">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="email"
                  className={cn('required', {
                    disabled: isPending || isSubmitted,
                  })}
                >
                  {t('components.newsletterForm.label')}
                </FieldLabel>
                <div className="flex justify-start">
                  <div className="flex flex-grow flex-col gap-1.5">
                    <Input
                      {...field}
                      disabled={isPending || isSubmitted}
                      aria-invalid={fieldState.invalid}
                      className="flex-grow rounded-r-none border-r-0 focus:ring-0! focus:outline-none!"
                      placeholder={t('components.newsletterForm.placeholder')}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                  <PendingButton
                    className="border-l-none border-muted-foreground dark:border-muted-foreground/50 rounded-l-none border-1"
                    pending={isPending}
                    disabled={isSubmitted}
                    pendingLabel={t('components.newsletterForm.submit')}
                    pendingLabelClassName="md:hidden"
                  >
                    <HugeiconsIcon
                      icon={SentIcon}
                      aria-label={t('components.newsletterForm.submit')}
                    />
                    <span className="md:hidden">
                      {t('components.newsletterForm.submit')}
                    </span>
                  </PendingButton>
                </div>
              </Field>
            )}
          />
        </FieldGroup>
        <span className="text-muted-foreground block text-sm">
          {t('components.newsletterForm.description')}
        </span>
      </div>
    </form>
  );
}
