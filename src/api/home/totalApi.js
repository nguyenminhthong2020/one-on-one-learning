/* eslint-disable */
/* 
https://api.app.lettutor.com/call/total
*/
const response = {"total":3775}


export const totalApi = {
    getTotal: (payload) => {    
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    if (1 == 1) {
                        resolve(
                            {
                                total: response.total//response.tutors.rows.forEach(item => item.userId)
                            }
                        )
                    } else {
                        reject({
                            isLooad: false,
                        })
                    }
                }, 100);
        })
    }
}