<template>
  <div>
    <q-select
      v-if="items && items.length"
      ref="qselect"
      :value="lvalue"
      :label="label"
      :options="options"
      filled
      use-input
      fill-input
      hide-selected
      map-options
      clearable
      :dense="dense"
      :disable="disable"
      :option-label="optionLabel"
      :option-value="optionValue"
      @input-value="lvalue = $event"
      input-debounce="200"
      @clear="clearInput"
      @filter="filterFn"
      @input="inputEvent"
    >
    </q-select>
  </div>
</template>

<script>

import {arrayMultiSort} from "src/common/common-functions";

export default {
  name: 'TRAutoComp',
  emits: [ 'input' ],
  props: {
    value: {
      type: [String,Number,Object],
    },
    items: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: 'Autocomplete Label'
    },
    optionValue: {
      type: String,
      required: true
    },
    optionLabel: {
      type: String,
      required: true
    },
    sortOrder: {
      type: String,
    },
    disable: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lvalue: null,
      original: null,
      options: []
    }
  },
  watch: {
    value: {
      handler: 'syncValue',
      immediate: true,
      deep: true
    },
  },
  methods: {

    syncValue(val) {
      this.lvalue = val
      if ( !this.original ) {
        this.original = val
      }
    },

    //TODO: fix this, to work with clearable and reset ... not working properly
    clearInput() {
     // console.log('clearval', this.lvalue, this.original)
      this.$refs.qselect.updateInputValue('',true)
      this.$nextTick( () => {
        this.lvalue = this.original
      })
    },

    filterFn( val, update ) {
      update(() => {
        if ( !val.length ) {
          this.options = this.items
        } else {
          const needle = val && val.toLowerCase ? val.toLowerCase() : ''
          const options = this.items.filter( v => {
              const chk = v[this.optionLabel] && v[this.optionLabel].toLowerCase ? v[this.optionLabel] : v[this.optionValue]
              return chk && chk.toLowerCase ? chk.toLowerCase().includes( needle ) : false
            })
          if ( this.sortOrder ) {
            console.log('using sortOrder', this.sortOrder)
          }
          this.options = this.sortOrder ? arrayMultiSort( options, this.sortOrder ) : options
        }
      })
    },

    inputEvent( evt ) {
   //   console.log('input event', evt, this.lvalue )
      this.$emit('input', evt )
    },

  },
  mounted() {
    if ( this.items && this.items.length ) {
      this.options = this.sortOrder ? arrayMultiSort( [...this.items],this.sortOrder) : [...this.items]
    }
  }
}
</script>

<style scoped>

</style>
