import { getDATA, createData, deleteData, updateData } from "./api.js";
import { renderPosts, createCard } from "./postsRendering.js";
import { createContent } from "./createContent.js"; 

const titleInput = document.querySelector("#titleInput");
const contentArea = document.querySelector("#contentArea");
const postList = document.querySelector("#postList")
const form = document.querySelector("form");


let posts;

async function start() {
    postList.textContent = "Загрузка..."
    posts = await getDATA("post_data");
    postList.textContent = ""
    renderPosts(posts.reverse()); 
}

start();

form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const title = titleInput.value;
    const content = contentArea.value;
    if (e.submitter.tagName === "BUTTON") {
        try {
        await createData("post_data", createPost(title, content)) ;
        location.reload()
        } catch(error) {
            console.error("Ошибка при отправке:", error);
        }
    }
});

postList.addEventListener("click", async function(e) {
    const action = e.target.dataset.action;
    const post_id = Number(e.target.dataset.id)
    const card = e.target.parentElement;

    if (action === "delete") { 
    try {
        await deleteData("post_data", post_id);
        if (card) {
            card.remove();
        }
        
    } catch(error) {
        console.error("Ошибка при отправке:", error);
    }
    }

    if (action === "update") {
        const cardTitleText = document.querySelector("#cardTitle").textContent;
        const cardContentText = document.querySelector("#cardContent").textContent;
        card.innerHTML = "";
        const title = document.createElement("input");
        const content = document.createElement("textarea");
        const btn = document.createElement("button");
        title.id = "titleRename"; title.type ="text"; title.value = cardTitleText;
        content.id = "contentRename"; content.value = cardContentText;
        btn.dataset.action = "changeContent";
        btn.dataset.id = post_id;
        btn.textContent = "Сохранить"
        card.append(title, content, btn);
    }

    if (action === "changeContent") {
        const title = document.querySelector("#titleRename").value.trim();
        const content = document.querySelector("#contentRename").value.trim();
        if (!title || !content) {
            return;
        }

        try {
        const post = await updateData("post_data", post_id, createContent(title, content));
        card.innerHTML = createCard(post);
        } catch(error) {
            console.error(error.message);   
        }
    }
});  
