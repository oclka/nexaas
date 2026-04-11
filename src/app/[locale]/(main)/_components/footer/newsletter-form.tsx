import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';

export default function NewsletterForm() {
  return (
    <form className="row-start-1 border-b pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1">
      <div className="space-y-4">
        <Label htmlFor="mail" className="block font-medium">
          Newsletter
        </Label>
        <div className="flex gap-2">
          <Input
            type="email"
            id="mail"
            name="mail"
            placeholder="Your email"
            className="h-8 text-sm"
          />
          <Button>Submit</Button>
        </div>
        <span className="text-muted-foreground block text-sm">
          Don&apos;t miss any update!
        </span>
      </div>
    </form>
  );
}
