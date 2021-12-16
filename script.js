const createTaskBtn = document.getElementById('criar-tarefa');
const inputText = document.getElementById('texto-tarefa');
const tasksList = document.getElementById('lista-tarefas');
const listItems = document.getElementsByTagName('li');
const deleteBtn = document.getElementById('apaga-tudo');
const removeCompleted = document.getElementById('remover-finalizados');
const completedItems = document.getElementsByClassName('completed');
const saveTasksBtn = document.getElementById('salvar-tarefas');
const deleteSelectedBtn = document.getElementById('remover-selecionado');
const moveUpBtn = document.getElementById('mover-cima');
const moveDownBtn = document.getElementById('mover-baixo');

const storagedTasks = JSON.parse(localStorage.getItem('storaged-tasks'));

if (storagedTasks) {
  tasksList.innerHTML = storagedTasks;
}

createTaskBtn.addEventListener('click', () => {
  const createListItem = document.createElement('li');
  if (inputText.value) {
    createListItem.innerText = inputText.value;
    tasksList.appendChild(createListItem);
    inputText.value = null;
  } else {
    alert('Campo de adicionar tarefas não pode estar vazio.');
  }
});

tasksList.addEventListener('click', (event) => {
  for (const i of listItems) {
    i.classList.remove('gray');
  }
  event.target.classList.add('gray');
  event.currentTarget.classList.remove('gray');
});

tasksList.addEventListener('dblclick', (event) => {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
    event.currentTarget.classList.remove('completed');
  }
});

deleteBtn.addEventListener('click', () => {
  while (listItems.length > 0) {
    tasksList.removeChild(tasksList.lastChild);
  }
});

removeCompleted.addEventListener('click', () => {
  while (completedItems.length > 0) {
    tasksList.removeChild(completedItems[completedItems.length - 1]);
  }
});

function saveList() {
  localStorage.setItem('storaged-tasks', JSON.stringify(tasksList.innerHTML));
  alert('Tarefas Salvas!');
}

saveTasksBtn.addEventListener('click', () => saveList());

deleteSelectedBtn.addEventListener('click', () => {
  const selectedItem = document.querySelector('.gray');
  if (selectedItem){
    selectedItem.remove();
  }
});

moveUpBtn.addEventListener('click', () => {
  for (let i = 1; i < listItems.length; i+= 1) {
    if (listItems[i].classList.contains('gray')) {
      let currentItem = listItems[i].innerText;
      let currentItemClasses = listItems[i].className;
      listItems[i].innerText = listItems[i-1].innerText;
      listItems[i].className = listItems[i-1].className;
      listItems[i-1].innerText = currentItem;
      listItems[i-1].className = currentItemClasses;
    }
  }
});

moveDownBtn.addEventListener('click', () => {
  for (let i = listItems.length - 2; i >= 0; i -= 1) {
    if (listItems[i].classList.contains('gray') && listItems[i]) {
      let currentItem = listItems[i].innerText;
      let currentItemClasses = listItems[i].className;
      listItems[i].textContent = listItems[i+1].textContent;
      listItems[i].className = listItems[i+1].className;
      listItems[i+1].textContent = currentItem;
      listItems[i+1].className = currentItemClasses;
    }
  }
});
