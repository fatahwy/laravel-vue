<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-center">LOGIN</h4>
              <hr />
              <form @submit.prevent="onSubmit()">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" v-model="data.username" />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="text" class="form-control" v-model="data.password" />
                </div>
                <div class="row">
                  <div class="col">
                    <div class="float-right">
                      <button type="submit" class="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
        data: {
            username: "",
            password: "",
        }
    };
  },
  methods: {
    onSubmit() {
      if (this.data.username.trim() && this.data.password.trim()) {
        let formData = new FormData();
        formData.append("username", this.data.username.trim());
        formData.append("password", this.data.password);

        const options = {
          url: "api/login",
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: formData
        };

        axios(options)
          .then(response => {
            const token = response.data.token;
            this.$store.token = token;

            if (token) {
              this.$router.push({
                name: "Home",
                params: {
                  token: token
                }
              });
            }
          })
          .catch(e => {
            alert(e + "\n" + "Username / password yang dimasukkan salah.");
          });
      }
    }
  }
};
</script>