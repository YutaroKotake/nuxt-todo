import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'
import { _ } from 'core-js'

import _sortBy from 'lodash/sortBy'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  todos: []
})

export const actions = {

  /**
   * firebaseのデータをバインド
   */
  init: firestoreAction (({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),

  /**
   * firebaseへデータを登録
   */
  add: firestoreAction((context, name) => {
    if(name.trim()){
      todosRef.add({
        name: name,
        done: false,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),

  /**
   * ボタン押下された行のデータをidを元にfirebaseから削除
   */
  remove: firestoreAction ((context, id) => {
    //対応するifのデータを削除
    todosRef.doc(id).delete()
  }),
　
  /**
   * firebaseへ登録してあるデータのステータスを変更
   */
  toggle: firestoreAction((context, todo) => {
    //対応するidのものを更新
    todosRef.doc(todo.id).update({
      done: !todo.done
    })
  })
}

/**
 * firebaseから取得してきたデータを登録順へソート
 */
export const getters = {
  orderdTodos: state => {
    return _sortBy(state.todos, 'created')
  }
}
