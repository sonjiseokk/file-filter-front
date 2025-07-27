<template>
  <div class="home-container">
    <h1>마드라스체크 개발자 과제 제출</h1>
    <p>제출자 : 손지석</p>
    <p>좌측: 업로드 | 우측: 관리자</p>
    <router-link to="/history">
      <button class="history-btn">차단 해제 이력 확인</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style scoped>
.home-container {
  text-align: center;
}
.history-btn {
  margin-top: 2rem;
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  cursor: pointer;
}
</style> 