<template>
    <div class="book-create-view container">
        <h3 class="text-uppercase">Thêm mới sách</h3>

        <form method="POST" @submit.prevent="addNewBook" action="">
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label for="id-book">ID sách</label>
                    <input type="text" class="form-control" id="id-book" v-model="posts.ID">
                </div>
                <div class="form-group col-md-6">
                    <label for="name-book">Tên sách</label>
                    <input type="text" class="form-control" id="name-book" v-model="posts.name">
                </div>
                <div class="form-group col-md-3">
                    <label for="name-author">Tên tác giả</label>
                    <input type="text" class="form-control" id="name-author" v-model="posts.author">
                </div>
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="descript">Mô tả sách</label>
                <textarea class="form-control" id="descript" rows="8" v-model="posts.description"></textarea>
            </div>

            <div class="form-group mb-4">
                <label for="quantity" class="form-label">Số lượng sách </label><br />
                <input type="number" id="quantity" min="0" max="20" v-model="posts.quantity">
            </div>

            <div class="form-group mb-4">
                <label class="form-label" for="pathURL">Chọn hình ảnh</label><br>
                <input type="file" name="name-file" id="pathURL">
            </div>

            <button type="submit" class="btn btn-primary text-uppercase" @click="getNameFileImg">Thêm sách</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: {
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

    methods: {

        getNameFileImg() {
            const fake_path = document.getElementById('pathURL').value;
            this.posts.image = fake_path.split("\\").pop();
        },

        addNewBook() {
            axios.post('http://localhost:3000/admin/books/store', this.posts)
                .then(res => {
                    if (res.data.status === 200) {
                        window.alert("Thêm sách mới thành công")

                        this.posts.ID = "";
                        this.posts.name = "";
                        this.posts.author = "";
                        this.posts.description = "";
                        this.posts.quantity = "";
                        this.posts.image = "";
                        document.getElementById('pathURL').value = "";
                    }
                    else if (res.data.status === 500) {
                        window.alert("Thêm sách mới thất bại")
                    }
                })
                .catch(err => console.log(err))
        },
    }
}
</script>

<style scoped>
.book-create-view {
    margin: 16px auto;
}

.form-group label {
    font-weight: bold;
}
</style>
