<template>
<nav class="navbar navbar-light navbar-expand shadow mb-4">
    <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
        <div class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group"><input class="form-control border-0 medium" type="text" placeholder="Search for ..." /><button class="btn btn-primary py-0" type="button"><i class="fa fa-search" aria-hidden="true"></i></button></div>
        </div>
        <ul class="navbar-nav flex-nowrap ms-auto">
            <li class="nav-item dropdown no-arrow">
                <div class="dropdown show">
                    <a class="dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="d-none d-lg-inline me-2 medium">{{UserName}}</span><i class="fa fa-user-circle-o" aria-hidden="true" style="margin-left: 10px;"></i>
                    </a>
                    <div class="dropdown-menu shadow" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="#">Profile</a>
                        <a class="dropdown-item" href="#">Settings</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</nav>  
</template>
<script>
import { getUserName } from '../service/user'
export default {
    data() {
        return {
          UserName: 'Guest'
        }
    },
    async mounted() {
        const { resultCode, message, data } = await getUserName();
        if (resultCode == 200) {
            this.UserName = data;
        }
        else {
            this.makeToast('danger',message);
        }
    },
    methods: {
        makeToast(variant = null, content = 'default message') {
            this.$bvToast.toast(content, {
            title: `${variant || 'default'}`,
            autoHideDelay: 3000,
            variant: variant,
            solid: true
            })
        }
    }
    
}
</script>
<style scoped>
.btn-primary {
    background-color: #4e73df;
}
</style>