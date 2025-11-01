const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // Load saved todos
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Render todos
    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) li.classList.add('completed');

        // Toggle completion
        li.addEventListener('click', () => {
          todos[index].completed = !todos[index].completed;
          saveTodos();
          renderTodos();
        });

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.classList.add('delete-btn');
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          todos.splice(index, 1);
          saveTodos();
          renderTodos();
        });

        li.appendChild(delBtn);
        todoList.appendChild(li);
      });
    }

    // Save todos to localStorage
    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Add new todo
    addBtn.addEventListener('click', () => {
      const text = todoInput.value.trim();
      if (text !== '') {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
        todoInput.value = '';
      }
    });

    // Allow pressing Enter key
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addBtn.click();
    });

    // Initial render
    renderTodos();
