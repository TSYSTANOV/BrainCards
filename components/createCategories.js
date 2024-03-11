


export const createCategories = (parent) => {

    const section = document.createElement('section')
    section.className = 'category section-offset'

    const container = document.createElement('div')
    container.className = 'container'

    const categoryList = document.createElement('ul')
    categoryList.className = 'category__list'

    section.append(container,categoryList)
    

    function createItem(data){
        const arr = ['пара','пары','пар']	
	    const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
	    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

        let item = document.createElement('li')
        item.className = 'category__item'
        item.dataset.id = data.id
        item.innerHTML = `
            <button class="category__card">
              <span class="category__title">${data.title}</span>
              <span class="category__pairs">${data.length} ${declOfNum(data.length,arr)}</span>
            </button>
          `
          const btnEdit = document.createElement('button')
          btnEdit.className = 'category__btn category__edit'
          btnEdit.setAttribute('aria-label',"редактировать")

          const btnDel = document.createElement('button')
          btnDel.className = 'category__btn category__del'
          btnDel.setAttribute('aria-label',"удалить")

          item.append(btnEdit, btnDel)

          return item
    }
    function mount (data){
       categoryList.innerHTML = ''
       let cards = data.map(createItem)
       categoryList.append(...cards)
       parent.append(section)
    }
    function unmount (){
        section.remove()
    }
    return {mount, unmount, categoryList}
}