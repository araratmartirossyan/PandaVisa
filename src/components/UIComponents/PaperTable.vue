<template>
  <div>
    <div class="header">
      <slot name="header">
        <h4 class="title">{{title}}</h4>
        <p class="category">{{subTitle}}</p>
      </slot>
    </div>
    <div class="header">
      <div class="row">
        <div 
          class="col-md-3" 
          v-for="(filter, key) in filters"
          :key="key">
          <select 
            class="form-control"
            :placeholder="filter.label"
            @change="selectFilter(filter.field, $event.target.value)">
            <option 
              :label="filter.label" 
              value="" 
            />
            <option 
              v-for="(option, key) in filter.options"
              :key="key"
              :label="option"
              :value="option"
            />
          </select>
        </div>
      </div>
    </div>
    <div class="content table-responsive table-full-width">
      <table class="table" :class="tableClass">
        <thead>
          <th>#</th>
          <th v-for="column in columns">
            <span v-if="!column.isIcon">{{column.title}}</span>
            <span 
              v-if="column.isIcon" 
              :class="column.icon"
              data-toggle="tooltip" 
              data-placement="top" 
              :title="column.title"
            />
          </th>
          <th>Действия</th>
        </thead>
        <tbody>
          <tr 
            v-for="(item, key) in filtered"
            :key="key">
            <td>{{ key + 1 }}</td>
            <td v-for="column in columns"
              v-if="hasValue(item, column.field)"
            >
              {{itemValue(item, column.field)}}
            </td>
            <td>
              <template v-for="action in actions">
                <button 
                  v-if="action.tag === 'button' && action.dynamic"
                  type="button"
                  :class="action.class"
                  @click="$emit(action.emit, item._id)"
                >
                  {{ buttonText(item) }}
                </button>
                <button 
                  v-if="action.tag === 'button' && !action.dynamic"
                  type="button"
                  :class="action.class"
                  @click="$emit(action.emit, item._id)"
                >
                  {{ action.label }}
                </button>
                <router-link
                  v-if="action.tag === 'link'" 
                  :class="action.class"
                  :to="`${action.to}/${item._id}`"
                >
                  {{ action.label }}
                </router-link>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        filtersArray: []
      }
    },
    props: {
      columns: Array,
      actions: Array,
      filters: Array,
      data: Array,
      type: {
        type: String, // striped | hover
        default: 'striped'
      },
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''

      }
    },
    mounted () {
      console.log(this.data)
    },
    computed: {
      tableClass () {
        return `table-${this.type}`
      },
      filtered () {
        const values = [...this.data]
        return values.filter(value => {
          let flag = true
          const filters = [...this.filtersArray]
          for (let i in filters) {
            if (filters[i].value !== '') {
              const key = filters[i].key
              if (value[key] !== filters[i].value) {
                flag = false
                break
              }
            }
          }
          return flag
        })
      }
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      },
      buttonText (item) {
        const text = item.suspended ? 'Unsuspend' : 'Suspend'
        return text
      },
      selectFilter (key, value) {
        const index = this.filtersArray.findIndex(filter => filter.key === key)
        if (index === -1) {
          this.filtersArray.push({ key, value })
        } else {
          this.filtersArray[index].value = value
        }
      }
    }
  }

</script>
<style lang="css" scoped>
  th, td {
    text-align: center !important;
  }
</style>
