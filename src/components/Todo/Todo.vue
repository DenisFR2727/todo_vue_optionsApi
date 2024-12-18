<script>
import { computed } from 'vue'
import { fetchTodos } from '@/api/index'
import Form from './Form.vue'
import ViewTodos from './ViewTodos.vue'
import AppSlots from './AppSlots.vue'
import Select from './Select.vue'

export default {
  components: {
    Form,
    ViewTodos,
    AppSlots,
    Select,
  },
  data() {
    return {
      todos: [],
      completed: [],
      title: '',
      selectedStatus: 'all',
    }
  },
  provide() {
    return {
      todos: computed(() => this.filteredTodos.activeTasks),
    }
  },

  async mounted() {
    const res = await fetchTodos()
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    const storedCompleted = JSON.parse(localStorage.getItem('completedTasks')) || []
    this.todos = storedTasks.length ? storedTasks : res
    this.completed = storedCompleted
  },
  methods: {
    doCheck(index, type) {
      if (type === 'completed') {
        const taskCompleted = this.todos.splice(index, 1)[0]
        taskCompleted.completed = true
        this.completed.push(taskCompleted)
      } else if (type === 'active') {
        const taskActive = this.completed.splice(index, 1)[0]
        taskActive.completed = false
        this.todos.push(taskActive)
      }
      localStorage.setItem('tasks', JSON.stringify(this.todos))
      localStorage.setItem('completedTasks', JSON.stringify(this.completed))
    },
    deleteTask(taskId) {
      this.todos = this.todos.filter((task) => task.id !== taskId)
      this.completed = this.completed.filter((task) => task.id !== taskId)
      localStorage.setItem('tasks', JSON.stringify(this.todos))
      localStorage.setItem('completedTasks', JSON.stringify(this.completed))
    },
    addNewTask() {
      if (!this.title.trim()) return
      const newTask = {
        id: Math.random(),
        title: this.title,
        completed: false,
      }
      this.todos.push(newTask)
      localStorage.setItem('tasks', JSON.stringify(this.todos))
      this.title = ''
    },
  },
  computed: {
    filteredTodos() {
      console.log(this.selectedStatus)
      let activeTasks = this.todos
      let completedTasks = this.completed

      if (this.selectedStatus === 'active') {
        activeTasks = this.todos.filter((task) => !task.completed) // Тільки активні
        completedTasks = [] // Для active не показуємо виконані
      } else if (this.selectedStatus === 'completed') {
        activeTasks = [] // Для completed не показуємо активні
        completedTasks = this.completed.filter((task) => task.completed) // Тільки виконані
      }

      return { activeTasks, completedTasks }
    },
  },
}
</script>

<template>
  <header>
    <div className="header__content">
      <h1>ToDo List</h1>
      <Select v-model="selectedStatus" />
      <Form v-model:title="title" :addNewTask="addNewTask" />
    </div>
  </header>
  <div className="container">
    <ViewTodos
      :doCheck="doCheck"
      :completed="filteredTodos.completedTasks"
      :deleteTask="deleteTask"
    />
  </div>
</template>
<style lang="scss" scoped>
header {
  width: 100%;
  background-color: rgb(33, 30, 30);

  .header__content {
    width: 100%;
    max-width: 1024px;
    padding: 20px 0;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 20px;
      color: aliceblue;
    }
  }
}
</style>
