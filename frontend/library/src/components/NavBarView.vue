<template>
    <div class="nav-bar-view">
        <header>
            <nav class="navbar navbar-expand-lg navbar-secondary bg-secondary">
                <!-- Logo -->
                <router-link class="navbar-brand" to="/">
                    <img src="../assets/img/logo.png" alt="logo" class="logo">
                </router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">

                        <!-- Home page -->
                        <li class="nav-item active">
                            <router-link to="/" class="nav-link">Home<span class="sr-only">(current)</span></router-link>
                        </li>

                        <!-- Dropdown menu -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle mb-1" href="#" id="navbarDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ this.id }}
                            </a>


                            <div v-if="this.position == 'Thủ thư'" class="dropdown-menu text-dark mt-2 menu-admin"
                                aria-labelledby="navbarDropdown">

                                <router-link to="/admin/books/create" class="dropdown-item text-dark">
                                    <i class="fas fa-book"></i>
                                    Thêm sách mới
                                </router-link>

                                <router-link to="/admin/stored/books" class="dropdown-item text-dark">
                                    <i class="fas fa-store-alt"></i>
                                    Kho sách
                                </router-link>

                                <div class="dropdown-divider"></div>
                                <router-link class="dropdown-item text-dark" to="/admin/users">
                                    <i class="fas fa-user"></i>
                                    Danh sách người dùng
                                </router-link>

                                <router-link class="dropdown-item text-dark" id="register" to="/admin/auth/register">
                                    <i class="fas fa-user-plus"></i>
                                    Đăng ký người dùng
                                </router-link>

                                <div class="dropdown-divider"></div>
                                <router-link v-on:click="logoutUser()" class="dropdown-item text-dark" to="/">
                                    <i class="fas fa-sign-out-alt"></i>
                                    Đăng xuất
                                </router-link>
                            </div>

                            <div class="dropdown-menu text-dark mt-2 menu-user" aria-labelledby="navbarDropdown">
                                <router-link v-on:click="logoutUser()" class="dropdown-item text-dark" to="/">
                                    <i class="fas fa-sign-out-alt"></i>
                                    Đăng xuất
                                </router-link>
                            </div>

                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>

export default {
    computed: {
        id() {
            const name = JSON.parse(localStorage.getItem("id"))[0];
            return name || null;
        },
        position() {
            const position = JSON.parse(localStorage.getItem("id"))[1];
            return position || null;
        }
    },
    methods: {
        logoutUser() {
            localStorage.clear();
            window.location.reload();
        }
    },
}
</script>

<style scoped>
.logo {
    width: 40px;
}

a {
    color: #fff;
    text-decoration: none;
}

i {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin: 0 8px 0 0;
}
</style>