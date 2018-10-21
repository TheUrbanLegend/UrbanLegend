import Vue from 'vue'
import Router from 'vue-router'
import diceGame from './components/dice/game.vue'
import blackJackGame from './components/blackJack/game.vue'
import slot from './components/slot/slot.vue'

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
    {
      name: 'BlackJack',
      path: '/blackjack',
      component: blackJackGame
    },
    {
      name: 'Dice',
      path: '/dice',
      component: diceGame
    }, {
      name: 'Slot',
      path: '/slot',
      component: slot
    }
  ]
})
