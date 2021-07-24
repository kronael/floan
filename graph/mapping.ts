import {
  LogRequestLoan,
  LogPaybackLoan,
  LogProvideLoan,
  LogDrawLoan,
} from './generated/Floan/Floan'
import {
  Loan,
  RequestLoan,
  ProvideLoan,
  PaybackLoan,
  DrawLoan,
} from './generated/schema'

export function handleLogRequestLoan(event: LogRequestLoan): void {
  let id = event.params.loanID.toString()
  let ev = new RequestLoan(id)

  ev.requester = event.params.requester
  ev.principal = event.params.principal
  ev.repayment = event.params.repayment
  ev.duration = event.params.duration
  ev.validUntil = event.params.validUntil

  ev.save()

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
    
  let ev = new ProvideLoan(id)

  ev.loan = id
  ev.provider = event.params.matcher

  ev.save()

  loan.provision = id
  loan.state = 'PROVIDED'

  loan.save()
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

  let ev = new PaybackLoan(id)
  ev.loan = id

  ev.save()

  loan.repay = id
  loan.state = 'REPAYED'

  loan.save()
}
