const objects = [];

function addObject() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0]; 

    if (!validateInput(name, price) || !imageFile) {
        document.getElementById('error-message').innerText = 'Пожалуйста, введите корректные данные и выберите изображение.';
        return;
    }

    const object = {
        name: name,
        price: parseFloat(price),
        category: category,
        image: URL.createObjectURL(imageFile)
    };

    objects.push(object);
    displayObjects();
    imageInput.value = ''; 
}

function deleteObject(index) {
    objects.splice(index, 1);
    displayObjects();
}

function editObject(index) {
    const newName = document.getElementById('name').value;
    const newPrice = document.getElementById('price').value;
    const newCategory = document.getElementById('category').value;
    const imageInput = document.getElementById('image');
    const newImageFile = imageInput.files[0]; 

    if (!validateInput(newName, newPrice) || !newImageFile) {
        document.getElementById('error-message').innerText = 'Пожалуйста, введите корректные данные и выберите изображение.';
        return;
    }

    const object = {
        name: newName,
        price: parseFloat(newPrice),
        category: newCategory,
        image: URL.createObjectURL(newImageFile) 
    };

    objects[index] = object;
    displayObjects();
    imageInput.value = ''; 
}

function displayObjects() {
    const list = document.getElementById('entity-list');
    const emptyMessage = document.getElementById('empty-message');
    list.innerHTML = '';

    if (objects.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        objects.forEach((object, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `<strong>${object.name}</strong> - Цена: ${object.price} - Категория: ${object.category} 
                                  <img src="${object.image}" alt="${object.name}" class="img-fluid">
                                  <button class="btn btn-sm btn-primary mr-2" onclick="editObject(${index})">Изменить</button>
                                  <button class="btn btn-sm btn-danger" onclick="deleteObject(${index})">Удалить</button>`;
            list.appendChild(listItem);
        });
    }
}

function validateInput(name, price) {
    if (!name || !price || isNaN(price) || price <= 0) {
        return false;
    }
    return true;
}
