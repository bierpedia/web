<template>
  <div class="container-fluid">
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #7f8d8c;
    }
  }
  
}
a {
  color:#CA3D00;
  transition: color 0.1s linear 0s;
}

a:hover, a:focus, a:active {
  outline: 0;
  color: #7f8d8c;
}
</style>
