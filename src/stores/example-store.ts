import { defineStore } from 'pinia';
import {ref} from "vue";

const itags = [ 'red', 'green', 'drums', 'bass', 'piano', 'guitar', 'used', 'new',
  'bassoon', 'trumpet', 'violin', 'trombone' ] as string[]

const iaccts = [
  { aid: 100, aname: 'Todd test BofA Account', anum: '988-054'},
  { aid: 909, aname: 'Jerry JPM Account', anum: 'XYZ-100'},
  { aid: 1, aname: 'Helle HSBC Intnl', anum: '45698732'},
  { aid: 1200, aname: 'Jerry Goldman Tech1', anum: 'GS0987632'},
  { aid: 456, aname: 'Jerry Merrill Basic', anum: 'ML123456'},
  { aid: 10987, aname: 'Frank BofA Core', anum: '7-096234'},
  { aid: 17, aname: 'Zelda JPM Family', anum: '40921'},
  { aid: 32, aname: 'Zero BofA Static',  anum: '111-9876'}
] as object[]

export const useExampleStore = defineStore('example', {
  state: () => ({
    counter: 0,
    tags: [...itags],
    accounts: [...iaccts],
    activeTags: [] as string[]
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
