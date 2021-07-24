import {
  LogRequestLoan,
  LogPaybackLoan,
  LogProvideLoan,
  LogDrawLoan,
} from './generated/Floan/Floan'
import {
  Loan,
  Provider,
  RequestLoan,
  ProvideLoan,
  DrawLoan,
  PaybackLoan,
} from './generated/schema'

export function handleLogRequestLoan(event: LogRequestLoan): void {
  let loan = new Loan(event.params.loanID.toString())

  loan.requester = event.params.requester
  loan.principal = event.params.principal
  loan.repayment = event.params.repayment
  loan.duration = event.params.duration
  loan.validUntil = event.params.validUntil
  loan.state = 'OPEN'

  loan.save()
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
