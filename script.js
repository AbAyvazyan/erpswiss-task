const categoryButtons = document.querySelectorAll('.category-btn')
const contentImage = document.getElementById('content-image')

const categoryButtonClickHandler = (item, layer = 1, buttons) => {
    const mainCategoriesHolder = document.getElementById('main-categories-holder')
    mainCategoriesHolder.style.background = '#FFFFFF'
    item.addEventListener('click', function () {

        const children = mainCategoriesHolder.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.background = '#FFFFFF';
        }
        while (children.length > layer) {
            mainCategoriesHolder.removeChild(mainCategoriesHolder.lastChild);
        }

        buttons.forEach(btn => {
            btn.innerHTML = btn.innerHTML.split('<')[0];
            btn.style.color = '#b3b3b9';
            btn.classList.remove('clickedLi');
        });


        item.style.color = '#010114';
        item.classList.add('clickedLi');
        const dataSub = this.getAttribute('data-sub')
        let parsedData = JSON.parse(dataSub.replace(/'/g, '"'));

        if (!parsedData.length) {
            children[children.length - 1].style.backgroundColor = '#F1F1F1'
            return
        }


        contentImage.style.display = 'none'
        const newCategories = document.createElement('div')
        newCategories.className = 'main-category-block'
        newCategories.style.height = 'max-content'
        const newUl = document.createElement('ul')
        newUl.className = 'active'

        parsedData.forEach(data => {
            const dataName = data.name ? data.name : Object.keys(data)[0]
            const newLi = document.createElement('li')
            newLi.setAttribute('data-name', dataName)
            newLi.setAttribute('data-sub', JSON.stringify(data.name ? [] : data[dataName]))
            newLi.innerText = dataName
            newUl.appendChild(newLi)
        })

        let newLayer = layer + 1

        for (let i = 0; i < newUl.children.length; i++) {
            newUl.children[i].addEventListener('click', categoryButtonClickHandler(newUl.children[i], newLayer, Array.from(newUl.children)));
        }
        newCategories.appendChild(newUl)

        mainCategoriesHolder.appendChild(newCategories)

        const button = document.createElement('div');
        button.textContent = '>';
        button.style.fontSize='30px'
        button.classList.add('expand-button'); // Add a class to the button for styling or identification
        item.appendChild(button);
        item.style.color = '#010114';
        item.classList.add('clickedLi');
    })
    return mainCategoriesHolder
}


categoryButtons.forEach(item => categoryButtonClickHandler(item, 1, categoryButtons))