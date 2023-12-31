<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import CustomNavbar from './componets/CustomNavbar.vue'
import CategoryPanel from './componets/CategoryPanel.vue'
import HotPanel from '@/components/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/component'
import PageSkeleton from './componets/PageSkeleton.vue'

const bannerList = ref<BannerItem[]>([])
// 获取轮播图数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 获取猜你喜欢组件实例
const guessRef = ref<XtxGuessInstance>()
// 滚动触底
const onScrolltolower = () => {
  guessRef.value?.getMore()
}

// 当前下拉刷新状态
const isTriggered = ref(false)

// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 重置猜你喜欢组件数据
  guessRef.value?.resetData()
  // 加载数据
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  // 关闭动画
  isTriggered.value = false
}

// 是否加载中标记
const isLoading = ref(false)

onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <scroll-view
    scroll-y
    class="scrolly-view"
    refresher-enabled
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    @refresherrefresh="onRefresherrefresh"
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  height: 100%;
}

.scrolly-view {
  flex: 1;
}
</style>
