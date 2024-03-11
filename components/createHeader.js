

export const createHeader = (parent) => {

    const container = document.createElement('div')
    container.className = 'container header__container'
    
    const headerLink = document.createElement('a')
    headerLink.className = 'header__logo-link'
    headerLink.innerHTML = '<img class="header__logo" src="img/logo.svg" alt="Логотип сервиса Brain Cards">'

    const headerTitle = document.createElement('h2')
    headerTitle.className = 'header__subtitle'
    headerTitle.textContent = 'Категории'

    const headerBtn = document.createElement('button')
    headerBtn.className = 'header__btn'
    headerBtn.textContent = 'Добавить категорию'

    function updateHeaderTitle (title){
        headerTitle.textContent = title
    }

    container.append(headerLink, headerTitle, headerBtn)

    parent.append(container)

    return {headerLink, headerBtn, updateHeaderTitle}

}
