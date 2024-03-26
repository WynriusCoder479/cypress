import * as z from 'zod'
import {
	LoginSchema,
	NewPasswordSchema,
	RegisterSchema,
	SettingsSchema
} from '@/schemas/user'

export type SettingsSchemaType = z.infer<typeof SettingsSchema>
export type NewPassordType = z.infer<typeof NewPasswordSchema>
export type LoginSchemaType = z.infer<typeof LoginSchema>
export type RegisterSchemaType = z.infer<typeof RegisterSchema>
