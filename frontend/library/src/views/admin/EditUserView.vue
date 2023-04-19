<template>
    <NavBarView></NavBarView>

    <div class="edit-book-view container">
        <h3 class="text-uppercase mt-4 mb-4">Cập nhật thông tin Người dùng</h3>

        <form method="POST" @submit.prevent="updateUser">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="username-user">Username</label>
                    <input type="text" class="form-control" id="id-user" v-model="this.user.username">
                </div>

                <div class="form-group col-md-6">
                    <label for="password-user">password</label>
                    <input type="password" class="form-control" id="password-user" v-model="this.user.password">
                </div>
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="name">Họ tên người dùng</label>
                <input type="text" class="form-control w-75" id="name" v-model="this.user.name">
            </div>

            <div class="row form-group">
                <div class="col-md-6 mb-4">

                    <label class="form-label" for="position">Vai trò</label>
                    <select class="select" id="position" v-model="this.user.position">
                        <option disabled value="">Vai trò</option>
                        <option>Học sinh</option>
                        <option>Thủ thư</option>
                    </select>

                </div>

                <div class="col-md-6 mb-4">

                    <label class="form-label" for="gender">Giới tính</label>
                    <select class="select" id="gender" v-model="this.user.gender">
                        <option disabled value="">Giới tính</option>
                        <option>Nam</option>
                        <option>Nữ</option>
                    </select>

                </div>
            </div>

            <button type="submit" class="btn btn-primary text-uppercase">
                Lưu lại
            </button>
        </form>
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
            user: {
                username: null,
                password: null,
                name: null,
                gender: null,
                position: null
            }
        }
    },

    components: { NavBarView, FooterView },

    computed: {
        id() {
            return this.$route.params.id;
        }
    },

    created() {
        axios
            .get('http://localhost:3000/admin/users/' + this.id + '/edit')
            .then(res => {
                this.user = res.data;
            })
            .catch(err => {
                console.log(err)
            })
    },

    methods: {
        updateUser() {
            axios.put('http://localhost:3000/users/' + this.id, this.user)
                .then(res => {
                    if (res.data.status === 200) {
                        this.$router.push('/admin/users');
                        window.alert("Cập nhật thông tin người dùng thành công")
                    }
                    else if (res.data.status === 500) {
                        window.alert("Cập nhật thông tin người dùng thất bại")
                    }

                })
                .catch(err => console.log(err))
        },
    }
}
</script>

<style scoped>
.edit-book-view {
    margin: 24px auto;
    min-height: 382px;
}

.form-group label {
    font-weight: bold;
}
</style>
