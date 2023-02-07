const createCategoryAdmin = () => {
    //info for admin
    const infoForAdmin = document.createElement('div');
    infoForAdmin.innerText = "You are the Admin. You can manage this page.";
    infoForAdmin.classList.add('my-3', 'navbar', 'navbar-light', 'bg-light');
    infoForAdmin.setAttribute("id", "infoForAdmin");
    

    const rootPlace = document.getElementById('root');
    const formCategory = document.createElement('form');
    const categoryInput = document.createElement('input');
    categoryInput.classList.add('form-control', 'my-3', 'w-75');
    categoryInput.placeholder = "Enter new Category...";
    categoryInput.type = "text";
    categoryInput.id = "category_name";
    const categoryBtn = document.createElement('button');
    categoryBtn.type = 'submit';
    categoryBtn.id = "category";
    categoryBtn.innerText = 'Insert';
    categoryBtn.classList.add('btn', 'btn-primary');

    rootPlace.appendChild(infoForAdmin);
    formCategory.appendChild(categoryInput);
    formCategory.appendChild(categoryBtn);
    rootPlace.appendChild(formCategory);

    let category_table = document.createElement('table');
    category_table.id = 'table';
    category_table.classList.add("table", "my-5");
    rootPlace.appendChild(category_table);
}

export { createCategoryAdmin }