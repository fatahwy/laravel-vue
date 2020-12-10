<template>
    <div class='card'>
        <div class='card-header'>Update Artikel {{ article.title }}</div>
        <div class='card-body'>
            <div class="alert alert-danger" v-if="errors.length">
                <b>Terdapat kesalahan dalam input data:</b>
                <ul>
                    <li v-for="error in errors" :key=error>{{ error }}</li>
                </ul>
            </div>

            <form @submit.prevent="updateArticle">
                <div class='form-group'>
                    <label htmlFor='title'>Judul</label>
                    <input type="text" class="form-control" id="title" v-model="article.title">
                </div>
                <div class='form-group'>
                    <label htmlFor='content'>Deskripsi</label>
                    <textarea type="text" class="form-control" id="content" v-model="article.content" rows="5"></textarea>
                </div>
                <div class='form-group float-right'>
                    <router-link :to="{ name: 'Home' }" class="btn btn-secondary">Back</router-link>
                    &nbsp;
                    <button class='btn btn-primary'>Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            errors: [],
        }
    },
    created() {
        this.$store.dispatch('article/get_data', this.$route.params.id);
    },
    computed: {
        article() {
            return this.$store.state.article.article;
        }
    },
    methods: {
        updateArticle(){
            if(this.article.title != null && this.article.content != null){
                let _this = this;
                let uri = `/api/article/update/${this.$route.params.id}`;
                axios.put(uri, this.article).then((response) => {
                    _this.$swal.fire({
                        title: 'Success',
                        text: "Artikel berhasil diperbarui",
                        icon: "success",
                        timer: 2000,
                    });

                    return this.$router.push({name: 'Detail', params: {id: this.$route.params.id}});
                });
                return true;
            }

            if(!this.article.title){
                this.errors.push('Judul harus diisi!');
            }

            if(!this.article.content){
                this.errors.push('Deskripsi harus diisi!');
            }
        }
    }
}
</script>