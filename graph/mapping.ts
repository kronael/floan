import {
  LogRequestLoan,
  LogPaybackLoan,
  LogMatchLoan,
  LogWithdrawLoan,
} from './generated/Floan/Floan'
import {
  Loan,
  Requester,
  Matcher,
  RequestLoan,
  MatchLoan,
  WithdrawLoan,
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

  loan.state = 'OPEN'

  loan.save()
  requester.save()
}

export function handleLogMatchLoan(event: LogMatchLoan): void {
  let id = event.params.loanID.toString()
  let loan = Loan.load(id)

  loan.state = 'MATCHED'
  
  loan.save()
}

export function handleLogWithdrawLoan(event: LogWithdrawLoan): void {
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
