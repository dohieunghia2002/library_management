<template>
    <div class="log-in-view">
        <section class="h-100 gradient-form" style="background-color: #eee;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-xl-10">
                        <div class="card rounded-3 text-black">
                            <div class="row g-0">
                                <div class="col-lg-6">
                                    <div class="card-body p-md-5 mx-md-4">

                                        <div class="text-center">
                                            <img src="../assets/img/logo.png" style="width: 164px;" alt="logo">
                                            <h4 class="mt-1 mb-5 pb-1">Thư viện Trường THPT Phan Văn Hòa</h4>
                                        </div>

                                        <form method="POST" @submit.prevent="loginUser()">
                                            <p class="font-weight-bold">Please login to your account</p>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="username">Username</label>
                                                <input type="text" id="username" class="form-control"
                                                    v-model="this.login.username" />
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="password">Password</label>
                                                <input type="password" id="password" class="form-control"
                                                    v-model="this.login.password" />
                                            </div>

                                            <div class="text-center pt-1 mb-5 pb-1">
                                                <button type="submit"
                                                    class="btn btn-primary btn-block fa-lg pt-3 pb-3 gradient-custom-2 mb-3">Log
                                                    in</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <p class="small mb-4 text-justify">
                                            Trường THPT Phan Văn Hòa là một địa điểm được đánh giá cao
                                            trong lĩnh vực Trường THPT. Các bình luận tốt chiếm 100%, đây là một địa chỉ uy
                                            tín mà các bậc phụ huynh có thể yên
                                            tâm để gửi gắm tương lai của con mình. Bên cạnh đó, trường cũng đã lên tiếng
                                            phản hồi và giải quyết các khiếu nại từ các bình luận xấu gây ảnh hưởng đến
                                            thanh danh và uy tín của trường.
                                        </p>

                                        <p class="small mb-0 text-justify">
                                            Thư viện của trường được thành lập từ 2009. Với hàng trăm đầu sách hấp dẫn góp
                                            phần cho kế hoạch giảng dạy, đáp ứng tốt nhu cầu học tập - tìm hiểu - nghiên cứu
                                            của học sinh. Học sinh được tự do tìm tòi những chủ đề lĩnh vực mà bản thân yêu
                                            thích. Có thể sử dụng cơ sở vật chất, trang thiết bị của thư viện để phục vụ cho
                                            nhu cầu học tập. "Học sinh là người tổ quốc mong cho mai sau" <i> (Học Sinh Hành
                                                Khúc, Lê Thương).</i>
                                        </p>
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
import axios from 'axios'

export default {
    data() {
        return {
            login: {
                username: null,
                password: null
            }
        }
    },

    methods: {

        async loginUser() {
            await axios.post('http://localhost:3000/auth/login', this.login)
                .then(res => {
                    if (res.data.status == 200) {
                        window.alert('Đăng nhập thành công\nXin chào ' + res.data.user.name);

                        const values = [res.data.user.name, res.data.user.position];
                        localStorage.setItem('id', JSON.stringify(values));
                        this.$router.push('/');
                    }

                    if (res.data.status == 404) {
                        window.alert("Sai tài khoản hoặc mật khẩu")
                    }
                })
                .catch(err => console.log(err));
        },
    }
}
</script>

<style scoped>
.gradient-custom-2 {
    /* fallback for old browsers */
    background: #fccb90;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-radial-gradient(circle at 12.3% 19.3%, rgb(85, 88, 218) 0%, rgb(95, 209, 249) 100.2%);

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: radial-gradient(circle at 12.3% 19.3%, rgb(85, 88, 218) 0%, rgb(95, 209, 249) 100.2%);
}

@media (min-width: 768px) {
    .gradient-form {
        height: 112vh !important;
    }
}

@media (min-width: 769px) {
    .gradient-custom-2 {
        border-top-right-radius: .3rem;
        border-bottom-right-radius: .3rem;
    }
}
</style>