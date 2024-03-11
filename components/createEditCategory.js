

const TITLE = 'Введите название категории'

export const createEditCategory = (parent) => {

    const section = document.createElement('section')
    section.className = 'edit section-offset'
    const container = document.createElement('div')
    container.className = 'container edit__container'
    const title = document.createElement('h2')
    title.className = 'edit__title'
    title.setAttribute('contenteditable','true')
    title.setAttribute('title','Можно редактировать')

    const table = document.createElement('table')
    table.className = 'edit__table table'
    table.innerHTML = `
        <thead>
        <tr>
      <th class="table__cell">main</th>
      <th class="table__cell">second</th>
      <th class="table__cell"></th>
        </tr>
        </thead>
        <tbody></tbody>`
    


    const btnWrapper = document.createElement('div')
    btnWrapper.className = 'edit__btn-wrapper'

    
    const btnAddRow = document.createElement('button')
    btnAddRow.className = 'edit__btn edit__add-row'
    btnAddRow.textContent = 'Добавить пару'

    const btnSave = document.createElement('button')
    btnSave.className = 'edit__btn edit__save'
    btnSave.textContent = 'Сохранить категорию'

    const btnCancel = document.createElement('button')
    btnCancel.className = 'edit__btn edit__cancel'
    btnCancel.textContent = 'Отмена'

    btnWrapper.append(btnAddRow, btnSave, btnCancel)
    container.append(title, table, btnWrapper)
    section.append(container)

    const createTRCell = (dataArr) =>{
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <th class="table__cell table__cell_one" contenteditable="true">${dataArr[0]}</th>
            <th class="table__cell table__cell_two" contenteditable="true">${dataArr[1]}</th>
            `
        const th = document.createElement('th')
        th.className = 'table__cell'
        const delRow = document.createElement('button')
        delRow.className = 'table__del'
        delRow.textContent = 'x'

        delRow.addEventListener('click',()=>{
            if(confirm('Вы уверены что хотите удалить строку?')){
                tr.remove()
            }
        })

        th.append(delRow)
        tr.append(th)

        return tr
    }

    const clearTitle = () => {
        if(title.textContent === 'TITLE'){
            title.textContent = ''
        }
    }
    const checkTitle = () => {
        if(title.textContent === ''){
            title.textContent = 'TITLE'
        }
    }
    title.addEventListener('focus',clearTitle)
    title.addEventListener('blue',clearTitle)
    


    btnAddRow.addEventListener('click', ()=> {
        const emptyRows = createTRCell(['',''])
        table.querySelector('tbody').append(emptyRows)

    })


    const mount = (data = {title:TITLE, pairs:[]}) =>{
        table.querySelector('tbody').textContent = ''
        title.textContent = data.title
        if(title.textContent === TITLE){
            title.classList.add('edit__title_change')
        }else{
            title.classList.remove('edit__title_change')
        }
        const rows = data.pairs.map(createTRCell)
        table.querySelector('tbody').append(...rows)
        parent.append(section)
    }


    const unmount = () =>{
        section.remove()
    }


    return {mount, unmount}
}
{/* <section class="edit section-offset">
      <div class="container edit__container">
        <h2 class="edit__title" contenteditable="true" title="Можно редактировать">Семья</h2>
        <table class="edit__table table">
          <thead>
            <tr>
              <th class="table__cell">main</th>
              <th class="table__cell">second</th>
              <th class="table__cell"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table__cell table__cell_one" contenteditable="true">брат</td>
              <td class="table__cell table__cell_two" contenteditable="true">brother</td>
              <td class="table__cell"><button class="table__del">x</button></td>
            </tr>
          </tbody>
        </table>
        <div class="edit__btn-wrapper">
          <button class="edit__btn edit__add-row">Добавить пару</button>
          <button class="edit__btn edit__save" data-id="bczp358gktzy">Сохранить категорию</button>
          <button class="edit__btn edit__cancel">Отмена</button>
        </div>
      </div>
    </section> */}