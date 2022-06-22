<template>
  <div class="container">
    <div class="error">
      Ошибка 404.
      <div class="error_info">
        Такая страница не существует.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: rgb(203, 244, 245);
}
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #d36378;
  font-size: 26px;
  width: 50%;
  min-height: 100px;
  color: white;
  border-width: 2px 4px;
  border-radius: 20px;
  outline: 1px solid #140202;
  box-shadow: 8px 8px 8px 3px rgb(0 0 0 / 60%);
  margin: 230px auto;
}
</style>
