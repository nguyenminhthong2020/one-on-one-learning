/* eslint-disable */
/* 
{
  user: {
    id: "37264873-797b-473d-bf4c-fb017fec076f",
    email: "phhai.fit@gmail.com",
    name: "Hari",
    avatar: "https://lh3.googleusercontent.com/a-/AOh14GgpC__js1DhI9ynsBcK2KN6PbM47D5Z0eivMu_VKQ=s96-c",
    country: "VN",
    phone: "84933210786",
    roles: [
      "student"
    ],
    language: null,
    birthday: "1986-07-21",
    isActivated: true,
    walletInfo: {
      id: "86a22005-a37c-4fe4-a999-577d1bfe3af0",
      userId: "37264873-797b-473d-bf4c-fb017fec076f",
      amount: "3600000",
      isBlocked: false,
      createdAt: "2021-08-01T17:01:22.646Z",
      updatedAt: "2021-11-18T16:44:14.732Z",
      bonus: null
    },
    courses: [],
    requireNote: null,
    level: "INTERMEDIATE",
    learnTopics: [
      {
        id: 5,
        key: "conversational-english",
        name: "Conversational English"
      },
      {
        id: 4,
        key: "business-english",
        name: "Business English"
      }
    ],
    testPreparations: [],
    isPhoneActivated: true,
    timezone: 7
  },
  tokens: {
    access: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNzI2NDg3My03OTdiLTQ3M2QtYmY0Yy1mYjAxN2ZlYzA3NmYiLCJpYXQiOjE2Mzg1MzU4NDQsImV4cCI6MTYzODU1MDI0NCwidHlwZSI6ImFjY2VzcyJ9.GowdMO6ue6rKDNeGcrl9_G3sSidzDvcflMR9irRXOsM",
      expires: "2021-12-03T16:50:44.550Z"
    },
    refresh: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNzI2NDg3My03OTdiLTQ3M2QtYmY0Yy1mYjAxN2ZlYzA3NmYiLCJpYXQiOjE2Mzg1MzU4NDQsImV4cCI6MTY0MTEyNzg0NCwidHlwZSI6InJlZnJlc2gifQ.cKeuzhCV3vOemyPKDpVcflO1BNP0V21ej129hnM60Us",
      expires: "2022-01-02T12:50:44.550Z"
    }
  }
}
*/
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