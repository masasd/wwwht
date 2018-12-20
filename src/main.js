'use strict';


const STORAGE_KEY = 'ex-storage';
//new Vue & array
new Vue({
  el: '.exerciseapp',
  data () {
    return {
      newEx: '',
      exs:[],
      editedEx: null,
      visibility: 'all'

    }
  },

  //Creates local storage for gym exercises
  created () {
      this.exs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },


  //Three tabs that show All, What's left and Done

  computed: {
    filteredExs() {
        //filters what to show
        if(this.visibility === 'all') {
          return this.exs;
        }
        else if ( this.visibility === 'undone') {
            return this.exs.filter(function(ex) {
                return !ex.done;
            });
        }
        else {
          //done
          return this.exs.filter(function(ex) {
              return ex.done;
          })

        }
    }

  },



  methods: {
    //Adds user input into the list & local storage
    addEx() {
      this.exs.push({title: this.newEx,
        done: false,
        id: this.exs.length });
      this.newEx = '';
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.exs));

    },
    //removes one exercise from list & local storage
    removeEx(ex) {
      this.exs.splice(this.exs.indexOf(ex), 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.exs));
    },
    //removes all exercises from list & local storage
    removeAll() {
      this.exs = [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.exs));
    },
    //edit exercise
    editEx(ex) {
      this.editedEx = ex;

    },
    //replaces old with new edit
    doneEdit(ex) {
      if (!this.editedEx) {
          return
      }
      this.editedEx = null;
      ex.title = ex.title.trim();
      if (!ex.title) {
        this.removeex(ex);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.exs));
    }
  }
});
