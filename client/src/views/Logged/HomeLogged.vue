<template>
  <div class="jumbotron">
    <h1 class="display-3">Welcome to Operation Green Axe 2 website</h1>
    <p class="lead">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, praesentium numquam, earum
      quam illum fuga possimus quis eos quod magni obcaecati commodi, ex nemo reiciendis veniam
      mollitia officia fugit inventore.
    </p>
    <hr class="my-4" />
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum tempora, quia ad eos magni
      aspernatur saepe distinctio ea, sit animi autem ex excepturi repellendus a corrupti iste
      dolore provident alias.
    </p>

    <div>
      <h1>Holà que tàl ? u suk biatch</h1>
      <img :src="user.image_url" alt srcset />
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.user = this.$store.getters.isLoggedIn;
  },
};
</script>
