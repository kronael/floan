import {
  LogRequestLoan,
  LogPaybackLoan,
  LogProvideLoan,
  LogDrawLoan,
} from './generated/Floan/Floan'
import {
  Loan,
  Requester,
  Provider,
  RequestLoan,
  ProvideLoan,
  DrawLoan,
  PaybackLoan,
} from './generated/schema'

export function handleLogRequestLoan(event: LogRequestLoan): void {
  let loan = new Loan(event.params.loanID.toString())

  loan.id = event.params.loanID.toString()

  let requester_id = event.params.requester.toString()
  let requester = Requester.load(requester_id)
  if(!requester)
    requester = new Requester(requester_id)

  loan.principal = event.params.principal
  loan.repayment = event.params.repayment
  loan.duration = event.params.duration
  loan.validUntil = event.params.validUntil

  loan.state = 'OPEN'

  loan.save()
  requester.save()
}

export function handleLogProvideLoan(event: LogProvideLoan): void {
  let id = event.params.loanID.toString()
  let loan = Loan.load(id)

  loan.state = 'PROVIDED'
  
  loan.save()
}

export function handleLogDrawLoan(event: LogDrawLoan): void {
  let id = event.params.loanID.toString()
  let loan = Loan.load(id)

  loan.state = 'DRAWN'
  
  loan.save()
}

export function handleLogPaybackLoan(event: LogPaybackLoan): void {
  let id = event.params.loanID.toString()
  let loan = Loan.load(id)

  loan.state = 'REPAYED'

  loan.save()
}
