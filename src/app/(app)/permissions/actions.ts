'use server';

import { suggestOptimalPermissions, SuggestOptimalPermissionsInput, SuggestOptimalPermissionsOutput } from '@/ai/flows/suggest-optimal-permissions';
import { z } from 'zod';

const formSchema = z.object({
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  tasks: z.string().min(10, {
    message: "Tasks description must be at least 10 characters.",
  }),
  existingPermissions: z.string().optional(),
});

export async function getPermissionSuggestion(
  values: z.infer<typeof formSchema>
): Promise<{ success: true, data: SuggestOptimalPermissionsOutput } | { success: false, error: string }> {
  try {
    const validatedFields = formSchema.safeParse(values);
    
    if (!validatedFields.success) {
      return { success: false, error: 'Invalid input.' };
    }
    
    const suggestion = await suggestOptimalPermissions(validatedFields.data);
    
    return { success: true, data: suggestion };

  } catch (error) {
    console.error('Error getting permission suggestion:', error);
    return { success: false, error: 'Failed to get suggestion from AI. Please try again.' };
  }
}
