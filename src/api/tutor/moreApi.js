/* eslint-disable */
/* 
   Lấy list favorite tutor
https://api.app.lettutor.com/tutor/more?perPage=9&page=1
*/

export const moreApi = {
    add : (payload) => {   
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    if (1 == 1) {
                        let testList = [...payload.currentList];
                        testList.push(payload.tutorId);
                        resolve(
                            {
                                rows: testList
                            }
                        )
                    } else {
                        reject({
                            isLooad: false,
                        })
                    }
                }, 100);
        })
    },
    remove: (payload) => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    if (1 == 1) {
                        let testList = [...payload.currentList];
                        let newTestList = testList.filter(item => item != payload.tutorId)
                        resolve(
                            {
                                rows: newTestList
                            }
                        )
                    } else {
                        reject({
                            isLooad: false,
                        })
                    }
                }, 100);
        })
    },
}