const categoryMobileButtons = document.querySelectorAll('.category-btn-mobile')

const mobileCategoryButtonClickHandler = (item, buttons, layer = 1) => {
    item.addEventListener('click', function () {
        if (item.hasAttribute('clicked')) {
            item.nextElementSibling.remove()
            item.style.backgroundColor=layer===1?'#F2F2F3':'transparent'
            item.style.color='#010114'
            item.querySelector('img').src='images/Expand_down_light.png'
            item.querySelector('img').removeAttribute('class')
            item.removeAttribute('clicked')
            return
        }
        item.setAttribute('clicked', true)
        const children = item.children;
        for (let i = 0; i < children.length; i++) {
            children[i].className = ''
        }

        const dataSub = this.getAttribute('data-sub')
        let parsedData = JSON.parse(dataSub.replace(/'/g, '"'));

        if (!parsedData.length) {
            return
        }

        console.log(parsedData)


        const newCategories = document.createElement('div')
        newCategories.className = 'sub-category-block-mobile'
        if(layer!==1){
            newCategories.style.border='none'
            newCategories.style.backgroundColor='#F2F2F3'
        }
        newCategories.style.minHeight = 'max-content'
        const newUl = document.createElement('ul')
        newUl.className = layer===1?'sub-active-mobile':'sub-passive-mobile'

        parsedData.forEach(data => {
            const dataName = data.name ? data.name : Object.keys(data)[0]
            const newLi = document.createElement('li')
            newLi.setAttribute('data-name', dataName)
            newLi.setAttribute('data-sub', JSON.stringify(data.name ? [] : data[dataName]))
            newLi.innerHTML = `<span>${dataName}</span>${!data.name ? '<img src="images/Expand_down_light.png" alt="down-light">' : ''}`
            if(layer===3){
                newLi.style.fontWeight='400'
            }
            newUl.appendChild(newLi)
        })



        newCategories.appendChild(newUl)
        if (layer === 1) {
            item.style.backgroundColor = '#010114'
            item.style.color = '#ffffff'
            item.querySelector('img').src = 'images/Expand_down_light-white.png'
        }else{
            item.style.backgroundColor = '#F2F2F3'
            item.querySelector('img').classList.add('rotated-image')

        }

        item.insertAdjacentElement('afterend', newCategories);

        let newLayer = layer + 1

        for (let i = 0; i < newUl.children.length; i++) {
            newUl.children[i].addEventListener('click', mobileCategoryButtonClickHandler(newUl.children[i], Array.from(newUl.children), newLayer,));
        }

    })
}


categoryMobileButtons.forEach(item => mobileCategoryButtonClickHandler(item, categoryMobileButtons, 1))