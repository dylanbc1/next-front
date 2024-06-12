'use server'

import * as z from 'zod';

import { SettingsSchema } from '@/schemas';

import { currentUser } from '@/lib/auth';

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();
    
    return { success: "Settings updated!" }

}