<template>
  <ul>
    <li
        v-for="(item, index) in getCategories"
        :key="index"
        @click="getNewCategory(item)"
    >
      <b-btn
          class="my-1 full-width"
          :variant="getActiveCategory(item.value)"
          @click="setActiveCategory(item.value)"
      >
        {{ item.text }}
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
    },
    setActiveCategory(value) {
      this.$store.dispatch('setNewCategory', value)
    },
    getActiveCategory(value) {
      const active = this.$store.getters.getActiveCategory;
      return active === value ? 'info' : 'success'
    },
  },
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