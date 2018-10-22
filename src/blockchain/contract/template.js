import { eos, account } from '../store'

class ContractTemplate {
    constructor(contractAccount) {
        this.contractAccount = contractAccount
    }

    call({ actionName, data }) {
        const { contractAccount } = this
        const actions = [{
            account: contractAccount,
            name: actionName,
            authorization: {
                actor: account().name,
                permission: account().authority
            },
            data: data
        }]
        return this.calls(actions)
    }

    calls(actions) {
        return eos().transact({
            actions
        })
    }
}


export default ContractTemplate