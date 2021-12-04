/* eslint-disable */
/* 
   Lấy list favorite tutor
https://api.app.lettutor.com/tutor/more?perPage=9&page=1
*/
const response = {
    tutors: {
        count: 20,
        rows: [
            {
                email: "aprilcorpuz1324@gmail.com",
                userId: "cd0a440b-cd19-4c55-a2a2-612707b1c12c"
            },
            {
                email: "nhilam5292@gmail.com",
                userId: "86248137-6f7d-4cf5-ad2e-34da42722b28"
            }
        ]
    },
    favoriteTutor: [
        {
            firstId: "",
            secondId: "cd0a440b-cd19-4c55-a2a2-612707b1c12c"
        }, {
            firstId: "",
            secondId: "86248137-6f7d-4cf5-ad2e-34da42722b28"
        }
    ]
}

export const moreApi = {
    more: (payload) => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    if (1 == 1) {
                        const testList = [
                            "cd0a440b-cd19-4c55-a2a2-612707b1c12c",
                            "86248137-6f7d-4cf5-ad2e-34da42722b28"
                        ]
                        resolve(
                            {
                                rows: testList//response.tutors.rows.forEach(item => item.userId)
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