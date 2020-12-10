<template>
    <div class='card'>
        <div class='card-header'>Detail Article 
            <span class="float-right">
                <router-link :to="{name: 'Update', params: { id: id }}" class="btn btn-primary">Update</router-link>
                <BtnDelete :id="id" :needRedirect="true"></BtnDelete></span>
            </div>
        <div class='card-body'>
            <div class='form-group'>
                <b>Judul</b>
                <div>{{ article.title }}</div>
            </div>
            <div class='form-group'>
                <b>Deskripsi</b>
                <div>{{ article.content }}</div>
            </div>
            <div class='form-group'>
                <b>Tanggal</b>
                <div>{{ article.date }}</div>
            </div>
            <div class='form-group float-right'>
                <router-link :to="{ name: 'Home' }" class="btn btn-secondary">Back</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BtnDelete from "./componenets/btn-delete";

export default {
    components: {
        BtnDelete,
    },
    created() {
        this.$store.dispatch('article/get_data', this.$route.params.id);
    },
    computed: {
        article() {
            return this.$store.state.article.article;
        },
        id() {
            return this.$store.state.article.id
        }
    },
}
</script>