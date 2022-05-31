<template>
    <q-input
       filled
       :value="dateStr"
       :label="label"
       :hint="hint"
       hide-hint
       :dense="dense"
       mask="####-##-##"
       :disable="disable"
       :lazy-rules="required"
       :rules="[ val => val && val.length > 0 || 'Entry is required']"
       @input="onInput"
      >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="dateStr"
                    minimal
                    mask="YYYY-MM-DD"
                    @input="dateInput"
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

<script>
export default {
  props: {
    value: {
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
  },
  data() {
    return {
      dateStr: null
    }
  },
  watch: {
    value: {
      handler: 'changeValue',
      immediate: true
    }
  },
  methods: {
    changeValue( val ) {
      //this.$emit('input', )
      console.log('changeVal', val, this.dateStr )
      this.dateStr = val
    },

    dateInput(evt) {
      console.log('dateinput', evt)
      this.dateStr = evt
      this.$emit('input', this.dateStr)
    },

    onInput(evt) {
      console.log('onInput', evt)
      this.dateStr = evt
      this.$emit('input', this.dateStr)
    }
  },
}
</script>

<style scoped>

</style>
