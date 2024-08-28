'use server'

import db from '@/db/schema'
import {accounts} from '@/db/schema/accounts'
import {DrizzleError, TransactionRollbackError} from 'drizzle-orm'
import {eq, sql} from 'drizzle-orm/sql'
import {revalidatePath} from 'next/cache'

export async function transferFundsAction(
  accountUserId1: number,
  accountUserId2: number,
  amount: number
) {
  await transferFunds(accountUserId1, accountUserId2, amount)
  revalidatePath('/exercises/transaction')
}

export async function transferFunds(
  accountUserId1: number,
  accountUserId2: number,
  amount: number
) {
  try {
    const newBalance = await db.transaction(async (tx) => {
      // Vérification du solde du compte source
      const [account1] = await tx
        .select()
        .from(accounts)
        .where(eq(accounts.userId, accountUserId1))

      const [account2] = await tx
        .select()
        .from(accounts)
        .where(eq(accounts.userId, accountUserId2))

      if (!account1 || Number(account1.balance) < amount) {
        throw new Error(`Insufficient funds in ${accountUserId1}'s account`)
      }

      // Débit du compte source
      await tx
        .update(accounts)
        .set({balance: sql`${accounts.balance} - ${amount}`})
        .where(eq(accounts.userId, accountUserId1))

      if (Math.random() < 0.5) {
        tx.rollback()
      }
      // Crédit du compte de destination
      await tx
        .update(accounts)
        .set({balance: sql`${accounts.balance} + ${amount}`})
        .where(eq(accounts.userId, accountUserId2))

      if (account1.blocked || account2.blocked) {
        throw new Error(`One or many account are blocked`)
      }
      // Retourne le nouveau solde du compte source
      const [updatedAccount1] = await tx
        .select({balance: accounts.balance})
        .from(accounts)
        .where(eq(accounts.userId, accountUserId1))

      return updatedAccount1.balance
    })

    console.log(
      `Transfer successful! ${amount} transferred from ${accountUserId1} to ${accountUserId2} `
    )
    console.log(`New balance of ${accountUserId1}: ${newBalance}`)
  } catch (error: unknown) {
    if (error instanceof TransactionRollbackError) {
      throw new Error(`Transaction failed: ${error.message}`)
    }
    if (error instanceof DrizzleError) {
      throw new Error('BDD error : Rollback')
    }
    if (error instanceof Error) {
      console.error(`Transaction failed: ${error.message}`)
    } else {
      console.error('Transaction failed: Unknown error')
    }
    throw error
  }
}

export async function getAccountByUserId(userId: number) {
  // Récupérer les comptes associés à l'utilisateur spécifique
  const userAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId))

  return userAccounts[0]
}
