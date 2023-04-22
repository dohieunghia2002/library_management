<template>
    <div class="register-view">
        <section class="h-100 bg-dark">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col">
                        <div class="card card-registration my-4">
                            <div class="row g-0">
                                <div class="col-xl-6 d-none d-xl-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                        alt="Sample photo" class="img-fluid"
                                        style="border-top-left-radius: .25rem; border-bottom-left-radius: .25rem;" />
                                </div>
                                <div class="col-xl-6">
                                    <div class="card-body p-md-5 text-black">
                                        <h3 class="mb-5 text-uppercase text-center">Student registration form</h3>

                                        <form method="POST" id="form-sign-up" class="px-md-2" @submit.prevent="register">
                                            <div class="row">
                                                <div class="col-md-12 mb-4">
                                                    <div class="form-outline">
                                                        <input type="text" id="name" placeholder="Nguyễn Văn A"
                                                            class="form-control form-control-lg" v-model="posts.name" />
                                                        <label class="form-label" for="name">Full name</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-8 mb-4">
                                                    <div class="form-outline">
                                                        <input type="text" id="username"
                                                            class="form-control form-control-lg" v-model="posts.username" />
                                                        <label class="form-label" for="username">Username</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-8 mb-4">
                                                    <div class="form-outline">
                                                        <input type="password" id="password"
                                                            class="form-control form-control-lg" v-model="posts.password" />
                                                        <label class="form-label" for="password">Password</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-8 mb-4">
                                                    <label class="form-label" for="gender">Gender</label>
                                                    <select class="select" id="gender" v-model="posts.gender">
                                                        <option disabled value="">Giới tính</option>
                                                        <option>Nam</option>
                                                        <option>Nữ</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-end pt-3">
                                                <button type="button" class="bt btn-primary btn-lg mr-2"
                                                    @click="reset()">Reset
                                                    all</button>
                                                <button type="submit" class="btn btn-success btn-lg ms-2">Submit
                                                    form</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: {
                name: null,
                gender: null,
                username: null,
                password: null
            }
        }
    },

    methods: {
        reset() {
            document.getElementById("form-sign-up").reset();
        },

        register() {
            axios.post('http://localhost:3000/admin/auth/register', this.posts)
                .then(res => {
                    if (res.data.status === 200) {
                        window.alert("Đăng ký thành công");
                        this.$router.push('/');
                    }
                    else if (res.data.status === 500) {
                        window.alert("Đăng ký thất bại");
                    }

                    this.posts.name = "";
                    this.posts.gender = "";
                    this.posts.username = "";
                    this.posts.password = "";

                })
                .catch(err => console.log(err))
        }
    }
}
</script>
<style scoped>
.card-registration .select-input.form-control[readonly]:not([disabled]) {
    font-size: 1rem;
    line-height: 2.15;
    padding-left: .75em;
    padding-right: .75em;
}

.card-registration .select-arrow {
    top: 13px;
}
</style>