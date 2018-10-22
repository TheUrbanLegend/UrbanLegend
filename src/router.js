import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Home',
      path: '/',
      redirect: {
        name: 'Dice'
      }
    },
    // {
    //   name: 'BlackJack',
    //   path: '/blackjack',
    //   component: import(/* webpackChunkName: "BlackJack" */ './components/blackJack/game.vue')
    // },
    {
      name: 'Dice',
      path: '/dice',
      component: () => import(/* webpackChunkName: "dice" */ './components/dice/game.vue')
    }, {
      name: 'Slot',
      path: '/slot',
      component: () => import(/* webpackChunkName: "slot" */ './components/slot/slot.vue')
    }
  ]
})
