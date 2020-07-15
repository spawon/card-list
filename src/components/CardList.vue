<template>
  <div class="row">
    <b-card v-for="card in list" :key="card.index" class="col col-md-6 mt-3">
      <b-card-header>
        <b-card-title>{{card.title}}</b-card-title>
      </b-card-header>
      <b-card-body>
        <b-card-text  v-html="card.text" />
      </b-card-body>
      <b-card-footer>
        <p>
          <span v-for="category in card.category" :key="category.index"> {{$store.state.card.categoryEnum[category]}} </span>
        </p>
        <b-button>
          <b-icon icon="heart" @click="star(card)"/>
        </b-button>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'CardList',
  props: {
    list: Array
  },
  methods: {
    star (item) {
      this.axios.post('/', item)
    }
  }
}
</script>

<style scoped>

</style>
