import { scatter } from '../store'
import { network } from '@/config'

const eosTokenDetails = {
  contract: 'eosio.token',
  symbol: 'EOS',
  decimals: 4
}

const transferToken = ({ to, memo = '', amount = '0.0000',
  tokenDetails = eosTokenDetails
}) => scatter().requestTransfer(
  network, to, amount, { memo, ...tokenDetails }
)

export { transferToken }
