<template>
  <b-container fluid>
    <b-row class="my-2">
      <b-col sm="12">
        <label
            for="input-label"
        >
          {{isEdit ? 'Изменить название' : 'Название'}} рецепта:
        </label>
      </b-col>
      <b-col sm="12">
        <b-form-input
            v-model="modalData.name"
            :readonly="readonly"
            id="input-label"
            class="full-width"
        />
      </b-col>
    </b-row>

    <b-row class="my-2">
      <b-col sm="12">
        <label
            for="input-description"
        >
          {{isEdit ? 'Изменить подробное' : 'Подробное'}} описание:
        </label>
      </b-col>
      <b-col sm="12">
        <b-form-textarea
            v-model="modalData.fullDescription"
            :readonly="readonly"
            id="input-label"
            class="full-width"
        />
      </b-col>
    </b-row>

    <b-row class="my-2">
      <b-col sm="12">
        <label
            for="input-miniDescription"
        >
          {{isEdit ? 'Изменить краткое' : 'Краткое'}} описание:
        </label>
      </b-col>
      <b-col sm="12">
        <b-form-textarea
            v-model="modalData.shortDescription"
            :readonly="readonly"
            id="input-miniDescription"
            class="full-width"
        />
      </b-col>
    </b-row>

    <b-row
        v-if="isAdd"
        class="my-2"
    >
      <b-col sm="12">
        <label
            for="input-category"
        >
          Выберите категорию
        </label>
      </b-col>
      <b-col sm="12">
        <b-form-select
            v-model="modalData.categoryId"
            id="input-category"
            :options="options"
        />
      </b-col>
    </b-row>

    <b-row
        v-if="needDelete"
        class="my-2"
    >
      <b-col xs="12" sm="6">
      </b-col>
      <b-col xs="12" sm="6">
        <b-btn
            class="full-width"
            variant="danger"
            @click="$emit('deleteReceipt', modalData.index)"
        >
          Удалить
        </b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  name: "FormReceipt",
  props: {
    data: { type: Object, default: () => {} },
    isEdit: { type: Boolean, default: false },
    isAdd: { type: Boolean, default: false },
    needDelete: { type: Boolean, default: false },
  },
  computed: {
    modalData: {
      get() {
         return this.data
      },
      set(newValue) {
        this.$emit('update:data', newValue)
      }
    },
    readonly() {
      return !this.isEdit
    },
    options() {
      return this.$store.getters.getCategoryList
    }
  }
}
</script>

<style scoped>

</style>