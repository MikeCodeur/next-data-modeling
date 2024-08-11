import {Transfert} from '@/components/transfert'
import {getAccountByUserId} from '@/db/db-drizzle-query'

export default async function Products() {
  const fromAcc = 1
  const toAcc = 3 //3 is blocked account
  const acc1 = await getAccountByUserId(fromAcc)
  console.log(`acc1 balance is ${acc1.balance}`)
  const acc2 = await getAccountByUserId(toAcc)
  console.log(`acc2 balance is ${acc2.balance}`)

  // await transferFunds(fromAcc, toAcc, 500)
  console.log(`transfert 500`)

  // const acc1Up = await getAccountByUserId(fromAcc)
  // console.log(`acc1 balance is ${acc1.balance}`)
  // const acc2Up = await getAccountByUserId(toAcc)
  // console.log(`acc2 balance is ${acc2.balance}`)

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Transaction </h1>
      <Transfert accountSender={acc1} accountReceiver={acc2}></Transfert>
      {/* <div key={acc1?.id}>
        Initial values
        <p>
          Account 1 {acc1?.id} - balance {acc1?.balance}
        </p>
        <p>
          Account 2 {acc2?.id} - balance {acc2?.balance}
        </p>
      </div>

      <h3 className="mb-4 text-center text-xl font-bold">
        after transfert 500{' '}
      </h3>
      <div key={acc1Up?.id}>
        Initial values
        <p>
          Account 1 {acc1Up?.id} - balance {acc1Up?.balance}
        </p>
        <p>
          Account 2 {acc2Up?.id} - balance {acc2Up?.balance}
        </p>
      </div> */}
    </div>
  )
}
