<template>
  <div>
    <ul>
      <!-- firebase取得データを表示 -->
      <li v-for="todo in todos" :key="todo.id">
        <!-- チャックボックス チェック時にtoggleを呼び取り消し線を引く -->
        <span v-if="todo.created">
          <input
            type="checkbox"
            v-bind:checked="todo.done"
            @change="toggle(todo)"
          >
          <!-- ぷるりくできるこめんといれてみた -->
          <!-- firebase取得データのnameと登録年月日時分秒(YYYY/MM/DD HH:mm:ss形式)を表示) -->
          <span v-bind:class="{ done: todo.done }">
            {{ todo.name }} {{ todo.created.toDate() | dateFilter}}
          </span>
          <!-- 対応する行のデータをfirebase上から削除する -->
          <button v-on:click="remove(todo.id)">削除</button>
        </span>
      </li>
    </ul>
    <div class = "form">
      <!-- 入力値をfirebaseへ登録 -->
      <form v-on:submit.prevent="add">
        <input v-model = "name">
        <button>入力値登録</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data: function() {
    return {
      name: '',
      done: false
    }
  },

  /**
   * firebaseのデータをバインド
   */
  created: function() {
    this.$store.dispatch('todos/init')
  },
  methods: {

    /**
     * 入力値登録ボタン押下時処理
     */
    add(){
      this.$store.dispatch('todos/add', this.name)
      this.name = ''
    },

    /**
     * 削除ボタン押下時処理
     */
    remove(id){
      this.$store.dispatch('todos/remove', id)
    },

    /**
     * チェックボックス変更時処理
     */
    toggle(todo){
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed:{

    /**
     * データを登録した順並べ替え
     */
    todos() {
      return this.$store.getters['todos/orderdTodos']
    }
  },
  filters: {

    /**
     * タイムスタンプをYYYY/MM/DD HH:mm:ssへ整形
     */
    dateFilter: function(date){
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>

<style>
/* チェックボックスチェック時の取り消し線 */
li > span > span.done{
  text-decoration: line-through;
}
</style>
