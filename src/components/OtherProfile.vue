<template>
<div>
    <div class="container" v-if="!isSearch">
        <div class="input-group was-validated">
            <input type="text" class="form-control" placeholder="SSN" v-model="text" pattern="\d{3}[\-]\d{2}[\-]\d{4}" required/>
            <div class="invalid-feedback">Wrong SSN Format</div>
            <div class="valid-feedback">Looks good!</div>
            <div class="search-divider" />
            <div class="col-12">
                <b-form-checkbox id="checkbox-1" v-model="status" name="checkbox-1">
                    I will not disclose senstive information
                </b-form-checkbox>
            </div>
            <div class="search-divider" />
            <div class="col-12" v-if="status">
                <button class="btn btn-primary" @click="searchSsn">Submit For Search</button>
            </div>
        </div>
    </div>
    <div class="container" v-else>
        <div class="card">
            <div class="card-body">
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
        <div class="search-divider" />
        <button class="btn btn-primary" @click="backtoSearch">Back To Search</button>
    </div>  
</div>   
</template>
<script>
import { otherCheck } from '../service/user'
export default {
    data() {
        return {
          statusForm: {
            FirstName: "",
            LastName:"",
            Ssn: "",
            Vaccinated: ""
          },
          isSearch: false,
          text: "",
          status: false
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
        },
        async searchSsn() {
            const { resultCode, message, data } = await otherCheck({
                "ssn":this.text
            });
            //找到了用户
            if (resultCode == 200) {
                this.makeToast('success', 'Health Card Found!');
                //改变页面
                this.isSearch = true;
                //更新field
                this.text = "";
                this.statusForm.FirstName = data.firstName;
                this.statusForm.LastName = data.lastName;
                this.statusForm.Ssn = data.ssn;
                this.statusForm.Vaccinated = data.vaccinatedStatus;
            }
            //SSN 格式错误
            else if ( resultCode == 404 ) {
                this.makeToast('danger', message);
            }
            //未注册SSN
            else {
                this.makeToast('danger', message);
                this.text = "";
                this.status = false;
            }
        },
        backtoSearch() {
            //reset fields
            this.isSearch = false;
            this.status = false;
            this.statusForm.FirstName = "";
            this.statusForm.LastName = "";
            this.statusForm.Ssn = "";
            this.statusForm.Vaccinated = "";
            this.text = "";
        }
    },

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
.search-divider {
    margin:0 16px 16px;
}
.btn-primary {
    background-color: #4e73df;
}
</style>