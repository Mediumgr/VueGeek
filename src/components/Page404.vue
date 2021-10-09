<template>
    <div class="error">
        Ошибка 404. Такая страница не найдена.
    </div>
</template>

<script>
    export default {
        name: 'NotFound',
    }
</script>

<style lang="scss" scoped>
.error {
    display: flex;
    align-items: center;
    justify-content: center;
    background: crimson;
    width: 50%;
    height: 50px;
    margin: 0 auto;
    text-align: center;
    color: white;
}
</style>