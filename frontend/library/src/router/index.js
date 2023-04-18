import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import DetailBookView from '../views/DetailBookView.vue'
import LogInView from '../views/LogInView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import BookCreateView from '../views/admin/BookCreateView.vue'
import StoredBooksView from '../views/admin/StoredBooksView.vue'
import EditBookView from '../views/admin/EditBookView.vue'
import StoredUsersView from '../views/admin/StoredUsersView.vue';
import RegisterUserView from '../views/admin/RegisterUserView.vue'
import EditUserView from "../views/admin/EditUserView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/admin/books/create',
            name: 'createbook',
            component: BookCreateView
        },
        {
            path: '/admin/users',
            name: 'users',
            component: StoredUsersView
        },
        {
            path: '/admin/users/:id/edit',
            name: 'edituser',
            component: EditUserView
        },
        {
            path: '/admin/auth/register',
            name: 'register',
            component: RegisterUserView
        },
        {
            path: '/admin/books/:id/edit',
            name: 'editbook',
            component: EditBookView
        },
        {
            path: '/admin/stored/books',
            name: 'storedbook',
            component: StoredBooksView
        },
        {
            path: '/auth/login',
            name: 'login',
            component: LogInView
        },
        {
            path: '/books/:slug',
            name: 'detailbook',
            component: DetailBookView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: NotFoundView
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const localID = await localStorage.getItem('id');
    if(!localID && to.name !== 'login') {
        next({ name: 'login' });
    }
    else if(localID && to.name === 'login') {
        next({ name: 'home' });
    }
    else next();
})

export default router
