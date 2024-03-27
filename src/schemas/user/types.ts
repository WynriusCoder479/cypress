import * as z from 'zod'
import {
	LoginSchema,
	NewPasswordSchema,
	RegisterSchema,
	ResetSchema,
	SettingsSchema
} from '@/schemas/user'

export type SettingsSchemaType = z.infer<typeof SettingsSchema>
export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>
export type ResetSchemaType = z.infer<typeof ResetSchema>
export type LoginSchemaType = z.infer<typeof LoginSchema>
export type RegisterSchemaType = z.infer<typeof RegisterSchema>
