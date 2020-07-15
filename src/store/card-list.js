import { getAll } from '../api/dev/card-service'

export const card = {
  state: () => ({
    list: [],
    filteredList: [],
    categories: [],
    categoryEnum: {
      cat1: 'Новости',
      cat2: 'Эксклюзив',
      cat3: 'Новинка',
      cat4: 'Разное'
    },
    perPage: 10,
    pageCount: 0
  }),
  getters: {
    get: (s) => (i) => {
      const list = s.filteredList.length ? s.filteredList : s.list
      s.pageCount = Math.ceil(list.length / s.perPage)
      return list.slice(i * s.perPage, s.perPage + i * s.perPage)
    }
  },
  mutations: {
    set: (s, l) => { s.list = l },
    filter: (s, f) => {
      s.filteredList = s.list.filter(e => {
        return e.category.includes(f)
      })
    },
    setCategories: (s, l) => { s.categories = l },
    sort: (s) => { s.filteredList.length ? s.filteredList.reverse() : s.list.reverse() }
  },
  actions: {
    async set ({ commit }) {
      const data = await getAll()
      data.sort((a, b) => {
        return a.date - b.date
      }).reverse()

      const categories = []

      data.forEach(e => {
        categories.push(...e.category)
      })
      commit('setCategories', [...new Set(categories)])
      commit('set', data)
    }
  }
}
