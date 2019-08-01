import { async } from "q";

// var data : any;
//use a T template class so that we can pass in any json object being sent from the server!
export const httpPUT = <T> (url: string, data: any): Promise<T> =>
{
    return new Promise(resolve =>
    {
        
        fetch(url,
            {
                method: 'PUT',
                body: JSON.stringify(data),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })

            .then(response => response.json())
            .catch((err) => 
            { 
                console.log(err); 
            });
    });  
};



// return fetch('/api/update', {
//     method: 'put',
//     body: JSON.stringify(data),
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(checkStatus)
//     .then(()=>console.log('updated!!!'))
// }