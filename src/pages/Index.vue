<template>
  <b-container>
    <b-row
        class="mb-3"
    >
      <b-col>
        <Header/>
      </b-col>
    </b-row>
    <b-row>
      <b-col
          :xs="12"
          :lg="2"
      >
        <Category/>
      </b-col>
      <b-col
          :xs="12"
          :lg="10"
      >
        <List
            @getDescription="getDescription"
            @editDescription="editDescription"
        />
      </b-col>
    </b-row>


    <b-modal
        :visible="openModal"
        :title="`Рецепт №${modalData.index + 1}`"
        ok-title="Закрыть"
        ok-only
        centered
        @hide="closeModal"
    >
      <b-container fluid>
        <FormReceipt
            :data="modalData"
        />
      </b-container>
    </b-modal>

    <b-modal
        :visible="openModalEdit"
        :title="`Редактирование рецепта №${modalData.index + 1}`"
        centered
        ok-title="Сохранить"
        cancel-title="Закрыть"
        @ok="saveEditReceipt"
        @hide="closeModal"
    >
      <b-container fluid>
        <FormReceipt
            :data="modalData"
            is-edit
            @deleteReceipt="deleteReceipt"
        />
      </b-container>
    </b-modal>
  </b-container>
</template>

<script>

import Category from "@/components/Category.vue";
import List from "@/components/List.vue";
import Header from "@/components/Header.vue";
import FormReceipt from "@/components/FormReceipt.vue";

export default {
  name: "Index",
  components: {FormReceipt, Header, List, Category},
  data() {
    return {
      openModal: false,
      openModalEdit: false,
      modalData: {},
    }
  },
  methods: {
    closeModal() {
      this.openModal = false;
      this.openModalEdit = false;
      this.modalData = {};
    },
    getDataReceipt(index) {
      this.modalData = {...this.getReceiptList[index]};
      this.modalData.index = index;
    },
    getDescription(index) {
      this.getDataReceipt(index);
      this.openModal = true;
    },
    editDescription(index) {
      this.getDataReceipt(index);
      this.openModalEdit = true;
    },
    saveEditReceipt() {
      this.$store.dispatch('saveEditReceipt', {
        index: this.modalData.index,
        newValue: this.modalData
      })
    },
    deleteReceipt(index) {
      this.$store.dispatch('deleteReceipt', index)
      this.closeModal();
    }
  },
  computed: {
    getReceiptList() {
      return this.$store.getters.getReceiptList
    }
  }
}
</script>

<style scoped>

</style>