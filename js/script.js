import { createCategories } from "../components/createCategories.js";
import { createEditCategory } from "../components/createEditCategory.js";
import { createHeader } from "../components/createHeader.js";
import { createPairs } from "../components/createPairs.js";
import { showAlert } from "../components/showAlert.js";
import { fetchCards, fetchCategories, fetchCreateCategory, fetchDeleteCategory, fetchEditCategory } from "../service/api.js";

const initApp = async () => {
  const headerParent = document.querySelector(".header");
  const app = document.querySelector("#app");

  const headerObj = createHeader(headerParent);
  const categoryObj = createCategories(app);
  const editCategoryObj = createEditCategory(app);
  const pairsCard = createPairs(app);

  const allSectionUnmount = () => {
    categoryObj.unmount();
    editCategoryObj.unmount();
    pairsCard.unmount();
  };

  categoryObj.categoryList.addEventListener("click", async (event) => {
    const target = event.target;

    const categoryItem = target.closest(".category__item");
    if (!categoryItem) {
      return;
    }

    if (target.closest(".category__edit")) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      console.log(dataCards);
      headerObj.updateHeaderTitle("Редактировать");
      allSectionUnmount();
      editCategoryObj.mount(dataCards);
      editCategoryObj.btnSave.addEventListener('click', patchHandler)
      editCategoryObj.btnSave.removeEventListener('click', postHandler)
      editCategoryObj.btnCancel.addEventListener('click', returntoCategory)
      return;
    }
    if (target.closest(".category__card")) {
      const { title, pairs } = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle(title);
      pairsCard.mount(pairs);
      return;
    }

    if (target.closest(".category__del")) {
      if(confirm('Вы уверены что хотите удалить категорию')){
        let result = fetchDeleteCategory(categoryItem.dataset.id)
        if(result.error){
          showAlert(result.error.message)
          return
        }
      }
      showAlert(`Категория удалена!`)
      categoryItem.remove()
      return;
    }
  });

  function returntoCategory(){
    if(confirm('Вы уверены что хотите выйти без сохранения?')){
      returnIndex()
    }
  }

  async function postHandler() {
    const data = editCategoryObj.parseData()
    console.log(data)
    console.log('post')
    ////
    const dataCategory = await fetchCreateCategory(data)
    console.log(dataCategory)
    if(dataCategory.error){
      showAlert(dataCategory.error.message)
      return
    }
    showAlert(`Новая категория ${data.title} была добавлена`)
    allSectionUnmount()
    headerObj.updateHeaderTitle("Категории");
    categoryObj.mount(dataCategory);
    
  }

  async function patchHandler() {
    const data = editCategoryObj.parseData()
    console.log(data)
    console.log('patch')
    ////
    const dataCategory = await fetchEditCategory(data.id, data)
    if(dataCategory.error){
      showAlert(dataCategory.error.message)
      return
    }
    showAlert(`Категория ${data.title} обновлена`)
    allSectionUnmount()
    headerObj.updateHeaderTitle("Категории");
    categoryObj.mount(dataCategory);
  }

  const returnIndex = async (event) => {
    event?.preventDefault();
    allSectionUnmount();
    const caregories = await fetchCategories();
    if (caregories.message) {
      let p = document.createElement("p");
      p.className = "server-error";
      p.textContent = "Ошибка сервера, попробуйте зайти позже";
      app.append(p);
      return;
    }
    headerObj.updateHeaderTitle("Категории");
    categoryObj.mount(caregories);

  };

  returnIndex();

  pairsCard.btnReturn.addEventListener("click", returnIndex);
  headerObj.headerLink.addEventListener("click", returnIndex);
  headerObj.headerBtn.addEventListener("click", () => {
    allSectionUnmount();
    headerObj.updateHeaderTitle("Новая категория");
    editCategoryObj.mount();
    editCategoryObj.btnSave.addEventListener('click', postHandler)
    editCategoryObj.btnSave.removeEventListener('click', patchHandler)
    editCategoryObj.btnCancel.addEventListener('click', returntoCategory)
  });
};

initApp();
