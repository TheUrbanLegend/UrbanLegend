<template>
  <div id="app">
    <vip-menu></vip-menu>
    <div id="game">
      <router-view />
    </div>
    <footer>
      <div class="socials">
        <a href="" class="socialBtn Reddit">
          <img src="./assets/images/Social/reddit_L@2x.png" alt=""></a>
        <a href="" class="socialBtn Twitter">
          <img src="./assets/images/Social/twitter_L@2x.png" alt=""></a>
        <a href="" class="socialBtn Discord">
          <img src="./assets/images/Social/Discord@2x.png" alt=""></a>
        <a href="" class="socialBtn Medium">
          <img src="./assets/images/Social/Medium@2x.png" alt=""></a>
      </div>
      <div class="warmly-warning">
        <p>
          合理安排游戏时间，请勿过度沉迷
        </p>
        <p>
          Copyright ©️ 2018 HappyEOS. All Right Reserved.
        </p>

      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import menu from "./components/menu.vue";

export default {
  components: {
    "vip-menu": menu
  },
    methods: {
    ...mapActions(['initScatter'])
  },
  created () {
    this.initScatter()
  },
  data() {
    return {
      store: store.store
    };
  },
};
</script>

<style>
#app {
  font-family: Poppins, sans-serif;
}
#game {
  background:rgba(6,19,20,1);;
  background-size: 100%;
  background-repeat: repeat repeat;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  letter-spacing: 0.5px;
}
footer {
  padding: 1rem 1rem;
  text-align: center;
  color: #FFFFFF;
  background: rgba(6, 19, 20, 1);
}
.socialBtn {
  border-radius: 100%;
}
.socialBtn img {
  width: 50px;
}
</style>
