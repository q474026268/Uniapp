import XtxSwper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'

import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwper: typeof XtxSwper
    XtxGuess: typeof XtxGuess
  }
}

// 组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
