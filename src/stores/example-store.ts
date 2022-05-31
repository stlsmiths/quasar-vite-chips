import { defineStore } from 'pinia';
import {ref} from "vue";

const itags = [ 'red', 'green', 'drums', 'bass', 'piano', 'guitar', 'used', 'new',
  'bassoon', 'trumpet', 'violin', 'trombone' ]

export const useExampleStore = defineStore('example', {
  state: () => ({
    counter: 0,
    tags: [ ...itags],
    accounts: [ 'Todd test BofA Account', 'Jerry JPM Account', 'Helle HSBC Intnl', 'Jerry Goldman Tech1',
     'Jerry Merrill Basic', 'Frank BofA Core', 'Zelda JPM Family', 'Zero BofA Static' ],
    activeTags: []
  }),
  getters: {
    initTags: (state) => state.activeTags.length ? state.activeTags : [ itags[2], itags[3], itags[6] ],
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment(): void {
      this.counter++;
    },
    addTag(tag: string): void {
      this.tags.push( tag )
    },
    dropTag(tag: string): void {
      this.tags = this.tags.filter( t => t !== tag )
    },
    setTags(tags: string[]): void {
      this.activeTags = [...tags]
    }
  },
});
