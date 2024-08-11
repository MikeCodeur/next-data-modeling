'use server'

import {transferFunds} from '@/db/db-drizzle-query'
import {revalidatePath} from 'next/cache'

export async function transferFundsAction(
  accountUserId1: number,
  accountUserId2: number,
  amount: number
) {
  await transferFunds(accountUserId1, accountUserId2, amount)
  revalidatePath('/exercises/transaction')
}
