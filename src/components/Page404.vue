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
    background: #d36378;
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