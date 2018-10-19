import Vue from 'vue'
import Vuex from 'vuex'
// import Eos from 'eosjs'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs2'
import Eos from 'eosjs'
import { getMyBalancesByContract } from './blockchain'
import { network } from './config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scatter: null,
    identity: null,
    eos: null,
    balance: {
      eos: '0.0000 EOS'
    },
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

        const requiredFields = { accounts: [network] }
        await state.scatter.getIdentity(requiredFields)
        // commit('setIdentity', id)
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
    },
    setIdentity ({ commit, dispatch }, identity) {
      // commit('setIdentity', identity)
      dispatch('updateBalance')
    }
  }
})
