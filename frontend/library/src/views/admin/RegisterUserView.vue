<template>
    <NavBarView></NavBarView>

    <div class="register-user-view">
        <section class="h-100 h-custom" style="background-color: #66CCFF">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-8 col-xl-6">
                        <div class="card rounded-3">
                            <img src="https://i0.wp.com/dimensipers.com/wp-content/uploads/2017/05/desain-rak-buku-perpustakaan.png?ssl=1"
                                class="w-100" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;"
                                alt="Sample photo">
                            <div class="card-body p-4 p-md-5">
                                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>

                                <form method="POST" class="px-md-2" @submit.prevent="registerUser">

                                    <div class="form-outline mb-4">
                                        <label class="form-label" for="name">Name</label>
                                        <input type="text" id="name" class="form-control" placeholder="VD: Nguyễn Văn A"
                                            v-model="posts.name" />
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 mb-4">

                                            <label class="form-label" for="position">Position</label>
                                            <select class="select" id="position" v-model="posts.position">
                                                <option disabled value="">Vai trò</option>
                                                <option>Học sinh</option>
                                                <option>Thủ thư</option>
                                            </select>

                                        </div>

                                        <div class="col-md-6 mb-4">

                                            <label class="form-label" for="gender">Gender</label>
                                            <select class="select" id="gender" v-model="posts.gender">
                                                <option disabled value="">Giới tính</option>
                                                <option>Nam</option>
                                                <option>Nữ</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div class="row mb-4">
                                        <div class="col-md-6">

                                            <div class="form-outline">
                                                <label class="form-label" for="username">Username</label>
                                                <input type="text" id="username" v-model="posts.username"
                                                    class="form-control" />
                                            </div>

                                        </div>
                                    </div>

                                    <div class="row mb-4">
                                        <div class="col-md-6">

                                            <div class="form-outline">
                                                <label class="form-label" for="password">Password</label>
                                                <input type="password" id="password" v-model="posts.password"
                                                    class="form-control" />
                                            </div>

                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-success btn-lg mb-1">Submit</button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>


    <FooterView></FooterView>
</template>

<script>
import axios from 'axios';
import NavBarView from '../../components/NavBarView.vue';
import FooterView from '../../components/FooterView.vue';

export default {
    data() {
        return {
            posts: {
                name: null,
                position: null,
                gender: null,
                username: null,
                password: null
            }
        }
    },

    components: { NavBarView, FooterView },

    methods: {
        registerUser() {
            axios.post('http://localhost:3000/admin/auth/register', this.posts)
                .then(res => {
                    if (res.data.status === 200) {
                        window.alert("Đăng ký thành công");
                    }
                    else if (res.data.status === 500) {
                        window.alert("Đăng ký thất bại");
                    }

                    this.posts.name = "";
                    this.posts.position = "";
                    this.posts.gender = "";
                    this.posts.username = "";
                    this.posts.password = "";

                })
                .catch(err => console.log(err))
        },
    }
}
</script>

<style scoped>
select {
    margin: auto 8px;
}

@media (min-width: 1025px) {
    .h-custom {
        height: 140vh !important;
    }
}
</style>