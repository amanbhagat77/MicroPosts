import {http} from "./http";
import {ui} from './ui';

//Load when DOM is loaded
document.addEventListener('DOMContentLoaded', getPosts);

//Listen to submit post
ui.postSubmit.addEventListener('click', submitPost);

//Listen to edit post
ui.post.addEventListener('click', showEditState);

//Listening for the delete using event Delegation
ui.post.addEventListener('click', (e) => {
    if(e.target.parentNode.classList.contains('delete')){
        const id = e.target.parentNode.dataset.id;
        if(confirm('Are you sure?')){
            http.delete(`http://localhost:3000/posts/${id}`)
                .then((data) => {
                    ui.showAlert('Post Deleted', 'alert alert-success');
                    getPosts();
                } )
        }
    }
})

//Listening to cancel update
document.querySelector('.card-form').addEventListener('click', canceUpdate);

//Get posts from json-server
function getPosts(){
    http.get("http://localhost:3000/posts")
        .then(data => ui.showPosts(data))
        .catch((err) => console.log(err));
}

//Submiting the post
function submitPost(e){
    e.preventDefault();

    const title = ui.titleInput.value;
    const body = ui.bodyInput.value;

    const data =  {
        title,
        body
    }
    if(title === '' || body === ''){
        ui.showAlert('Please fill in all the fields', 'alert alert-danger');
    }
    else{
        if(ui.idInput.value === ''){
            //Submit the post
            http.post("http://localhost:3000/posts", data)
                .then((data) => {
                    console.log(data);
                    getPosts();
                    ui.clearFields();
                    ui.showAlert('Post Added', 'alert alert-success');
                })
                .catch(err => console.log(err));
        }
        else{
            //update the post
            http.put(`http://localhost:3000/posts/${ui.idInput.value}`, data)
                .then((data) => {
                    ui.showAlert('Post Updated', 'alert alert-success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
        
    }

    
}

function showEditState(e){
    if(e.target.parentNode.classList.contains('edit')){
        const id = e.target.parentNode.dataset.id;
        const title = e.target.parentNode.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentNode.previousElementSibling.textContent;
        
        const data = {
            id,
            title,
            body
        }

        ui.fillForm(data);
        ui.changeFormState('edit');
    }

    e.preventDefault();
}

function canceUpdate(e){
    if(e.target.classList.contains('cancel-update')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}

