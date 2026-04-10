import ThemeToggle from '@/ui/components/theme-toggle';

export default function LandingPage() {
  return (
    <main className="p-6">
      <div className="flex items-center justify-between">
        <h1 data-testid="title">Welcome!</h1>
        <ThemeToggle />
      </div>
    </main>
  );
}
