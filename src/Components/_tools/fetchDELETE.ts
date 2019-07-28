import { async } from "q";

// var data : any;
//use a T template class so that we can pass in any json object being sent from the server!
export const httpDELETE = <T> (url: string, data: any): Promise<T> =>
{
    return new Promise(resolve =>
    {
        fetch(url,
            {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers:{
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            }).then(() => {
            console.log('removed');
            }).catch(err => {
            console.error(err)
            });
    });  
};