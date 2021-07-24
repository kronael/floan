module.exports = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "requestor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanID",
        "type": "uint256"
      }
    ],
    "name": "LogDrawLoan",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "requestor",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanID",
        "type": "uint256"
      }
    ],
    "name": "LogPaybackLoan",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "matcher",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "principal",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "repayment",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "validUntil",
        "type": "uint256"
      }
    ],
    "name": "LogProvideLoan",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "requester",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "principal",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "repayment",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "validUntil",
        "type": "uint256"
      }
    ],
    "name": "LogRequestLoan",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanID",
        "type": "uint256"
      }
    ],
    "name": "LogSlashDebtor",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "drawLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTokenAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanID",
        "type": "uint256"
      }
    ],
    "name": "paybackLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanID",
        "type": "uint256"
      }
    ],
    "name": "provideLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_principal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_repayment",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_validUntil",
        "type": "uint256"
      }
    ],
    "name": "requestLoan",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanID",
        "type": "uint256"
      }
    ],
    "name": "slashDebtor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanID",
        "type": "uint256"
      }
    ],
    "name": "takePayback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];