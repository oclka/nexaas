'use client';

import { Moon02Icon, Sun02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTheme } from 'next-themes';
import { ComponentProps, useSyncExternalStore } from 'react';

import { Toggle } from '@/ui/components/ui/toggle';

const noop = () => {
  /* No cleanup required */
};
const emptySubscribe = () => noop;
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle({
  className,
  ...properties
}: Readonly<ComponentProps<typeof Toggle>>) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const isDark = mounted && theme === 'dark';

  return (
    <Toggle
      {...properties}
      className={`group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-transparent ${className}`}
      pressed={isDark}
      onPressedChange={() =>
        mounted &&
        setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'))
      }
      aria-label={isDark ? 'Toggle light' : 'Toggle dark'}
    >
      <HugeiconsIcon
        icon={Moon02Icon}
        className="size-4 shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
        aria-hidden="true"
      />
      <HugeiconsIcon
        icon={Sun02Icon}
        className="absolute size-4 shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        aria-hidden="true"
      />
    </Toggle>
  );
}
