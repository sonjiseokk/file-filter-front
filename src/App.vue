<template>
  <div id="main-layout">
    <div class="header">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" v-if="route.path === '/'" />
      </router-view>
    </div>
    <div v-if="$route.path === '/'" class="nav-row">
      <router-link to="/upload">
        <button class="nav-btn">업로드</button>
      </router-link>
      <router-link to="/admin">
        <button class="nav-btn">관리자</button>
      </router-link>
    </div>
    <div class="center">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" v-if="route.path !== '/'" />
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header {
  margin-bottom: 2rem;
  text-align: center;
}
.nav-row {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}
.nav-btn {
  font-size: 1.5rem;
  padding: 1rem 2rem;
  cursor: pointer;
}
.center {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
