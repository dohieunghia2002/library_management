<template>
    <NavBarView></NavBarView>

    <div class="eidt-book-view container">
        <h3 class="text-uppercase mt-4 mb-4">Cập nhật thông tin sách</h3>

        <form method="POST" @submit.prevent="updateBook">
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for="id-book">ID sách</label>
                    <input type="text" class="form-control" id="id-book" v-model="this.book.ID">
                </div>
                <div class="form-group col-md-6">
                    <label for="name-book">Tên sách</label>
                    <input type="text" class="form-control" id="name-book" v-model="this.book.name">
                </div>
                <div class="form-group col-md-3">
                    <label for="name-author">Tên tác giả</label>
                    <input type="text" class="form-control" id="name-author" v-model="this.book.author">
                </div>
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="descript">Mô tả sách</label>
                <textarea class="form-control" id="descript" rows="8" v-model="this.book.description"></textarea>
            </div>

            <div class="form-group mb-4">
                <label for="quantity" class="form-label">Số lượng sách </label><br />
                <input type="number" id="quantity" min="0" max="20" v-model="this.book.quantity">
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="pathURL">URL Hình ảnh</label>
                <input type="text" class="form-control w-75" id="pathURL" v-model="this.book.image">
            </div>

            <button type="submit" class="btn btn-primary text-uppercase">
                Lưu lại
            </button>
        </form>
    </div>

    <FooterView></FooterView>
</template>

<script>

import axios from 'axios'
import NavBarView from '../../components/NavBarView.vue';
import FooterView from '../../components/FooterView.vue';

export default {
    data() {
        return {
            book: {
                ID: null,
                name: null,
                description: null,
                image: null,
                author: null,
                quantity: null,
                slug: null
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
            .get('http://localhost:3000/admin/books/' + this.id + '/edit')
            .then(res => {
                this.book = res.data;
            })
            .catch(err => {
                console.log(err)
            })
    },

    methods: {
        updateBook() {
            axios.put('http://localhost:3000/books/' + this.id, this.book)
                .then(res => {
                    if (res.data.status === 201) {
                        this.$router.push('/admin/stored/books');
                        window.alert("Cập nhật thông tin sách thành công")
                    }
                    else if (res.data.status === 501) {
                        window.alert("Cập nhật thông tin sách thất bại")
                    }

                })
                .catch(err => console.log(err))
        },
    }
}
</script>

<style scoped>
.eidt-book-view {
    margin: 16px auto;
}

.form-group label {
    font-weight: bold;
}
</style>
