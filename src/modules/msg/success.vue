<template>
  <div class="success-page">
    <div class="card">
      <h1>✅ Success!</h1>
      <p>Your operation was completed successfully.</p>
       <p>You will give you a feedback soon </p>
    </div>
  </div>
</template>

 

<style scoped>
.success-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f7e9;
}

.card {
  text-align: center;
  padding: 40px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #4caf50;
  margin-bottom: 16px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #43a047;
}
</style>
