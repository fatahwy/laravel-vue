<template>
     <button class="btn btn-danger" @click = "deletePost()">Delete</button>
</template>

<script>
export default {
  name: "btn-delete",
  props: {
    id: { type: Number, required: true },
    needRedirect: { type: Boolean },
  },
  methods: {
    deletePost() {
        let uri = `/api/article/delete/${this.id}`;
        let _this = this;
        this.$swal.fire({
            title: "Apakah kamu yakin menghapus data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if(result.value) {
                axios.delete(uri).then(response => {
                    if (response.data.success) {
                        this.$swal.fire({
                            title: "Success",
                            text: response.data.message,
                            icon: "success",
                        })

                        if(this.needRedirect){
                            this.$router.push({name: "Home"});
                        } else {
                            this.$emit("child-row-id", this.id);
                        }
                    } else {
                        this.errorDelete(response.data.message);
                    }
                }).catch(response => {
                    this.errorDelete('Silahkan Coba Kembali');
                })
            }
        })
    },
    errorDelete(message) {
          this.$swal.fire({
            title: "Failed",
            text: message,
            icon: "error",
        })
    },
  }
};
</script>