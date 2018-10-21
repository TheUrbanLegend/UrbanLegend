import { currentGetters, eos, rpc } from './store'

/*
⚠️ Important WARNING
a major breaking rewrite for eosjs. Be sure to check out the new doc. ⚠️
https://eosio.github.io/eosjs/
*/

// export function getBalancesByContract ({ tokenContract = 'eosio.token', accountName, symbol }) {
//   return eos().getCurrencyBalance(tokenContract, accountName, symbol)
// }
export function getBalancesByContract({ tokenContract = 'eosio.token', accountName, symbol }) {
  return rpc().get_currency_balance(tokenContract, accountName, symbol)
}

export function getMyBalancesByContract({ tokenContract = 'eosio.token', symbol }) {
  const accountName = currentGetters().account.name
  return getBalancesByContract({ tokenContract, accountName, symbol })
}

export { transferToken, transferTokenViaEosjs } from './transfer'
