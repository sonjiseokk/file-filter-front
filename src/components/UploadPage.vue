<template>
  <div class="upload-container">
    <input
      ref="fileInput"
      type="file"
      style="display:none"
      @change="onFileChange"
    />
    <button class="upload-btn" :disabled="loading" @click="triggerFileInput">
      {{ loading ? '업로드 중...' : '업로드' }}
    </button>
    <div v-if="result" class="result-box">
      <div v-if="result.success">
        <p>파일명: {{ result.data.name }}</p>
        <p>확장자: {{ result.data.extension }}</p>
        <p>업로드 시간: {{ result.data.created_at }}</p>
        <p class="success-msg">{{ result.message }}</p>
      </div>
      <div v-else class="error-msg">
        <template v-if="result.error && (result.error.message || result.error.fileName || result.error.fileExtension)">
          <p v-if="result.error.message">{{ result.error.message }}</p>
          <p v-if="result.error.fileName">파일명: {{ result.error.fileName }}</p>
          <p v-if="result.error.fileExtension">확장자: {{ result.error.fileExtension }}</p>
        </template>
        <p v-if="result.error && result.error.details">상세: {{ result.error.details }}</p>
        <p v-else-if="!result.error || (!result.error.message && !result.error.fileName && !result.error.fileExtension)">알 수 없는 오류가 발생했습니다.</p>
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
  name: 'UploadPage',
  data() {
    return {
      loading: false,
      result: null,
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.loading = true;
      this.result = null;
      const formData = new FormData();
      formData.append('file', file);
      fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData
      })
        .then(async res => {
          let data = null;
          try {
            data = await res.json();
          } catch {
            data = { success: false, error: { message: `서버 오류(${res.status})` } };
          }
          if (!res.ok) {
            // 서버에서 내려주는 에러 메시지 구조가 fileName, fileExtension, message라면 그대로 error로 래핑
            if (data && (data.message || data.fileName || data.fileExtension)) {
              data = { success: false, error: data };
            } else if (!data.error) {
              data = { success: false, error: { message: `서버 오류(${res.status})` } };
            }
            return data;
          }
          return data;
        })
        .then(data => {
          this.result = data;
        })
        .catch(() => {
          this.result = { success: false, error: { message: '업로드 중 알 수 없는 오류가 발생했습니다.' } };
        })
        .finally(() => {
          this.loading = false;
          this.$refs.fileInput.value = '';
        });
    }
  }
}
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.upload-btn {
  font-size: 2rem;
  padding: 2rem 4rem;
  cursor: pointer;
  margin-bottom: 2rem;
}
.home-btn {
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  margin-top: 1rem;
  cursor: pointer;
}
.result-box {
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  background: #f5f5f5;
  min-width: 300px;
  text-align: left;
}
.success-msg {
  color: #2196f3;
  font-weight: bold;
}
.error-msg {
  color: #ff5252;
  font-weight: bold;
}
</style> 