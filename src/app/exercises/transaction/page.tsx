import {getAccountByUserId} from './action'
import {Transfert} from './transfert'

export default async function Products() {
  const acountIdSender = 2
  const accountIdReceiver = 1
  const blockedAccountId = 3

  const acountSenderOK = await getAccountByUserId(acountIdSender)
  const acountSenderBlocked = await getAccountByUserId(blockedAccountId)
  const accountReceiver = await getAccountByUserId(accountIdReceiver)

  const acountSender = acountSenderOK //: acountSenderBlocked

  console.log(
    `acountSender balance is ${acountSender.balance}, blocked: ${acountSender.blocked}`
  )
  console.log(`accountReceiver balance is ${accountReceiver.balance}`)

  return (
    <div className="mx-auto max-w-4xl p-6 text-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Transaction </h1>
      <Transfert
        accountSender={acountSender}
        accountReceiver={accountReceiver}
      ></Transfert>
    </div>
  )
}
