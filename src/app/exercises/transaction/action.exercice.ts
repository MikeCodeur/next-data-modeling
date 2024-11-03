'use server'

import db from '@/db/schema'
import {accounts} from '@/db/schema/accounts'
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
    // 🐶 Crée un nouvelle Transaction

    // 🤖
    // const newBalance = await db.transaction(async (tx) => {
    //   //opérations de la transaction
    // })

    // 🐶 Deplace tout le code ci dessous à l'interrieur de la transaction

    // Vérification du solde du compte source
    const [account1] = await db // ⛏️ Utilise tx au lieu de db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, accountUserId1))

    const [account2] = await db // ⛏️ Utilise tx au lieu de db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, accountUserId2))

    if (!account1 || Number(account1.balance) < amount) {
      throw new Error(`Insufficient funds in ${accountUserId1}'s account`)
    }

    // Débit du compte source
    await db // ⛏️ Utilise tx au lieu de db
      .update(accounts)
      .set({balance: sql`${accounts.balance} - ${amount}`})
      .where(eq(accounts.userId, accountUserId1))

    // Simulation d'une erreur aléatoire pour illustrer l'absence de transaction
    if (Math.random() < 0.5) {
      throw new Error("Une erreur aléatoire s'est produite après le débit !")
    }

    // Crédit du compte de destination (ce code peut ne pas être atteint en cas d'erreur)
    await db // ⛏️ Utilise tx au lieu de db
      .update(accounts)
      .set({balance: sql`${accounts.balance} + ${amount}`})
      .where(eq(accounts.userId, accountUserId2))

    if (account1.blocked || account2.blocked) {
      throw new Error(`One or many account are blocked`)
    }

    // Retourne le nouveau solde du compte source
    const [updatedAccount1] = await db // ⛏️ Utilise tx au lieu de db
      .select({balance: accounts.balance})
      .from(accounts)
      .where(eq(accounts.userId, accountUserId1))

    console.log(
      `Transfer successful! ${amount} transferred from ${accountUserId1} to ${accountUserId2}`
    )
    return updatedAccount1.balance
  } catch (error: unknown) {
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
