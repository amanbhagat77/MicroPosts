/**
 * 
 * Easy HTTP Library
 * Library for making HTTP request using async and await and fetch API
 * 
 * @version 3.0.0
 * @author Aman Bhagat
 * @license MIT
 * 
 * 
 */

//async await helps in writing code in synchronously to perform asynchronous tasks
// under the hood it works like promises
// adding async to a function makes it return promise

class EasyHTTP {

    //Make an GET Request

    async get(url){

        // await the response of the fetch call
        const promise = await fetch(url);

        // we only proceed when it is resolved
        const response = await promise.json();

        return handleErrors(response);
    }

    async post(url, data){

        const promise = await fetch(url, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const response = await promise.json();
        return handleErrors(response);

    }

    async put(url, data){

        const promise = await fetch(url, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const response = await promise.json();
        return handleErrors(response);

    }

    async delete(url){

        const promise = await fetch(url, {
            method : 'DELETE'
        })
        const response = await promise.json();
        try{
            handleErrors(response);
            return 'Post Deleted....'
        } 
        catch(e){
            throw new Error(e);
        }

    }
}

function handleErrors(res){
    if(res.ok === false){
        throw new Error(res.error);
    }
    return res;
}

export const http = new EasyHTTP();