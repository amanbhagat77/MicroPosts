class UI {
    constructor(){
        this.post = document.querySelector('.posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = "add";

    }

    showPosts(posts){
        let output = "";
        
        posts.forEach((post) =>
            output += `
                <div class = "card mb-3">
                    <div class = "card-body">
                        <h4 class = "card-title">${post.title}</h4>
                        <p class = "card-text">${post.body}</p>
                        <a href = "#" class = "edit card-link" data-id="${post.id}">
                            <i class = "fa fa-pencil"></i>
                        </a>
                        <a href = "#" class = "delete card-link" data-id="${post.id}">
                            <i class = "fa fa-remove"></i>
                        </a>
                    </div>
                </div>
            `
        )

        this.post.innerHTML = output;
        
    }

    clearIdInput(){
        this.idInput.value = '';
    }

    clearFields(){
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    showAlert(message, className){
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));

        const postsContainer = document.querySelector('.postsContainer');
        const posts = document.querySelector('.posts');
        postsContainer.insertBefore(div, posts);


        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }
    
    clearAlert(){
        document.querySelector('.alert').remove();
    }

    fillForm(data){
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id; 
    }

    changeFormState(type){
        if(type === 'edit'){
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';
            this.postSubmit.textContent = 'Update Post';

            //New Cancel button
            const button = document.createElement('button');
            button.className = 'cancel-update btn btn-light btn-block';
            button.textContent = 'Cancel Edit'
            const container = document.querySelector('.card-form');
            const formEnd = document.querySelector('.form-end');
            container.insertBefore(button, formEnd);

        }
        else{
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';
            this.postSubmit.textContent = 'Post It';
            const cancelBtn = document.querySelector('.cancel-update');
            if(cancelBtn){
                cancelBtn.remove();
            }
            this.clearIdInput();
            this.clearFields();
        }
    }
}

export const ui = new UI();
