


export const createCategories = (parent) => {

    const section = document.createElement('section')
    section.className = 'category section-offset'

    const container = document.createElement('div')
    container.className = 'container'

    const categoryList = document.createElement('ul')
    categoryList.className = 'category__list'

    section.append(container,categoryList)
    

    function createItem(data){
        let item = document.createElement('li')
        item.className = 'category__item'
        item.dataset.id = data.id
        item.innerHTML = `
            <button class="category__card">
              <span class="category__title">${data.title}</span>
              <span class="category__pairs">${data.length} пар</span>
            </button>
            <button class="category__btn category__edit" aria-label="редактировать"></button>
            <button class="category__btn category__del" aria-label="удалить"></button>
          `
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
    return {mount, unmount}
}