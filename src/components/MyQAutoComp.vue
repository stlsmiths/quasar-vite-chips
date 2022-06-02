<template>
    <q-select
      v-if="items && items.length"
      ref="qselect"
      v-model="lvalue"
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
      input-debounce="200"
      @input-value="lvalue = $event"
      @update:model-value="updateValue"
      @clear="clearInput"
      @filter="filterFn"
      @input="inputEvent"
    >
    </q-select>
</template>

<script setup lang="ts">
import {ref,watch,watchEffect} from 'vue'

// import {arrayMultiSort} from 'src/common/common-functions';
function arrayMultiSort(arr: any[], order: any): any[] {
  return arr
}

const emits = defineEmits([ 'input', 'clear', 'update:model-value'])

const props = defineProps({
  modelValue: {
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
const qselect = ref<any>()

/*
watch(
    () => props.value,
    (v) => { syncValue(v) },
    {immediate: true}
)
*/

watchEffect( () => {
  syncValue( props.modelValue )
})

watch(
  () => props.items,
  (vals) => {
    if ( vals && vals.length ) {
      options.value = props.sortOrder ? arrayMultiSort( [...vals], props.sortOrder) : [...vals]
    }
  },
  {immediate: true}
)

function syncValue(val: any): void {
  lvalue.value = val
  if ( !original.value ) {
    original.value = val
  }
  console.log('syncValue', lvalue.value, 'original', original.value)
}

function filterFn( val: string, update: Function ) {
  update(() => {
    console.log('update fired', val)
    if ( !val.length ) {
      options.value = props.items
    } else {
      const needle = val && val.toLowerCase ? val.toLowerCase() : ''
      const loptions = props.items.filter( v => {
          const chk = v[props.optionLabel] && v[props.optionLabel].toLowerCase
            ? v[props.optionLabel] : v[props.optionValue]
          return chk && chk.toLowerCase ? chk.toLowerCase().includes( needle ) : false
        })
      if ( props.sortOrder ) {
        console.log('using sortOrder', props.sortOrder)
      }
      options.value = props.sortOrder ? arrayMultiSort( loptions, props.sortOrder ) : loptions
    }
  })
}

//TODO: fix this, to work with clearable and reset ... not working properly
function clearInput(): void {
  // console.log('clearval', this.lvalue, this.original)
  // this.$refs.qselect.updateInputValue('',true)
  console.log('clearInput')
  qselect.value.updateInputValue('',true)
  // this.$nextTick( () => {
  lvalue.value = original.value
  emits('clear')
  //})
}

function inputEvent( evt: any ) {
  console.log('input event', evt, lvalue.value )
  emits('input', evt )
}

function updateValue(evt: any) {
  lvalue.value = evt
  emits('update:model-value', evt)
}

</script>

<style scoped>

</style>
