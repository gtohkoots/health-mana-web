<template>
    <section class="login-dark">
        <div v-if="type == 'login'">
            <div class="login-form was-validated">
                <h2>How's your day?</h2>
                <div class="mb-3">
                    <input type="text" class="form-control" name="ssn" placeholder="SSN" v-model="loginForm.ssn" pattern="\d{3}[\-]\d{2}[\-]\d{4}" required/>
                    <div class="invalid-feedback">Wrong SSN Format</div>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" name="password" placeholder="Password" v-model="loginForm.password" required/>
                    <div class="invalid-feedback">Password Required</div>
                </div>
                <div class="mb-3">
                    <button class ="btn btn-primary d-block w-100" type="submit" @click.prevent="checkForm">Log In</button>
                </div>
                <div>
                    <div class="type-switch" @click="toggle('register')" style="cursor:pointer;">Click here to register</div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="login-form  was-validated">
                <h2>Join us!</h2>
                <div class="mb-3">
                    <input type="text" class="form-control" name="firstname" placeholder="First Name" v-model="registerForm.firstname" pattern="[A-Za-z]{1,32}" required/>
                    <div class="invalid-feedback">First Name Required</div>
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" name="lastname" placeholder="Last Name" v-model="registerForm.lastname" pattern="[A-Za-z]{1,32}" required/>
                    <div class="invalid-feedback">Last Name Required</div>
                </div>
                <div class="mb-3">
                    <input type="text" class="form-control" name="ssn1" placeholder="SSN" v-model="registerForm.ssn1" pattern="\d{3}[\-]\d{2}[\-]\d{4}" title="wrong SSN format" required/>
                    <div class="invalid-feedback">Wrong SSN Format</div>
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" name="password1" placeholder="Password" v-model="registerForm.password1" required/>
                    <div class="invalid-feedback">Password Required</div>
                </div>
                <div class="mb-3">
                    <button class ="btn btn-primary d-block w-100" type="submit" @click.prevent="checkForm">Register</button>
                </div>
                <div>
                    <div class="type-switch" @click="toggle('login')" style="cursor:pointer;" >Login if you already have an account</div>
                </div>
            </div>
        </div>
    </section>    
</template>
<script>
import { login,register } from '../service/user'
import { setCookie } from '../common/js/cookie'
export default {
    data() {
        return {
            loginForm: {
              ssn: '',
              password: '',
            },
            registerForm: {
              ssn1: '',
              password1: '',
              firstname: '',
              lastname: '',
            },
            type:'login'
        }
    },
    methods: {
        toggle(func) {
            this.type = func;
        },
        makeToast(variant = null, content = 'default message') {
            this.$bvToast.toast(content, {
            title: `${variant || 'default'}`,
            autoHideDelay: 3000,
            variant: variant,
            solid: true
            })
        },
        async checkForm() {
            //login 
            if( this.type == 'login') {
                if(this.validateForm(this.loginForm) == true) 
                {
                    const{ resultCode, message, data } = await login({
                        "ssn": this.loginForm.ssn,
                        "password": this.loginForm.password
                    })
                    if ( resultCode == 200) {
                        setCookie('token',data);
                        this.makeToast('success','login success');
                        this.$router.push({ name:'home' });
                    }
                    else {
                        this.makeToast('danger', message);
                    }
                }
                else {
                    return;
                }
            }
            // register
            else {
                if(this.validateForm(this.registerForm) == true) {
                    const{ resultCode, message } = await register({
                        "ssn": this.registerForm.ssn1,
                        "passWord": this.registerForm.password1,
                        "firstName": this.registerForm.firstname,
                        "lastName": this.registerForm.lastname
                    })
                    if ( resultCode == 200) {
                        this.makeToast('success','register success');
                        this.type = 'login';
                    }
                    else {
                        this.makeToast('danger', message);
                    }
                }
                else {
                    return;
                }
            }
        },
        validateForm(form) {
            for( let key in form) {
                let item = form[key];
                console.log(item);
                //invalid input
                if(item == ''){
                    this.makeToast('danger','Invalid Form Detected');
                    return false;
                }
            }
            return true;
        }
    }
}
</script>
<style scoped>
.login-dark {
    height: 1000px;
    background: #475d62 url(../assets/lawn_login.jpg);
    background-size: cover;
}
.login-dark .login-form {
    max-width: 360px;
    width: 90%;
    background-color: #1e2833;
    padding: 40px;
    border-radius: 8px;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    box-shadow: 3px 3px 4px rgba(0,0,0,0.4);
}

.login-form h2 {
    font-size: large;
    text-align: center;
    margin-bottom: 30px;
}
  
.login-dark .btn-primary {
    background: #214a80;
    border-radius: 2px;
    padding: 8px;
    margin-top: 24px;
}

.login-form .form-control {
    background: none;
    border: none;
    border-bottom: 1px solid #434a52;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
}

.login-form .type-switch {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #6f7a85;
}
  
</style>