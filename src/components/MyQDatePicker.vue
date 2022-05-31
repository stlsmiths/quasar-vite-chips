<template>
    <q-input
       filled
       v-model="dateStr"
       :label="label"
       :hint="hint"
       hide-hint
       :dense="dense"
       mask="####-##-##"
       :disable="disable"
       :lazy-rules="required"
       :rules="[ val => val && val.length > 0 || 'Entry is required']"
       @update:model-value="dateStr=$event;onInputUpdate($event)"
      >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" v-model="qpshow" transition-show="scale" transition-hide="scale">
            <q-date v-model="dateStr"
                    ref="qdate"
                    minimal
                    mask="YYYY-MM-DD"
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
  qpshow {{ qpshow }}
</template>

<script setup lang="ts">
import { ref,computed, watch, onMounted} from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
  },
  label: {
    type: String,
    default: 'Enter a Date'
  },
  hint: {
    type: String,
    default: 'YYYY-MM-DD format'
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

const dateStr = ref<string|null>(null)
const qdateProxy = ref(null)
const qpshow = ref(false)

onMounted(() => {
  if ( props.modelValue ) {
    dateStr.value = props.modelValue
  }
})

/*
watch( props.modelValue, (v) => {
  console.log('changeVal', v, dateStr.value )
  dateStr.value = v
}, { immediate: true })
*/

function changeValue( val ) {
  //this.$emit('input', )
  console.log('changeVal', val, dateStr.value )
  dateStr.value = val
}

function onDateUpdate(evt) {
  console.log('dateinput', evt)
  dateStr.value = evt
  emits('update:model-value', dateStr.value)
  // console.log('qdate', qdateProxy.value )
  qpshow.value = false
}

function onInputUpdate(evt) {
  console.log('onInput', evt)
  dateStr.value = evt
  emits('update:model-value', dateStr.value)
}
</script>

<style scoped>

</style>
