import { createCategories } from "../components/createCategories.js"
import { createEditCategory } from "../components/createEditCategory.js"
import { createHeader } from "../components/createHeader.js"
import { fetchCards, fetchCategories } from "../service/api.js"





const initApp = async () =>{
    const headerParent = document.querySelector('.header')
    const app = document.querySelector('#app')
    
    const headerObj = createHeader(headerParent)
    const categoryObj = createCategories(app)
    const editCategoryObj = createEditCategory(app)
    
    
    const allSectionUnmount = () =>{
        categoryObj.unmount()
        editCategoryObj.unmount()
    }


    categoryObj.categoryList.addEventListener('click',async(event)=>{
        const target = event.target
        const categoryItem = target.closest('.category__item')
        if(!categoryItem){
            return
        }
        if(target.closest('.category__edit')){
            const dataCards = await fetchCards(categoryItem.dataset.id)
            console.log(dataCards)
            headerObj.updateHeaderTitle('Редактировать')
            allSectionUnmount()
            editCategoryObj.mount(dataCards)
            return
        }
    })


    const returnIndex = async(event) => {
        event?.preventDefault()
        allSectionUnmount()
        const caregories = await fetchCategories()
        if(caregories.message){
            let p = document.createElement('p')
            p.className = 'server-error'
            p.textContent = 'Ошибка сервера, попробуйте зайти позже'
            app.append(p)
            return
        }
        headerObj.updateHeaderTitle('Категории')
        categoryObj.mount(caregories)
    }
    returnIndex()
    headerObj.headerLink.addEventListener('click', returnIndex)
    headerObj.headerBtn.addEventListener('click', ()=>{
        allSectionUnmount()
        headerObj.updateHeaderTitle('Новая категория')
        editCategoryObj.mount()
    })
}

initApp()