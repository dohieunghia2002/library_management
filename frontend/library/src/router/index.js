import { createRouter, createWebHistory } from 'vue-router'

import HeaderView from '../components/NavBarView.vue';
import FooterView from '../components/FooterView.vue';

import HomeView from '../views/HomeView.vue'
import DetailBookView from '../views/DetailBookView.vue'
import LogInView from '../views/LogInView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import RegisterView from '../views/RegisterView.vue'

import BookCreateView from '../views/admin/BookCreateView.vue'
import StoredBooksView from '../views/admin/StoredBooksView.vue'
import EditBookView from '../views/admin/EditBookView.vue'
import StoredUsersView from '../views/admin/StoredUsersView.vue';
import EditUserView from "../views/admin/EditUserView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                default: HomeView,
                HeaderView,
                FooterView
            }
        },
        {
            path: '/admin/books/create',
            name: 'createbook',
            components: {
                default: BookCreateView,
                HeaderView,
                FooterView
            }
        },
        {
            path: '/admin/users',
            name: 'users',
            components: {
                default: StoredUsersView,
                HeaderView,
                FooterView
            }
        },
        {
            path: '/admin/users/:id/edit',
            name: 'edituser',
            components: {
                default: EditUserView,
                HeaderView,
                FooterView
            }
        },
        {
            path: '/admin/books/:id/edit',
            name: 'editbook',
            components: {
                default: EditBookView,
                HeaderView,
                FooterView
            }
        },
        {
            path: '/admin/stored/books',
            name: 'storedbook',
            components: {
                default: StoredBooksView,
                HeaderView,
                FooterView
            }
        },
        {
            path: '/auth/login',
            name: 'login',
            component: LogInView
        },
        {
            path: '/auth/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/books/:slug',
            name: 'detailbook',
            components: {
                default: DetailBookView,
                HeaderView,
                FooterView
            }
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
    if (!localID && to.name !== 'login' && to.name !== 'register') {
        next({ name: 'login' });
    }
    else if (localID && to.name === 'login') {
        next({ name: 'home' });
    }
    else next();
})

export default router
