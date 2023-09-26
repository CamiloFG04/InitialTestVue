<template>
  <img v-if="img" :src="img" alt="bg">
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="Make me a question" v-model="question">
    <p>Remember end with a question mark (?)</p>

    <div v-if="isValidQuestion">
        <h2>{{question}}</h2>
        <h1>{{answer}}</h1>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            question: null,
            answer: null,
            img: null,
            isValidQuestion: false
        }
    },
    methods:{
        async getAnswer(){
            try {
                this.answer = 'Thinking...'
                const {answer, image} = await fetch('https://yesno.wtf/api').then(r =>r.json())
                this.answer = answer;
                this.img = image;
            } catch (error) {
                console.log('error:',error);
                this.answer = 'Error Server 500'
                this.img = null
            }
        }
    },
    watch:{
        question(value,oldValue){
            this.isValidQuestion = false
            console.log({value});
            if(!value.includes('?')) return;
            this.isValidQuestion = true
            this.getAnswer()
            // TODO: Make http request
        }
    }
}
</script>

<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
        margin-bottom: 5px;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>