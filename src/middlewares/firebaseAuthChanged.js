import firebase from 'firebase/app'
import router from '../router';

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) next('Login')
    else if (!requiresAuth && currentUser) next('Index')
    else next()
})
export default router;