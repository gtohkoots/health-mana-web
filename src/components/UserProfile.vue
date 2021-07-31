<template>
<div class="container">
        <div class="card">
            <div class="card-body">
                <div class="row flex-column align-items-center">
                    <img src="../assets/success_kid.png" class="rounded-circle" width="180" height="120">
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <h6 class="mb-0">First Name</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                        {{statusForm.FirstName}}
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                    <h6 class="mb-0">Last Name</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                        {{statusForm.LastName}}
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <h6 class="mb-0">SSN</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                        {{statusForm.Ssn}}
                    </div>
                </div>
                <hr>
<!--                 <div class="row">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Citizenship</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                        {{statusForm.Citizenship}}
                    </div>
                </div>
                <hr> -->
                <div class="row">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Vaccination Status</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                        {{statusForm.Vaccinated}}
                    </div>
                </div>
            </div>
        </div> 
</div> 
</template>
<script>
import { selfCheck } from '../service/user'
import { getCookie } from '../common/js/cookie'
export default {
    data() {
      return {
          statusForm: {
            FirstName: "",
            LastName:"",
            Ssn: "",
            Citizenship:"",
            Vaccinated: ""
          }
      }
    },
    methods: {
        makeToast(variant = null, content = 'default message') {
            this.$bvToast.toast(content, {
            title: `${variant || 'default'}`,
            autoHideDelay: 4000,
            variant: variant,
            solid: true
            })
        }
    },
    async mounted() {
        let token = getCookie('token');
        const { resultCode, message, data } = await selfCheck({
            "token": token
        });
        if(resultCode == 200) {
            this.statusForm.FirstName = data.firstName;
            this.statusForm.LastName = data.lastName;
            this.statusForm.Ssn = data.ssn;
            this.statusForm.Citizenship = data.citizenship;
            this.statusForm.Vaccinated = data.vaccinatedStatus;
            this.makeToast('success',this.statusForm.FirstName + " " + this.statusForm.LastName + ", Your Health Card is ready!");
        }
        else {
            this.makeToast('danger',message);
        }
    }
}
</script>
<style scoped>
.container {
    margin-top: 50px;
    padding-left: 30px;
    padding-right: 30px;
}
.text-secondary {
    text-align: right;
}
.col-sm-3 {
    text-align: center;
}
</style>