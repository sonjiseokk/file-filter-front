<template>
  <div class="history-container">
    <h2>해제 이력</h2>
    <table v-if="history.length">
      <thead>
        <tr>
          <th>확장자</th>
          <th>해제 일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in history" :key="idx">
          <td>{{ item.extension }}</td>
          <td>{{ formatDate(item.deletedAt) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="empty-msg">해제 이력이 없습니다.</div>
    <router-link to="/">
      <button class="home-btn">홈으로</button>
    </router-link>
  </div>
</template>

<script>
const API_BASE = process.env.VUE_APP_API_BASE_URL;
export default {
  name: 'HistoryPage',
  data() {
    return {
      history: []
    }
  },
  mounted() {
    fetch(`${API_BASE}/api/admin/extensions/history`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.history = data.data;
        }
      })
  },
  methods: {
    formatDate(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleString();
    }
  }
}
</script>

<style scoped>
.history-container {
  width: 500px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}
th, td {
  border: 1px solid #bbb;
  padding: 0.5rem 1rem;
  text-align: center;
}
th {
  background: #e0e0e0;
}
.empty-msg {
  color: #888;
  margin-bottom: 1.5rem;
}
.home-btn {
  font-size: 1.1rem;
  padding: 0.7rem 2rem;
  margin-top: 1rem;
  cursor: pointer;
}
</style> 