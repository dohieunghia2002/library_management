<template>
    <NavBarView></NavBarView>
    <div class="stored-users-view container">
        <table class="table">
            <thead class="thead-dark">
                <tr class="text-uppercase">
                    <th scope="col-1">STT</th>
                    <th scope="col">Username</th>
                    <th scope="col-3">Password</th>
                    <th scope="col-3">Họ tên</th>
                    <th scope="col-2">Vai trò</th>
                    <th scope="col" colspan="2"></th>
                </tr>
            </thead>

            <tbody v-for="(user, index) in users" :key="index">
                <tr class="text-justify">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ user.password }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.position }}</td>
                    <td>
                        <router-link :to="'/admin/users/' + user._id + '/edit'" class="btn btn-link">Sửa</router-link>
                        <a href="" class="btn btn-link" @click="getIdUser(user)" :data-id="user._id" data-toggle="modal"
                            data-target="#delete-user-modal">Xóa</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="delete-user-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Xóa người dùng?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Bạn có chắc muốn xóa Người dùng này không?
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="deleteUser()" class="btn btn-danger">Xóa
                            bỏ</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
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
            users: [],
            id: null
        }
    },

    components: { NavBarView, FooterView },

    created() {
        axios.get('http://localhost:3000/admin/users')
            .then(res => {
                this.users = res.data.users;
            })
            .catch(err => {
                console.log(err)
            });
    },

    methods: {
        getIdUser(user) {
            this.id = user._id
            // this.$el.getAttribute('data-id');
        },

        deleteUser() {
            axios.delete('http://localhost:3000/users/' + this.id)
                .then(() => {
                    console.log(this.id);
                    this.$router.push('/admin/users');
                    window.alert("Xóa thành công")
                    window.location.reload()
                })
                .catch(err => console.log(err));
        },
    }
}
</script>

<style scoped>
.stored-users-view {
    margin: 16px auto;
}

.btn.btn-link {
    text-decoration: none;
}
</style>
