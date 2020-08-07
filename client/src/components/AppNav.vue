<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" :href="home">Operation Green Axe 2</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor01"
      aria-controls="navbarColor01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav mr-auto">
        <li :class="'nav-item', ">
          <a class="nav-link" :href="warRoom">War Room</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :href="teams">Teams</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :href="profile">Profile</a>
        </li>
        <li v-if="this.isAdmin" class="nav-item">
          <a class="nav-link" :href="profile">Admin panel</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0" data-children-count="1">
        <input class="form-control mr-sm-2" type="text" placeholder="Search" />
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Nav',

  date() {
    return {
      isAdmin: false,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({ isAdmin: 'isAdmin' }),
    host() {
      if (window.location.hostname === 'localhost') {
        return 'http://localhost:8080/';
      }
      return 'https://opga.tcousin.com/';
    },
    CurrentPage() {
      return this.$route.path;
    },
    home() {
      return `${this.host}Home`;
    },
    warRoom() {
      return `${this.host}WarRoom`;
    },
    teams() {
      return `${this.host}Teams`;
    },
    profile() {
      return `${this.host}Profile`;
    },
  },
};
</script>

<style></style>
