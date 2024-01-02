<template>
  <div
      class="row flex-wrap justify-content-start align-items-center"
  >
    <b-card
        v-for="(item, index) in getList"
        :title="item.label"
        :header="`Рецепт №${index + 1}`"
        class="m-2"
        header-tag="header"
        style="max-width: 280px;"
    >
      <b-card-text
          class="mb-3"
      >
        {{item.miniDescription}}
      </b-card-text>


      <template
          v-slot:footer
      >
        <b-row>
          <b-col>
            <b-button
                class="my-1"
                variant="info"
                style="font-size: 12px;"
                @click="$emit('getDescription', index)"
            >
              Подробнее
            </b-button>
          </b-col>
          <b-col>
            <b-button
                class="my-1"
                variant="warning"
                style="font-size: 12px;"
                @click="$emit('editDescription', index)"
            >
              Редактировать
            </b-button>
          </b-col>
        </b-row>
      </template>
    </b-card>
  </div >
</template>

<script>

export default {
  name: "List",
  computed: {
    getList() {
      return this.$store.getters.getReceiptList
    }
  }
}
</script>
