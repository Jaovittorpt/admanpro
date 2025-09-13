'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { getPermissionSuggestion } from '@/app/(app)/permissions/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SuggestOptimalPermissionsOutput } from '@/ai/flows/suggest-optimal-permissions';

const formSchema = z.object({
  jobTitle: z.string().min(2, { message: "Job title must be at least 2 characters." }),
  tasks: z.string().min(10, { message: "Tasks description must be at least 10 characters." }),
  existingPermissions: z.string().optional(),
});

export function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestOptimalPermissionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      tasks: '',
      existingPermissions: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setSuggestion(null);

    const result = await getPermissionSuggestion(values);

    if (result.success) {
      setSuggestion(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }

    setIsLoading(false);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset();
      setSuggestion(null);
      setIsLoading(false);
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Add New User</DialogTitle>
          <DialogDescription>
            Fill in the details below. You can also get an AI-powered permission suggestion.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Social Media Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tasks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Tasks</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Create and manage ad campaigns, analyze performance reports." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="existingPermissions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Existing Permissions Context (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the current permission structure if relevant." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isLoading && (
              <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            
            {suggestion && (
                <Alert>
                  <Bot className="h-4 w-4" />
                  <AlertTitle className="font-headline flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    AI Suggestion
                  </AlertTitle>
                  <AlertDescription className="space-y-2">
                    <p>
                      <strong>Suggested Role:</strong> <span className="font-semibold text-primary">{suggestion.suggestedPermissionLevel}</span>
                    </p>
                    <p>
                      <strong>Justification:</strong> {suggestion.justification}
                    </p>
                    <Button size="sm" className="mt-2">Add user with this role</Button>
                  </AlertDescription>
                </Alert>
            )}

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Suggest Permissions
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
