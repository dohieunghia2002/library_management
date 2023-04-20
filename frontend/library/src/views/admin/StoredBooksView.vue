<template>
    <NavBarView></NavBarView>

    <div class="stored-books-view container">
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr class="text-uppercase">
                    <th scope="col-1">STT</th>
                    <th scope="col">ID sách</th>
                    <th scope="col-3">Tên</th>
                    <th scope="col-3">Tác giả</th>
                    <th scope="col-2">Số lượng</th>
                    <th scope="col" colspan="2"></th>
                </tr>
            </thead>

            <tbody v-for="(book, index) in books" :key="index">
                <tr class="text-justify">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ book.ID }}</td>
                    <td>{{ book.name }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.quantity }}</td>
                    <td>
                        <router-link :to="'/admin/books/' + book._id + '/edit'" class="btn btn-link">Sửa</router-link>
                        <a href="" class="btn btn-link" @click="getIdBook(book)" :data-id="book._id" data-toggle="modal"
                            data-target="#delete-book-modal">Xóa</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="delete-book-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Xóa sách?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Bạn có chắc muốn xóa sách này?
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="deleteBook()" class="btn btn-danger">Xóa
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
            books: [],
            id: null
        }
    },

    components: { NavBarView, FooterView },

    created() {
        axios.get('http://localhost:3000/admin/stored/books')
            .then(res => {
                this.books = res.data.books;
            })
            .catch(err => {
                console.log(err)
            });
    },

    methods: {
        getIdBook(book) {
            this.id = book._id
            // this.$el.getAttribute('data-id');
        },

        deleteBook() {
            axios.delete('http://localhost:3000/books/' + this.id)
                .then(() => {
                    console.log(this.id);
                    this.$router.push('/admin/stored/books');
                    window.alert("Xóa thành công")
                    window.location.reload()
                })
                .catch(err => console.log(err));
        },
    }
}
</script>

<style scoped>
.stored-books-view {
    margin: 16px auto;
}

.btn.btn-link {
    text-decoration: none;
}
</style>
