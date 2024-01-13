<template>
  <header
      class="row align-items-center justify-content-between flex-wrap card-header"
  >
    <div
        class="row align-items-center"
    >
      <img
          class="logo"
          src="img/logo.png"
          alt="logo"
      >

      <span class="font-weight-bold">Recepts</span>
    </div>

    <b-btn
        variant="primary"
        @click="openModal = true"
    >
      Добавить новый рецепт
    </b-btn>

    <b-modal
        :visible="openModal"
        title="Новый рецепт"
        ok-title="Добавить"
        cancel-title="Закрыть"
        centered
        @ok="addNewReceipt"
        @hide="closeModal"
    >
      <b-container fluid>
        <FormReceipt
            :data="modalData"
            is-edit
            is-add
        />
      </b-container>
    </b-modal>
  </header>
</template>

<script>

import FormReceipt from "@/components/FormReceipt.vue";

export default {
  name: "Header",
  components: {FormReceipt},
  data() {
    return {
      openModal: false,
      modalData: {},
    }
  },
  methods: {
    closeModal() {
      this.openModal = false;
      this.modalData = {};
    },
    addNewReceipt() {
      this.$store.dispatch('addNewReceipt', this.modalData)
    }
  }
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
  border: 1px solid rgba(0, 0, 0, .125);
}
</style>