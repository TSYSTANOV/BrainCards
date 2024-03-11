import { createCategories } from "../components/createCategories.js"
import { createHeader } from "../components/createHeader.js"
import { fetchCategories } from "../service/api.js"





const initApp = async () =>{
    const headerParent = document.querySelector('.header')
    const app = document.querySelector('#app')
    
    const headerObj = createHeader(headerParent)
    const categoryObj = createCategories(app)
    const caregories = await fetchCategories()
    console.log(caregories)
    if(caregories.message){
        let p = document.createElement('p')
        p.className = 'server-error'
        p.textContent = 'Ошибка сервера, попробуйте зайти позже'
        app.append(p)
        return
    }

    const returnIndex = (event) => {
        event?.preventDefault()
        headerObj.updateHeaderTitle('Категории')
        categoryObj.mount(caregories)
    }
    returnIndex()
    headerObj.headerLink.addEventListener('click', returnIndex)
    headerObj.headerBtn.addEventListener('click', ()=>{
        categoryObj.unmount()
        headerObj.updateHeaderTitle('Новая категория')
    })
}

initApp()