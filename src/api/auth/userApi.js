/* eslint-disable */
export const userApi = {
    login: (payload) => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    if((payload.email == "test@gmail.com" || payload.email == "test1@gmail.com") && payload.password == "123")
                    {resolve(
                        {
                            isLogging: true,
                            email: payload.email,
                            name: "Minh Thông",
                        }
                    )}else{
                         alert("login fail rồi");
                         reject({
                            isLogging: false,
                            email: null,
                            name: null,
                        })
                    }
                }, 500);
        })
    }
}