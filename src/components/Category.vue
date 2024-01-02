<template>
  <ul>
    <li
        v-for="(item, index) in getCategories"
        :key="index"
        @click="getNewCategory(item)"
    >
      <b-btn
          class="my-1 full-width"
          variant="success"
      >
        {{ item.label }}
      </b-btn>
    </li>
  </ul>
</template>

<script>

export default {
  name: "Category",
  computed: {
    getCategories() {
      return this.$store.getters.getCategoryList
    }
  },
  methods: {
    getNewCategory(item) {
      this.$store.dispatch('getReceiptList', item)
    }
  }
}
</script>

<style
    lang="scss"
    scoped
>
li {
  cursor: pointer;
}
</style>