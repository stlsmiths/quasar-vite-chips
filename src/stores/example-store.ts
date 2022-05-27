import { defineStore } from 'pinia';
import {ref} from "vue";

export const useExampleStore = defineStore('example', {
  state: () => ({
    counter: 0,
    tags: [ 'red', 'green', 'drums', 'bass', 'piano', 'guitar', 'used', 'new',
           'bassoon', 'trumpet', 'violin', 'trombone' ],
    accounts: [ 'Todd test BofA Account', 'Jerry JPM Account', 'Helle HSBC Intnl', 'Jerry Goldman Tech1',
     'Jerry Merrill Basic', 'Frank BofA Core', 'Zelda JPM Family', 'Zero BofA Static' ]

  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    addTag(tag: string) {
      this.tags.push( tag )
    },
    dropTag(tag: string) {
      this.tags = this.tags.filter( t => t !== tag )
    }
  },
});
