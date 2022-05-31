<template>
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
</template>

<script setup lang="ts">
import {ref,computed,watch} from 'vue'

// import {arrayMultiSort} from 'src/common/common-functions';
function arrayMultiSort(arr) {
  return arr
}

const emits = defineEmits([ 'input', 'update:model-value' ])

const props = defineProps({
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
})

const lvalue = ref<any>()
const original = ref<any>()
const options = ref<any[]>([])

watch(
    () => props.value,
    (v) => { syncValue(v) },
    {immediate: true}
)

/*
  watch: {
    value: {
      handler: 'syncValue',
      immediate: true,
      deep: true
    },
  },
*/

function syncValue(val) {
  lvalue.value = val
  if ( !original.value ) {
    original.value = val
  }
}

//TODO: fix this, to work with clearable and reset ... not working properly
function clearInput() {
     // console.log('clearval', this.lvalue, this.original)
      this.$refs.qselect.updateInputValue('',true)
      this.$nextTick( () => {
        this.lvalue = this.original
      })
    }

function filterFn( val, update ) {
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
    }

function inputEvent( evt ) {
//   console.log('input event', evt, this.lvalue )
  this.$emit('input', evt )
}

function mounted() {
  if ( this.items && this.items.length ) {
    this.options = this.sortOrder ? arrayMultiSort( [...this.items],this.sortOrder) : [...this.items]
  }
}
</script>

<style scoped>

</style>
