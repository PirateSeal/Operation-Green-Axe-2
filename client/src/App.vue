<template>
  <div id="app">
    <app-nav v-if="isLogged"></app-nav>

    <router-view class="container" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import AppNav from './components/AppNav.vue';

export default {
  components: { AppNav },

  computed: {
    ...mapGetters({ isLogged: 'isLoggedIn' }),
  },
  mounted() {
    this.login(localStorage.token);
  },
  methods: mapActions(['login']),
};
</script>

<style lang="scss"></style>
