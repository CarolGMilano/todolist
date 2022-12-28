const form = document.querySelector('[data-form]');
const listaTasks = document.querySelector('[data-taskList]');

let arrayTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function criarElemento (item) {
        listaTasks.innerHTML += `       
            <li data-id="${item.id}">
                <div class="container">
                    <label for="checkbox"></label>
                    <input type="checkbox" id="checkbox" class="checkbox" data-checkbox>

                    <span class="task__text">${item.task}</span>
                </div>
                
                <div class="task__del" data-btnDeletar>X</div>
            </li>
            `

        botaoDeletar(item.id);       
    }

    function botaoDeletar (id) {
        let btnsDeletar = document.querySelectorAll('[data-btnDeletar]');
        
        btnsDeletar.forEach(btn => {
            btn.addEventListener('click', function() {
                let idBtnPressionado = Number(btn.parentNode.dataset.id);
                let elementoClicado = arrayTasks.find(elemento => elemento.id === idBtnPressionado);
                let posicaoElementoClicado = arrayTasks.indexOf(elementoClicado);

                    btn.parentNode.remove();

                    arrayTasks.splice(posicaoElementoClicado, 1);

                    localStorage.setItem('tasks', JSON.stringify(arrayTasks));
            })
        })
    }
    
        arrayTasks.forEach(item => {
            criarElemento(item);
        });
        
        form.addEventListener('submit', function (event) {
                event.preventDefault();

            const inputTexto = document.querySelector('[data-inputTexto]');

            if (inputTexto.value == '') {
                console.log('mensagem de erro')
            } else {
                let task = event.target.elements['task'];

                const novaTask = {
                    'task': task.value,
                    'id': arrayTasks[arrayTasks.length -1] ? (arrayTasks[arrayTasks.length -1]).id +1 : 0
                }
                    
                    arrayTasks.push(novaTask);
                    
                    localStorage.setItem('tasks', JSON.stringify(arrayTasks));
                    
                    criarElemento(novaTask);

                    task.value = '';
            }
            
        })

        