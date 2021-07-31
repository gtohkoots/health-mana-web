<template>
    <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <div class="container-fluid d-flex flex-column p-0"><a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                <div class="sidebar-brand-icon rotate-n-15"><i class="fa fa-hospital-o fa-2x" aria-hidden="true"></i></div>
                <div class="sidebar-brand-text mx-3"><span>Health Portal</span></div>
            </a>
            <hr class="sidebar-divider" />
            <ul class="navbar-nav text-light" style="width: 100%;">
                <li class="nav-item"><router-link to="/home" class="text-light"><i class="fa fa-tachometer" aria-hidden="true"></i><span>Dashboard</span></router-link></li>
                <li class="nav-item"><router-link to="/home/selfCheck" class="text-light"><i class="fa fa-address-card" aria-hidden="true"></i><span>Your Health Code</span></router-link></li>
                <li class="nav-item"><router-link to="/home/checkOther" class="text-light"><i class="fa fa-handshake-o" aria-hidden="true"></i><span>Health Code Search</span></router-link></li>
                <li class="nav-item"><router-link to="/home/reservation" class="text-light"><i class="fa fa-registered" aria-hidden="true"></i><span>Vaccination</span></router-link></li>
                <li class="nav-item"><a class="text-light" style="cursor:pointer;" @click="triggerModal"><i class="fa fa-sign-out" aria-hidden="true"></i><span>Log out</span></a></li>
            </ul>
        </div>
        <b-modal id="logout-modal" title="Log out" @ok="logout">
            <p class="my-4">Are you sure you want to log out?</p>
        </b-modal>
    </nav>
</template>
<script>
import { deleteCookie } from '../common/js/cookie'
import { getCookie } from '../common/js/cookie'
import { logout } from '../service/user'
export default {
    methods: {
        makeToast(variant = null, content = 'default message') {
            this.$bvToast.toast(content, {
            title: `${variant || 'default'}`,
            autoHideDelay: 4000,
            variant: variant,
            solid: true
            })
        },
        triggerModal() {
            this.$bvModal.show("logout-modal");
        },
        async logout() {
            let token = getCookie('token');
            const{ resultCode, message } = await logout({
                "token":token
            });
            if( resultCode == 200) {
                deleteCookie('token');
                setTimeout(this.makeToast('success',message),3000);
                this.$router.push({ name:'login' });
            }
            else {
                this.makeToast('danger', message);
                return;
            }

        }
    }
}
</script>
<style scoped>
.sidebar {
    width: 300px!important;
    background-color: #4e73df;
    background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
    background-size: cover;
}
.nav-item {
    margin: 10px;
}
.sidebar-divider {
    margin-bottom: 5px;
}
i {
    margin-right: 10px;
}
</style>