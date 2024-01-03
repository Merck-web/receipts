<template>
  <header
      class="row align-items-center justify-content-between flex-wrap card-header"
  >
    <img
        class="logo"
        src="img/logo.png"
        alt="logo"
    >

    <b-btn
        variant="primary"
    >
      Добавить новый рецепт
    </b-btn>
  </header>
</template>

<script>

export default {
  name: "Header"
}
</script>

<style
    scoped
    lang="scss"
>
.logo {
  width: 50px;
  height: 50px;
}
.card-header {
  border: 1px solid rgba(0,0,0,.125);
}
</style>