import { async } from "q";

//use a T template class so that we can pass in any json object being sent from the server!
export const httpGET = <T> (request: RequestInfo): Promise<T> =>
{
    return new Promise(resolve =>
    {
        fetch(request)
            .then(response => response.json())
            .then(body =>
            {
                resolve(body);
            })
            .catch((err) => 
            { 
                console.log(err); 
            });
    });  
};