'use client'

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import React from 'react'

import {transferFundsAction} from '@/app/exercises/transaction/action'
import {Account} from '@/db/schema/accounts'

interface TransfertProps {
  accountSender: Account
  accountReceiver: Account
}

export function Transfert({accountSender, accountReceiver}: TransfertProps) {
  const [amountTranfert, setAmountTranfert] = React.useState(100)
  const [isLoading, setIsloading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string>()
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-8">
      <div className="flex w-full max-w-3xl items-center justify-between px-8">
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium text-muted-foreground">
            Your Account {accountSender.blocked ? '(blocked)' : ''}
          </div>
          <div
            className={`text-4xl font-bold ${
              accountSender.blocked ? 'text-orange-500' : 'text-primary'
            }`}
          >
            {accountSender.balance}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm font-medium text-muted-foreground">
            Recipient Account
          </div>
          <div className="text-4xl font-bold text-primary">
            {accountReceiver.balance}
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-3xl items-center justify-center gap-4">
        <Input
          value={amountTranfert}
          onChange={(e) => setAmountTranfert(Number(e.target.value))}
          type="number"
          placeholder="Enter amount to transfer"
          className="max-w-[300px] flex-1"
        />
        <Button
          disabled={isLoading}
          onClick={async () => {
            setIsloading(true)
            setErrorMessage('')
            try {
              await transferFundsAction(
                accountSender.id,
                accountReceiver.id,
                amountTranfert
              )
            } catch (error) {
              if (error instanceof Error) {
                console.error(`Transaction failed: ${error.message}`)
                setErrorMessage(error.message)
              } else {
                console.error('Transaction failed: Unknown error')
                setErrorMessage('error')
              }
            }

            setIsloading(false)
          }}
        >
          Transfer
        </Button>
      </div>
      <div className="text-red-500">{errorMessage}</div>
    </div>
  )
}
