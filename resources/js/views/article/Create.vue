<template>
    <div class='card'>
        <div class='card-header'>Tambah Artikel</div>
        <div class='card-body'>
            <div class="alert alert-danger" v-if="errors.length">
                <b>Terdapat kesalahan dalam input data:</b>
                <ul>
                    <li v-for="error in errors" :key=error>{{ error }}</li>
                </ul>
            </div>

            <form @submit.prevent="createArticle">
                <div class='form-group'>
                    <label htmlFor='title'>Judul</label>
                    <input type="text" class="form-control" id="title" v-model="article.title" required>
                </div>
                <div class='form-group'>
                    <label htmlFor='content'>Deskripsi</label>
                    <textarea type="text" class="form-control" id="content" v-model="article.content" rows="5" required></textarea>
                </div>
                <div class='form-group'>
                    <label htmlFor='content'>Tanggal</label>
                    <DatePicker input-class="form-control" v-model="article.date"></DatePicker>
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
import DatePicker from 'vuejs-datepicker';

export default {
    data() {
        return {
            article: {
                title: null,
                content: null,
                date : new Date(),
            },
            errors: [],
        }
    },
    components: {
        DatePicker
    },
    computed: {
    },
    methods: {
        createArticle(e) {
            let _this = this;

            if(this.article.title != null && this.article.content != null) {
                let uri = 'api/article/store';
                let d = this.article.date;
                this.article.date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

                axios.post(uri, this.article).then((response) => {
                    if(response.data.success){
                        this.$swal.fire({
                            title: 'Success',
                            text: response.data.message,
                            icon: "success",
                        });
    
                        this.$router.push({name: 'Home'});
                    } else {
                        this.$swal.fire({
                            title: 'Failed',
                            text: response.data.message,
                            icon: "error",
                        });
                    }
                }).catch(function(e) {
                    _this.errors.push('Silahkan Coba Kembali!');
                });

                return true;
            }

            if (!this.article.title) {
                this.errors.push('Judul Wajib Diisi!');
            }

            if (!this.article.content) {
                this.errors.push('Deskripsi Wajib Diisi!');
            }

            // e.preventDefault();
        }
    }
}
</script>