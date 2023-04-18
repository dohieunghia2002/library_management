<template>
    <NavBarView></NavBarView>

    <div class="home-view container">
        <div class="sections row mb-3 justify-content-center">
            <!-- Search books -->
            <form class="form-inline my-2 my-lg-0">
                <label class=" form-label my-2 my-sm-0 mr-3">Tìm kiếm sách: </label>
                <input class="form-control mr-sm-2 col-xs-4" type="search" v-model="search" placeholder="Tên sách"
                    aria-label="Search">
            </form>
        </div>

        <div class="sections row">
            <template v-for="(book, index) in filteredList" :key="index">

                <div v-if="index < 20" class="card" style="width: 16rem;">
                    <router-link :to="'/books/' + book.slug">
                        <img class="card-img-top" :src="book.image" alt="Card image cap">
                    </router-link>
                    <div class="card-body">
                        <h5 class="card-title">{{ book.name }}</h5>
                        <p class="card-text">{{ book.author }}</p>
                        <span>
                            <i class="id-book">Mã sách: {{ book.ID }}</i>
                        </span>
                    </div>
                </div>

            </template>


        </div>
    </div>
    <FooterView></FooterView>
</template>

<script>

import axios from 'axios'
import NavBarView from '../components/NavBarView.vue';
import FooterView from '../components/FooterView.vue';
export default {
    data() {
        return {
            search: '',
            books: []
        };
    },

    created() {
        axios
            .get("http://localhost:3000/")
            .then(res => {
                this.books = res.data.books;
            })
            .catch(err => {
                console.log(err);
            });
    },

    computed: {
        filteredList() {
            return this.books.filter(book => {
                return book.name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },

    components: { NavBarView, FooterView }
}


</script>

<style scoped>
.home-view {
    margin: 16px auto;
}

.card {
    display: inline-block;
    margin: 0 12px 8px;
}

.card .card-body .card-title {
    min-height: 5rem;
    color: rgb(245, 65, 10);
}

.id-book {
    color: rgb(72, 186, 243);
}
</style>
