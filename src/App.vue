<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <footer>
      <div class="info">
      Great products and services don’t just happen. 
      Behind them lies a development process that starts with careful consideration 
      of market needs, the competitive environment and company resources.
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

// Don't forget to tell ScatterJS which plugins you are using.

export default {
  name: 'App',
  methods: {
    ...mapActions(['initScatter'])
  },
  created () {
    this.initScatter()
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
footer {
  background: #20142A;
  height: 350px;
  text-align: center;
  padding: 70px;
}
footer .info {
  background: url('/static/img/footer.png');
  background-size: cover;
  color: #00FF76;
  font-size: 2rem;
}
</style>
