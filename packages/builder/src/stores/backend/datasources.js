import { writable } from "svelte/store"
import { queries } from "./"
import api from "../../builderStore/api"

export const INITIAL_DATASOURCE_VALUES = {
    list: [],
    selected: null,
  }

export function createDatasourcesStore(_api = api) {
  const { subscribe, update, set } = writable(INITIAL_DATASOURCE_VALUES)

  return {
    subscribe,
    set,
    update,
    init: () => set(INITIAL_DATASOURCE_VALUES),
    fetch: async () => {
      const response = await api.get(`/api/datasources`)
      const json = await response.json()
      update(state => ({ ...state, list: json }))
      return json
    },
    select: async datasourceId => {
      update(state => ({ ...state, selected: datasourceId }))
      queries.update(state => ({ ...state, selected: null }))
    },
    save: async datasource => {
      const response = await api.post("/api/datasources", datasource)
      const json = await response.json()

      update(state => {
        const currentIdx = state.list.findIndex(ds => ds._id === json._id)

        const sources = state.list

        if (currentIdx >= 0) {
          sources.splice(currentIdx, 1, json)
        } else {
          sources.push(json)
        }

        return { list: sources, selected: json._id }
      })
      return json
    },
    delete: async datasource => {
      const response = await api.delete(`/api/datasources/${datasource._id}/${datasource._rev}`)
      const json = await response.json()
      update(state => {
        const sources = state.list.filter(
          existing => existing._id !== datasource._id
        )
        return { list: sources, selected: null }
      })

      return json
    },
  }
}

export const datasources = createDatasourcesStore()
