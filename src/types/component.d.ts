import XtxSwper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'

import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwper: typeof XtxSwper
    XtxGuess: typeof XtxGuess
  }
}
