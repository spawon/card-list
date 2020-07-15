<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-md-10 col-sm-12">
        <div class="sort" @click="sort">
          Сначала {{old ? 'новые' : 'старые'}}
        </div>
        <card-list :list="list"/>
        <span v-for="pageNum in $store.state.card.pageCount" :key="pageNum.index"
             @click="setPage(pageNum)" style="cursor: pointer">
          {{pageNum === page ? `(${pageNum})`: pageNum}}
        </span>
      </div>
      <div class="col col-md-2 col-sm-12">
        <div class="row">
          <div class="col col-12">
            <p @click="filter('')">Все</p>
            <p v-for="category in $store.state.card.categories" :key="category.index" @click="filter(category)">
              {{$store.state.card.categoryEnum[category]}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardList from '../components/CardList'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: { CardList },
  data () {
    return {
      old: false,
      query: {},
      page: 1
    }
  },
  computed: {
    ...mapGetters({ cardList: 'card/get' }),
    list () {
      return this.cardList(this.page - 1)
    }
  },
  methods: {
    sort () {
      this.old = !this.old
      this.query.old = this.old
      this.$router.push({ path: '/', query: this.query })
      this.$store.commit('card/sort')
    },
    filter (item) {
      if (this.query.filter === item) { return }
      this.query.filter = item
      if (!item) { delete this.query.filter }
      if (!this.$route.query.filter && !this.query.filter) { return }
      this.$router.push({ path: '/', query: this.query })
      if (!this.$route.query.old) { this.sort() }
      this.$store.commit('card/filter', item)
    },
    setPage (pageNum) {
      if (this.query.page === pageNum) { return }
      this.query.page = pageNum
      this.$router.push({ path: '/', query: this.query })
      this.page = pageNum
    }
  },
  watch: {
    list () {
      if (this.page > this.$store.state.card.pageCount) {
        this.page = this.$store.state.card.pageCount
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('card/set')
    if (this.$route.query.old === 'true') { this.old = true; this.$store.commit('card/sort') }
    if (this.$route.query.page) { this.page = this.$route.query.page }
    if (this.$route.query.filter) {
      this.$store.commit('card/filter', this.$route.query.filter)
    }
  }
}
</script>

<style scoped>
  .sort{
    text-align: left;
    text-decoration: dashed;
    cursor: pointer;
  }
</style>
