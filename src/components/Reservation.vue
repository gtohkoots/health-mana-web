<template>
<div>
<!--     <div class="container" v-if="ssnShow == true">
        <div class="input-group was-validated">
            <input type="text" class="form-control" placeholder="SSN" v-model="ssn" pattern="\d{3}[\-]\d{2}[\-]\d{4}" required/>
            <div class="invalid-feedback">Wrong SSN Format</div>
            <div class="valid-feedback" id="ssnValid">Looks good!</div>
            <div class="search-divider" />
            <div class="col-12">
                <button class="btn btn-primary" @click="verifySsn">Next</button>
            </div>
        </div>
    </div> -->
    <div class="container" v-if="locationShow == true">
        <h2>{{Name}}, Select a vaccination site!</h2>
        <div class="search-divider" />
        <div class="input-group was-validated form-group">
            <b-form-select v-model="location" :options="locationOption" :state="locationValidation"></b-form-select>
            <b-form-invalid-feedback :state="locationValidation" id="locationValid">Please select a valid location.</b-form-invalid-feedback>
        </div>
        <div class="col-12">
            <button class="btn btn-primary" @click="verifyLocation">Next</button>
        </div>
    </div>
    <div class="container" v-if="dateShow == true">
        <h2>Select a Date  and time for your vaccination!</h2>
        <div class="search-divider" />
        <div class="input-group was-validated">
            <b-form-select v-model="date" :options="dateOption" :state="dateValidation" style="width:100%;"></b-form-select>
            <b-form-invalid-feedback :state="dateValidation" id="dateValid">Please select a valid Date.</b-form-invalid-feedback>
            <b-form-group>
                <h6>When do you want to get your vaccine?</h6>
                <b-form-radio v-model="time" name="some-radios" value="0">Morning</b-form-radio>
                <b-form-radio v-model="time" name="some-radios" value="1">Afternoon</b-form-radio>
            </b-form-group>
            <div class="col-12">
                <button class="btn btn-primary" @click="verifyDate">Next</button>
            </div>
        </div>
    </div>
    <div class="container" v-if="finalReportShow == true">
        <div class="card">
            <div class="card-header py-2">
                <h4 class="text-dark fw-bold m-0">Reservation Card</h4>
            </div>
            <div class="card-body">
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Full Name</h6>
                        </div>
                        <div class="col-sm-8 text-secondary">
                            {{Name}}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">SSN</h6>
                        </div>
                        <div class="col-sm-8 text-secondary">
                            {{SSN}}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-3">
                        <h6 class="mb-0">Date</h6>
                        </div>
                        <div class="col-sm-8 text-secondary">
                            {{date}}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Location</h6>
                        </div>
                        <div class="col-sm-8 text-secondary">
                            {{location}}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm-3">
                            <h6 class="mb-0">Time</h6>
                        </div>
                        <div class="col-sm-8 text-secondary">
                            {{timeStr}}
                        </div>
                    </div>                  
            </div>
        </div>
        <div class="search-divider" />
        <div class="text-center">
            <button class="btn btn-primary" @click="modal_invoke">Review Your Information Before Submit!</button>
        </div>
    </div> 
    <b-modal id="reset-modal" title="Submission" @ok="reset">
        <p class="my-4">Your information will be processed by the health administrator, Thank you!</p>
    </b-modal>
</div>    
</template>
<script>
import $ from 'jquery'
import { getUserName } from '../service/user'
import { getUserSSN } from  '../service/user'
import { getLocation } from '../service/reservation'
import { getDate } from '../service/reservation'
import { makeReservation } from '../service/reservation'
export default {
    data() {
        return{
            Name:"",
            date:"",
            time:"",
            timeStr:"Morning",
            dateShow: false,
            location: "",
            locationShow: true,
            finalReportShow: false,
            SSN:"",
            locationOption: [],
            dateOption: [],
            dateData:[]
        }
    },
    computed: {
        locationValidation() {
            return this.location != "";
        },
        dateValidation() {
            return this.date != "";
        }
    },
    async mounted() {
        var { data } = await getUserName();
        this.Name = data;
        var res = (await getLocation()).data;
        this.locationOption = res;
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
        async verifyDate() {
            let display = $("#dateValid").css("display");
            if (display != 'none') {
                this.makeToast('danger','Date Field Invliad');
                return;
            }
            else {
                const { data } = await getUserSSN();
                this.SSN = data;
                if (this.time == 1) {
                    this.timeStr = "Afternoon";
                }
                this.dateShow = false;
                this.finalReportShow = true;
                return;
            }
        },
        async verifyLocation() {
            let display = $("#locationValid").css("display");
            if (display != 'none') {
                this.makeToast('danger','Location Field Invliad');
                return;
            }
            else {
                //before going to the next page, we should generate all the date and spots
                const { data } = await getDate(this.location);
                this.dateData = data;
                this.dateOption = data.map(function(a) {return a.date;});
                this.locationShow = false;
                this.dateShow = true;
                return;
            }
        },
        modal_invoke() {
            this.$bvModal.show("reset-modal");
        },
        async reset(){
            const{ resultCode } = await makeReservation({
                "userSsn":this.SSN,
                "locationName":this.location,
                "date":this.date,
                "time":this.time
            })
            console.log(resultCode);
            if (resultCode == 200) {
                this.Name = "";
                this.date = "";
                this.dateShow = true;
                this.location = "";
                this.locationShow = false;
                this.finalReportShow = false;
                this.SSN = "";
                this.locationOption = [];
                this.dateOption = [];
                this.dateData = [];
                this.time = "";
                this.timeStr = "Morning";
                this.$router.push({ name:'home' });
            }
            return;
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
.search-divider {
    margin:0 16px 16px;
}
.form-select {
    display: block;
    width: 100%;
    padding: .375rem 2.25rem .375rem .75rem;
    -moz-padding-start: calc(0.75rem - 3px);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: right .75rem center;
    background-size: 16px 12px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.col-sm-3 {
    text-align: center;
}
.text-secondary {
    text-align: right;
}
</style>