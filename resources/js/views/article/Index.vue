<template>
    <div class="card-body">
        <router-link :to="{ name: 'Create' }" class="btn btn-success float-right">Tambah Artikel</router-link>
        <br><br>
        <div class="table-responsive">
            <table class="table table-bordered table-hoverd table-condensed">
                <thead>
                    <tr>
                        <th width="50" class="text-center">No</th>
                        <th>Judul</th>
                        <th width="200" class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="articles.length == 0"><td colspan="3" class="text-center">Tidak ada artikel</td></tr>
                    <tr v-else v-for="(article, index) in articles" :key=index>
                        <td width="50" class="text-center">{{ index + 1 }}</td>
                        <td>{{ article.title }}</td>
                        <td width="200" class="text-center">
                            <div class="btn-group">
                                <router-link :to="{name: 'Detail', params: { id: article.id }}" class="btn btn-primary">View</router-link>&nbsp;
                                <router-link :to="{name: 'Update', params: { id: article.id }}" class="btn btn-primary">Update</router-link>&nbsp;
                                <BtnDelete :id="article.id" @child-row-id="removeRow" ></BtnDelete>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BtnDelete from './componenets/btn-delete';

export default {
    created() {
        this.$store.dispatch('article/get_datas')
    },
    components: {
        BtnDelete,
    },
    computed: {
        articles() {
            return this.$store.state.article.articles;
        }
    },
    methods: {
        removeRow(id) {
            this.articles.splice(this.articles.indexOf(id), 1);
        },
    }
}
</script>