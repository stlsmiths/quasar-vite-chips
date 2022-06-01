<template>
    <q-input
       filled
       v-model="dateStr"
       :label="label"
       ref="qinput"
       :hint="hint"
       hide-hint
       :dense="dense"
       :mask="inputMask"
       :disable="disable"
       :lazy-rules="required"
       :rules="[ val => val && val.length > 0 || 'Entry is required']"
       @change="onChange"
      >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" v-model="qpshow" transition-show="scale" transition-hide="scale">
            <q-date v-model="dateStr"
                    minimal
                    :mask="qdateMask"
                    @update:model-value="onDateUpdate"
                    >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
</template>

<script setup lang="ts">
import { ref, watchEffect, watch, onMounted} from 'vue'

const props = defineProps({
  modelValue: {
    type: String
  },
  label: {
    type: String,
    default: 'Enter a Date'
  },
  hint: {
    type: String,
  },
  initToday: {
    type: Boolean,
    default: true
  },
  inputMask: {
    type: String,
    default: '####-##-##'
  },
  qdateMask: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  dense: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['input','update:model-value'])

const dateStr = ref<string|null>()
const qpshow = ref<boolean>(false)
const qinput = ref<any>()

watch(
    () => props.modelValue,
    (val) => {
      dateStr.value = props.modelValue
    },
    {immediate: true}
)

function fmtDate(d: any): string {
  return d.getMonth ? d.toISOString().substring(0,10) : new Date(d).toISOString().substring(0,10)
}

watchEffect( () => {
  if ( !props.modelValue || props.modelValue === '') {
    if ( props.initToday ) {
      dateStr.value = fmtDate( new Date() )
    }
  }
})

function changeValue( val: string ) {
  // console.log('changeVal', val, dateStr.value )
  dateStr.value = val
  emits('update:model-value', dateStr.value)
  qinput.value.blur()
  qpshow.value = false
}

function onDateUpdate(evt) {
  // console.log('dateinput', evt)
  changeValue(evt)
}

function onChange(evt) {
  // console.log('change', evt)
  changeValue(evt)
}
</script>

<style scoped>

</style>
