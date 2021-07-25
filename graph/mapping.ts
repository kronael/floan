import { BigInt } from '@graphprotocol/graph-ts'
import {
  LogRequestLoan,
  LogPaybackLoan,
  LogProvideLoan,
  LogDrawLoan,
} from './generated/Floan/Floan'
import {
  Loan,
  Requester,
  RequestLoan,
  ProvideLoan,
  PaybackLoan,
  DrawLoan,
} from './generated/schema'

export function handleLogRequestLoan(event: LogRequestLoan): void {
  let id = event.params.loanID.toString()
  let request = new RequestLoan(id)

  let requester_id = event.params.requester.toHex()

  let requester = Requester.load(requester_id)
  if(!requester){
    requester = new Requester(requester_id)
    requester.amountRequested = new BigInt(0)
    requester.amountOutstanding = new BigInt(0)
    requester.amountRepayed = new BigInt(0)
  }

  request.requester = requester_id
  request.principal = event.params.principal
  request.repayment = event.params.repayment
  request.duration = event.params.duration

  request.save()

  requester.amountRequested += request.principal

  requester.save()

  let loan = new Loan(id)

  loan.request = id
  loan.state = 'OPEN'

  loan.save()
}

export function handleLogProvideLoan(event: LogProvideLoan): void {
  let id = event.params.loanID.toString()
  let loan = Loan.load(id)
  if(!loan)
    return
    
  let request = RequestLoan.load(loan.request)
  if(!request)
    return

  let requester = Requester.load(request.requester)
  if(!requester)
    return

  let ev = new ProvideLoan(id)

  ev.loan = id
  ev.provider = event.params.matcher

  ev.save()

  loan.provision = id
  loan.state = 'PROVIDED'

  loan.save()

  requester.amountOutstanding += request.principal
}

export function handleLogDrawLoan(event: LogDrawLoan): void {
  let id = event.params.loanID.toString()
  let loan = Loan.load(id)
  if(!loan)
    return

  let ev = new DrawLoan(id)
  ev.loan = id

  ev.save()

  loan.draw = id
  loan.state = 'DRAWN'

  loan.save()
}

export function handleLogPaybackLoan(event: LogPaybackLoan): void {
  let id = event.params.loanID.toString()
  let loan = Loan.load(id)
  if(!loan)
    return

  let request = RequestLoan.load(loan.request)
  if(!request)
    return

  let requester = Requester.load(request.requester)
  if(!requester)
    return

  let ev = new PaybackLoan(id)
  ev.loan = id

  ev.save()

  loan.repay = id
  loan.state = 'REPAYED'

  loan.save()

  requester.amountRepayed += request.repayment
}
