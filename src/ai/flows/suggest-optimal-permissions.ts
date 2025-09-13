'use server';

/**
 * @fileOverview An AI agent that suggests the optimal permission level for new users in a Business Manager.
 *
 * - suggestOptimalPermissions - A function that suggests the optimal permission level for a new user.
 * - SuggestOptimalPermissionsInput - The input type for the suggestOptimalPermissions function.
 * - SuggestOptimalPermissionsOutput - The return type for the suggestOptimalPermissions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalPermissionsInputSchema = z.object({
  jobTitle: z.string().describe('The job title of the new user.'),
  tasks: z.string().describe('A description of the tasks the new user will be performing.'),
  existingPermissions: z.string().optional().describe('A description of the existing permissions within the Business Manager.'),
});
export type SuggestOptimalPermissionsInput = z.infer<typeof SuggestOptimalPermissionsInputSchema>;

const SuggestOptimalPermissionsOutputSchema = z.object({
  suggestedPermissionLevel: z.string().describe('The suggested permission level for the new user.'),
  justification: z.string().describe('The justification for the suggested permission level.'),
});
export type SuggestOptimalPermissionsOutput = z.infer<typeof SuggestOptimalPermissionsOutputSchema>;

export async function suggestOptimalPermissions(
  input: SuggestOptimalPermissionsInput
): Promise<SuggestOptimalPermissionsOutput> {
  return suggestOptimalPermissionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalPermissionsPrompt',
  input: {schema: SuggestOptimalPermissionsInputSchema},
  output: {schema: SuggestOptimalPermissionsOutputSchema},
  prompt: `You are an expert in access control and security within Facebook Business Manager. Your task is to suggest the optimal permission level for a new user, balancing the need for access with the principle of least privilege.

  Consider the following information about the new user:

  Job Title: {{{jobTitle}}}
  Tasks: {{{tasks}}}
  Existing Permissions Context: {{{existingPermissions}}}

  Based on this information, suggest a permission level (e.g., Admin, Editor, Analyst) and provide a brief justification for your suggestion.

  The output should be concise and directly address the optimal permission level and the reasoning behind it.
`,
});

const suggestOptimalPermissionsFlow = ai.defineFlow(
  {
    name: 'suggestOptimalPermissionsFlow',
    inputSchema: SuggestOptimalPermissionsInputSchema,
    outputSchema: SuggestOptimalPermissionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
