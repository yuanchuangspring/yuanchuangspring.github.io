
   
const HelloVueApp = {
    data() {
        return {
            test: 'Hello',
            maindata:"",
            ifloaded:false,
            ifloaded1:true
        }
    },
    mounted () {
        $.get(
            "./php/main.php?action=getdata",
            function(res){
                app.$data.maindata=JSON.parse(res)
                app.$data.ifloaded=true
                app.$data.ifloaded1=false
            }
        )
        
    }
}
var app = Vue.createApp(HelloVueApp).mount('#blogmain')


    
