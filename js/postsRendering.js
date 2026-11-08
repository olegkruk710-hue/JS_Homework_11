export function createCard(element) {
    return `
        <h3 id="cardTitle">${element.title}</h3>
        <p id="cardContent">${element.content}</p>
        <button id="updtBtn" data-action="update" data-id="${element.id}">Редактировать</button>
        <button id="delBtn" data-action="delete" data-id="${element.id}">Удалить</button>
        ` 
}

export function renderPosts(posts) {
    const postList = document.querySelector("#postList");
    if (posts.length === 0) {
        postList.textContent = "Постов пока нет!";
        return;
    }
    
    posts.forEach(function(post) {
        const temp = document.createElement("div");
        temp.className = "post-card";
        postList.append(temp)
        temp.innerHTML = createCard(post);
    })
}

