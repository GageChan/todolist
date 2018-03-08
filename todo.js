let root = new Vue({
    el : '#root',
    data : {
        todos : [{"isSelected":false,"title":"吃饭"},
            {"isSelected":false,"title":"睡觉"}],
        title : '',
        cur_todo : {},
        hash : 'all'
    },
    created(){
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
        window.location.hash = '#'+this.hash;
        //监控hash值的变化
        window.addEventListener('hashchange',()=>{
            this.hash = window.location.hash.slice(1);
            console.log(this.hash)
        },false);
    },
    methods : {
        add(){
            this.todos.push({"isSelected":false,"title":this.title});
            this.title='';
        },
        remove(t){
            this.todos = this.todos.filter(item => item !== t);
        },
        remenber(todo){
            this.cur_todo = todo;
        },
        cancel(){
            this.cur_todo = '';
        }
    },
    computed : {
        count : {
            get(){
                return this.todos.filter(item => !item.isSelected).length;
            },
        },filterTodos : {
            get(){
                if(this.hash === 'all')
                    return this.todos;
                if(this.hash === 'finished')
                    return this.todos.filter(item => item.isSelected);
                if(this.hash === 'unfinish')
                    return this.todos.filter(item => !item.isSelected);
                return this.todos;
            }
        }
    },
    watch : {
      todos : {
          handler(){
              localStorage.setItem('data',JSON.stringify(this.todos));
          } ,deep:true
      }
    },
    directives : {
        focus(el,args){
            if(args.value){
               el.focus();
            }
        }
    }
});