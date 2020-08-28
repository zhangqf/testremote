<template>
    <div class="ui-login">
       <div class="ui-bg"></div>
        <div class="ui-content">
            <h1><img :src="logoimg" alt=""></h1>
            <h1 class="ui-loginTitle">爱医信后台管理系统</h1>
              <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button long type="primary"  @click="handleSubmit('formInline')">登 录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
 
    export default {
        data () {
            return {
                logoimg:require('../../assets/logo.png'),
                  formInline: {
                    user: 'admin',
                    password: '123456'
                },
                ruleInline: {
                    user: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                        { min:3,max:8,message:"3-8个字符",trigger:'blur'}
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不小于6位', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        // 调后台接口 成功后 保存token 并 跳转之主页
                         window.sessionStorage.setItem("token","123456");
                        // this.$store.commit(SET_TOKEN,"123456")
                        this.$router.push("index");
                       
                    } else {
                        console.log(valid)
                        this.$Notice.warning({
                            title:"登陆失败",
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    
    .ui-bg 
        width 100%
        position absolute
        top 0
        left 0
        bottom 0
        text-algin center
        background-image url('../../assets/bg.png')
        background-repeat no-repeat
        background-size cover
        overflow hidden
        z-index -1

    .ui-loginTitle
        color #ffffff
        font-size 24px  
   .ivu-input.ivu-input-large
        background-color red


    .ivu-form
        width 460px
        margin 20px auto
    .ui-content
        position absolute
        left 0
        right 0 
        top 50%
        transform translateY(-50%)
</style>