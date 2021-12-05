/* eslint-disable */
/* 
 {
  user: {
    id: "e2780bad-7aa1-461b-bcca-261677af76c0",
    email: "juernevte@gmail.com",
    name: "Juernevte1",
    avatar: "https://api.app.lettutor.com/avatar/e2780bad-7aa1-461b-bcca-261677af76c0avatar1633741913697.jpg",
    country: "VN",
    phone: "84377371240",
    roles: [
      "student"
    ],
    language: null,
    birthday: "1998-10-27",
    isActivated: false,
    tutorInfo: null,
    walletInfo: {
      id: "93e823e1-aeea-454e-8971-6fa9b638a6c8",
      userId: "e2780bad-7aa1-461b-bcca-261677af76c0",
      amount: "0",
      isBlocked: false,
      createdAt: "2021-10-08T11:10:32.908Z",
      updatedAt: "2021-10-08T11:10:32.908Z",
      bonus: null
    },
    feedbacks: [],
    courses: [],
    requireNote: null,
    level: "BEGINNER",
    learnTopics: [
      {
        id: 4,
        key: "business-english",
        name: "Business English"
      }
    ],
    testPreparations: [],
    isPhoneActivated: false,
    timezone: 7,
    referralInfo: {
      id: 290,
      referralCode: "56BJORP2Y4",
      userId: "e2780bad-7aa1-461b-bcca-261677af76c0",
      referralPackId: 1,
      createdAt: "2021-10-14T15:43:20.421Z",
      updatedAt: "2021-10-14T15:43:20.421Z",
      referralPackInfo: {
        id: 1,
        earnPercent: 5,
        isActive: true,
        createdAt: "2021-10-13T15:37:40.248Z",
        updatedAt: "2021-10-13T15:37:40.248Z"
      }
    },
    avgRating: 0,
    priceOfEachSession: {
      id: "0e5574d5-922f-4809-8af1-a06ed3205188",
      key: "pricePerSession",
      price: "100000",
      createdAt: "2021-06-10T14:53:56.032Z",
      updatedAt: "2021-06-10T14:53:56.032Z"
    }
  }
}
*/

const response = {
  user: {
    id: "37264873-797b-473d-bf4c-fb017fec076f",
    email: "abc@gmail.com",
    name: "Nguyễn Minh Thông",
    avatar: "https://api.app.lettutor.com/avatar/e2780bad-7aa1-461b-bcca-261677af76c0avatar1633741913697.jpg",
    country: "VN",
    phone: "84377371240",
    roles: [
      "student"
    ],
    language: null,
    birthday: "1998-10-27",
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
        id: 3, key: "english-for-kids", name: "English for Kids"
      },
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
    testPreparations: [
      {
        id: 1,
        key: "starters",
        name: "STARTERS"
      },
      {id: 2, key: "movers", name: "MOVERS"}
    ],
    isPhoneActivated: true,
    timezone: 7
  },
  tokens: {
    access: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNzI2NDg3My03OTdiLTQ3M2QtYmY0Yy1mYjAxN2ZlYzA3NmYiLCJpYXQiOjE2Mzg3MDM1MDEsImV4cCI6MTYzODcxNzkwMSwidHlwZSI6ImFjY2VzcyJ9.i2TsnECJETRhVRPlD4TRuQdg711UEJHvIgugLL_gqjs",
      expires: "2021-12-05T15:25:01.820Z"
    },
    refresh: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNzI2NDg3My03OTdiLTQ3M2QtYmY0Yy1mYjAxN2ZlYzA3NmYiLCJpYXQiOjE2Mzg3MDM1MDEsImV4cCI6MTY0MTI5NTUwMSwidHlwZSI6InJlZnJlc2gifQ.MZApcNqaKv5oeAIXlT83fiblQhFC6Q3aBh_vZvkiZy4",
      expires: "2022-01-04T11:25:01.820Z"
    }
  }
}

export const userApi = {
    login: (payload) => {
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    if(payload.email == "abc@gmail.com" && payload.password == "123")
                    {resolve(
                        {
                            isLogging: true,
                            current: response
                        }
                    )}else{
                         alert("login fail rồi");
                         reject({
                            isLogging: false,
                            email: null,
                            name: null,
                        })
                    }
                }, 100);
        })
    },
    
    // changeAvatar là 1 api khác
    changeInfo : (payload) => {
      return new Promise((resolve, reject) => {
          setTimeout(
              () => {
                  if(1 == 1)
                  {
                    const arr = [...payload.whatToLearn].map(function(i){
                      return {name: i.item, id: i.id}
                    });
                    const arr1 = [...payload.whatToLearn1].map(function(i){
                      return {name: i.item, id: i.id}
                    });
                    resolve(
                      {
                          isLogging: true,
                          current: 
                          {user: {...response.user, 
                            birthday : payload.birthday,
                            country: payload.country,
                            level: payload.level,
                            language: payload.language,
                            learnTopics: arr,
                            testPreparations: arr1
                          }}
                      }
                  )}else{
                       alert("login fail rồi");
                       reject({
                          isLogging: false,
                          email: null,
                          name: null,
                      })
                  }
              }, 100);
      })
  },

}