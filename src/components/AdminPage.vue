<template>
  <div class="admin-container">
    <h2>제한 확장자 관리</h2>
    <div class="default-ext-row">
      <label v-for="ext in defaultExtensions" :key="ext.extension" class="default-ext-item">
        <input type="checkbox"
               :checked="ext.checked"
               :disabled="ext.loading"
               @change="onDefaultCheckChange(ext)" />
        {{ ext.extension }}
      </label>
    </div>
    <div class="add-ext">
      <input 
        v-model="newExt" 
        placeholder="확장자 입력 (예: jpg)" 
        @keydown="onKeyDown"
        @keyup.enter="addExtension"
        maxlength="20"
      />
      <button @click="addExtension">추가</button>
    </div>
    <div class="ext-list">
      <div v-for="ext in extensions" :key="ext" class="ext-item">
        {{ ext }}
        <button class="remove-btn" @click="removeExtension(ext)">x</button>
      </div>
    </div>
    <router-link to="/">
      <button class="home-btn">홈으로</button>
    </router-link>
  </div>
</template>

<script>
const API_BASE = process.env.VUE_APP_API_BASE_URL;
export default {
  name: 'AdminPage',
  data() {
    return {
      newExt: '',
      extensions: [], // customExtensions
      defaultExtensions: [],
    }
  },
  mounted() {
    fetch(`${API_BASE}/api/admin/extensions`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // 각 default 확장자에 loading 속성 추가
          this.defaultExtensions = data.data.defaultExtensions.map(ext => ({ ...ext, loading: false }))
          this.extensions = data.data.customExtensions
        }
      })
  },
  methods: {
    addExtension() {
      // 공백 제거 및 유효성 검사
      const trimmedExt = this.newExt.trim();
      
      if (!trimmedExt) {
        alert('확장자를 입력해주세요.');
        return;
      }
      
      fetch(`${API_BASE}/api/admin/extensions/custom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extension: trimmedExt })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.extensions.push(trimmedExt)
            this.newExt = ''
          } else if (data.error && data.error.message) {
            alert(data.error.message)
          } else {
            alert('추가에 실패했습니다.')
          }
        })
    },
    removeExtension(ext) {
      fetch(`${API_BASE}/api/admin/extensions/custom/${ext}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.extensions = this.extensions.filter(e => e !== ext)
          } else {
            alert('삭제에 실패했습니다.')
          }
        })
    },
    onKeyDown(event) {
      // 스페이스바 입력 차단
      if (event.key === ' ') {
        event.preventDefault();
      }
    },
    onDefaultCheckChange(ext) {
      ext.loading = true
      fetch(`${API_BASE}/api/admin/extensions/default/${ext.extension}`, {
        method: 'PATCH'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            ext.checked = !ext.checked
          } else {
            alert('변경에 실패했습니다.')
          }
        })
        .finally(() => {
          ext.loading = false
        })
    }
  }
}
</script>

<style scoped>
.admin-container {
  width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.default-ext-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}
.default-ext-item {
  display: flex;
  align-items: center;
  font-size: 1rem;
  background: #f0f0f0;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
}
.add-ext {
  display: flex;
  margin-bottom: 1rem;
}
.add-ext input {
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
}
.add-ext button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
}
.ext-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.ext-item {
  background: #e0e0e0;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}
.remove-btn {
  margin-left: 0.5rem;
  background: #ff5252;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}
.home-btn {
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  margin-top: 1.5rem;
  cursor: pointer;
}
</style>