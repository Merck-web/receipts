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
            v-model="modalData.label"
            :readonly="!isEdit"
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
            v-model="modalData.description"
            :readonly="!isEdit"
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
            v-model="modalData.miniDescription"
            :readonly="!isEdit"
            id="input-miniDescription"
            class="full-width"
        />
      </b-col>
    </b-row>

    <b-row
        v-if="isEdit"
        class="my-2"
    >
      <b-col xs="12" sm="6">
        <label
            for="input-miniDescription"
        >
        </label>
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
    isEdit: { type: Boolean, default: false }
  },
  computed: {
    modalData: {
      get() {
         return this.data
      },
      set(newValue) {
        this.$emit('update:data', newValue)
      }
    }
  }
}
</script>

<style scoped>

</style>