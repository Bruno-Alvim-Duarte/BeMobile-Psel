import { BaseModel } from '@adonisjs/lucid/orm'
import { LucidRow, ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'

export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}
export const softDelete = async <T extends LucidRow>(
  row: T,
  column: keyof T = 'deletedAt' as keyof T
) => {
  row[column] = DateTime.local() as any

  await row.save()
}
