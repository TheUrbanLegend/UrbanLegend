import Vue from 'vue'
import Vuex from 'vuex'
import Chance from 'chance'
// import Eos from 'eosjs'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs2'
import Eos from 'eosjs'
import { getMyBalancesByContract } from './blockchain'
import { network } from './config'

Vue.use(Vuex)
const seed = localStorage.getItem('seed') || new Chance().word({ length: 10 })
const referral = localStorage.getItem('refferal') || null

export default new Vuex.Store({
  state: {
    scatter: null,
    identity: null,
    eos: null,
    seed,
    referral,
    rpc: null,
    balance: {
      eos: '0.0000 EOS',
      hpy: '0.0000 HPY',
      kby: '0.0000 KBY'
    },
    lang: localStorage.getItem('lang') || 'ch',
    dataIsLoading: true,
    globalInfo: null
  },
  getters: {
    account: ({ scatter }) => {
      if (!scatter) { return null }
      const { identity } = scatter
      return identity ? identity.accounts.find(({ blockchain }) => blockchain === 'eos') : null
    },
    identity: ({ scatter }) => {
      if (!scatter) { return null }
      const { identity } = scatter
      return identity
    }
  },
  mutations: {
    setScatter (state, scatter) {
      state.scatter = scatter
      const rpc = new Eos.Rpc.JsonRpc(`${network.protocol}://${network.host}:${network.port}`)
      state.rpc = rpc
      state.eos = scatter.eos(network, Eos.Api, { rpc })
      // state.identity = scatter.identity
    },
    // setIdentity(state, identity) {
    //   state.identity = identity
    // },
    setBalance (state, { symbol, balance }) {
      state.balance[symbol] = balance || `0.0000 ${symbol.toUpperCase()}`
    },
    setDataLoading (state, loading) {
      state.dataIsLoading = loading
    },
    setGlobal (state, globalInfo) {
      state.globalInfo = globalInfo
    },
    changeLang (state, code) {
      state.lang = code
    }
  },
  actions: {
    initScatter ({ commit, dispatch }) {
      ScatterJS.plugins(new ScatterEOS())
      commit('setScatter', ScatterJS.scatter)
      dispatch('initScatterCore')
    },
    async initScatterCore ({ commit, dispatch, state }) {
      try {
        const connected = await ScatterJS.scatter.connect('Urban-Legend', { initTimeout: 5000 })
        // User does not have Scatter Desktop, Mobile or Classic installed.
        if (!connected) return false
        commit('setScatter', ScatterJS.scatter)
        window.ScatterJS = null

        dispatch('initIdentity')
      } catch (err) {
        err && console.log(err)
        alert('Error getting scatter instance')
      }
    },
    updateBalance ({ commit }) {
      getMyBalancesByContract({ symbol: 'eos' })
        .then((price) => {
          commit('setBalance', { symbol: 'eos', balance: price[0] })
        })
      getMyBalancesByContract({ symbol: 'kby', tokenContract: 'dacincubator' })
        .then((price) => {
          commit('setBalance', { symbol: 'kby', balance: price[0] })
        })
      getMyBalancesByContract({ symbol: 'hpy', tokenContract: 'happyeosslot' })
        .then((price) => {
          commit('setBalance', { symbol: 'hpy', balance: price[0] })
        })
    },
    async initIdentity ({ state, dispatch }) {
      const requiredFields = { accounts: [network] }
      await state.scatter.getIdentity(requiredFields)
      dispatch('updateBalance')
    },
    async forgetIdentity ({ commit, state }) {
      await state.scatter.forgetIdentity()
    }
  }
})
