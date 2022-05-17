<template>
  <q-select
    v-if="items && items.length"
    v-model="valueArray"
    :value="taginput"
    :label="label"
    class="tags-input"
    filled
    use-chips
    use-input
    hide-hint
    hide-bottom-space
    multiple
    dense="dense"
    input-debounce="200"
    :options="tagOptions"
    :disable="disable"
    @filter="filterTags"
    @new-value="createTag"
    @input="inputEvent"
  >
  </q-select>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      default: 'Enter tags:'
    },
    items: {
      type: Array
    },
    arraySeparator: {
      type: String,
      default: ' '
    },
    disable: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    returnString: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      valueArray: null,
      vmodel: '',

      taginput: null,
      tagsModel: ['xyz', 'test'],
      tagOptions: []
    }
  },
  watch: {
    value: {
      handler: 'syncValue',
      immediate: true,
      deep: true
    }
  },
  methods: {

    syncValue(val) {
      this.valueArray = this.str2Array( val )
    },

    str2Array( str ) {
      return str.split( this.arraySeparator )
    },
    array2Str( arr ) {
      return arr.join( this.arraySeparator )
    },

    filterTags( val, update) {
      update(() => {
        if ( !val.length ) {
          this.tagOptions = this.items
        } else {
          const needle = val.toLocaleLowerCase()
          this.tagOptions = this.items.filter( v => v.toLocaleLowerCase().includes( needle ) ) //.indexOf(needle) > -1)
        }
      })
    },

    createTag(val,done) {
      this.$store.dispatch('data/addItem', { sprop: 'tags', item: val })
        .then( () => {
          done( val,'add-unique')
          console.log('added store tag', val)
        })
    },

    inputEvent( evt ) {
//      console.log('input event', evt, this.array2Str(evt), this.valueArray)
      this.$emit('input', this.returnString ? this.array2Str( evt ) : evt )
    },

  },
  mounted() {
    /*
        if ( this.value && this.value.length ) {
          this.valueArray = this.str2Array( this.value )
        }
    */
  }
}
</script>

<style scoped lang="scss">
.q-chip {
  background-color: pink !important;
}
</style>
