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
      {{modalData.description}}
    </b-modal>

    <b-modal
        :visible="openModalEdit"
        :title="`Редактирование рецепта №${modalData.index + 1}`"
        centered
        ok-title="Сохранить"
        cancel-title="Закрыть"
        @hide="closeModal"
    >
      <b-input-group size="lg" prepend="$" append=".00">
        <b-form-input
            v-model="modalData.label"
        />
      </b-input-group>
      {{modalData.description}}
    </b-modal>
  </b-container>

</template>

<script>

import Category from "@/components/Category.vue";
import List from "@/components/List.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Index",
  components: {Header, List, Category},
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