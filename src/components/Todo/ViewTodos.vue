<script>
export default {
  props: {
    todos: {
      type: Array,
      require: true,
    },
    completed: {
      type: Array,
      require: true,
    },
    doCheck: {
      type: Function,
      require: true,
    },
    deleteTask: {
      type: Function,
      require: true,
    },
  },
}
</script>

<template>
  <div className="todos">
    <div className="todos__active">
      <h2>To Do</h2>
      <slot name="text"></slot>
      <div className="todos__count">
        <span>{{ todos.length }}</span>
      </div>
    </div>
    <div className="line"></div>
    <ul v-if="todos.length > 0">
      <li v-for="(todo, index) in todos" :key="todo.id">
        <div className="task">
          <input type="checkbox" @change="doCheck(index, 'completed')" />
          <span>{{ todo.title }}</span>
        </div>
        <button @click="deleteTask(todo.id)">Remove</button>
      </li>
    </ul>
    <div className="todos__completed">
      <h2>Done</h2>
      <div className="todos__count">
        <span>{{ completed.length }}</span>
      </div>
    </div>
    <div className="line"></div>
    <ul v-if="completed.length > 0">
      <li v-for="(todo, index) in completed" :key="todo.id">
        <div className="task">
          <input type="checkbox" @change="doCheck(index, 'active')" checked />
          <span>{{ todo.title }}</span>
        </div>
        <button @click="deleteTask(todo.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.todos {
  max-width: 1024px;
  margin: 0 auto;

  .todos__active {
    display: flex;
    justify-content: space-between;
    padding-top: 50px;
  }
  .line {
    display: block;
    width: 100%;
    height: 1px;
    margin: 20px 0;
    background-color: grey;
  }
  ul {
    padding: 20px 0;
    li {
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style: none;

      .task {
        display: flex;
        align-items: center;
        gap: 15px;
        input[type='checkbox'] {
          width: 2em;
          height: 2rem;
          accent-color: green;
          cursor: pointer;
        }
        span {
          font-size: 22px;
        }
      }
      button {
        padding: 10px;
        background-color: rgb(33, 30, 30);
        cursor: pointer;
        user-select: none;
        color: aliceblue;
        border: none;
        font-weight: 600;
      }
    }
  }
  .todos__completed {
    display: flex;
    justify-content: space-between;
  }
  .todos__count {
    width: 30px;
    height: 30px;
    position: relative;
    border-radius: 50%;
    border: 2px solid rgb(33, 30, 30);

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
    }
  }
}
</style>
