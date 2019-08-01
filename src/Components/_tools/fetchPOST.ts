import { async } from "q";

// var data : any;
//use a T template class so that we can pass in any json object being sent from the server!
export const httpPOST = <T> (url: string, data: any, path: Function): Promise<T> =>
{
    return new Promise(resolve =>
    {
        
    
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                  }
            })
            .then(response => response.json())
            .then(body =>
            {
                resolve(body);
                console.log(body);
                path(body);
            })
            .catch((err) => 
            { 
                console.log(err); 
            });
    });  
};
