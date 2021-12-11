/* eslint-disable */
/*

payload 
{
https://api.app.lettutor.com/course?page=1&size=100
(size: kích thước mỗi page)
page: 1
size: 100
level[]: 1
categoryId[]: 255c96b6-fd6f-4f43-8dbd-fec766e361e0
q: (chuỗi)
}
*/
export const response = {
  message: 'Success',
  data: {
    count: 4,
    rows: [
      {
        id: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
        name: 'Basic Conversation Topics (New)',
        description: 'Gain confidence speaking about familiar topics',
        imageUrl:
          'https://camblycurriculumicons.s3.amazonaws.com/5e2b895e541a832674533c18?h=d41d8cd98f00b204e9800998ecf8427e',
        level: '1',
        level1: 'Beginner',
        reason:
          "It can be intimidating to speak with a foreigner, no matter how much grammar and vocabulary you've mastered. If you have basic knowledge of English but have not spent much time speaking, this course will help you ease into your first English conversations.",
        purpose:
          'This course covers vocabulary at the CEFR A2 level. You will build confidence while learning to speak about a variety of common, everyday topics. In addition, you will build implicit grammar knowledge as your tutor models correct answers and corrects your mistakes.',
        other_details: '',
        default_price: 0,
        course_price: 0,
        courseType: null,
        sectionType: null,
        visible: true,
        createdAt: '2021-09-03T04:40:27.647Z',
        updatedAt: '2021-09-03T04:40:27.647Z',
        topics: [
          {
            id: 'a2ed4ff9-16a6-43f7-be81-2dec98029c74',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 0,
            name: 'Foods You Love',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_1-food-you-love_280921-1pdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:41:03.252Z',
            updatedAt: '2021-09-03T04:41:03.252Z',
          },
          {
            id: '8ea021df-af44-4f4a-8022-9ea913494e4f',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 9,
            name: 'Shopping Habits',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_shopping-habitspdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:43:05.649Z',
            updatedAt: '2021-09-03T04:43:05.649Z',
          },
          {
            id: '145624d4-cb67-4581-9b7c-96d940da9853',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 8,
            name: 'Your Hometown',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file__lettutor---my-hometownpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:42:50.007Z',
            updatedAt: '2021-09-03T04:42:50.007Z',
          },
          {
            id: '54e2e25a-ee85-4ec8-9a6e-dcc20aba6f0c',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 7,
            name: 'Your Family Members',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_your-family-memberspdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:42:33.550Z',
            updatedAt: '2021-09-03T04:42:33.550Z',
          },
          {
            id: '3e2ae900-ca3b-47ee-9b5c-7ced21bd0589',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 6,
            name: 'Childhood Memories',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_childhood-memoriespdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:42:21.748Z',
            updatedAt: '2021-09-03T04:42:21.748Z',
          },
          {
            id: '42252470-0cac-4c53-9a43-96af6291d983',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 5,
            name: 'Your Daily Routine',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_lettutor---daily-routinepdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:42:05.263Z',
            updatedAt: '2021-09-03T04:42:05.263Z',
          },
          {
            id: '0c4bc194-aa59-42d5-83ab-7598b9f56d3a',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 4,
            name: 'Having Fun in Your Free Time',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_having-fun-in-your-free-timepdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:41:49.685Z',
            updatedAt: '2021-09-03T04:41:49.685Z',
          },
          {
            id: '57b403c4-5885-4977-ac74-dab2410a5be9',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 3,
            name: 'The Best Pet',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_the-best-petpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:41:35.675Z',
            updatedAt: '2021-09-03T04:41:35.675Z',
          },
          {
            id: '611edfd1-f7be-4104-ab5e-9fd904c00ba2',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 2,
            name: 'Playing and Watching Sports',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_3-playing-and-watching-sports_280921-1pdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:41:20.216Z',
            updatedAt: '2021-09-03T04:41:20.216Z',
          },
          {
            id: '7a9ad9a7-f29b-4425-b1e2-d5db5b1ebbca',
            courseId: 'defb3ec8-310c-4216-98e5-fcf80e6613c9',
            orderCourse: 1,
            name: 'Your Job',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_2-your-job_280921-1pdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:41:06.415Z',
            updatedAt: '2021-09-03T04:41:06.415Z',
          },
        ],
        categories: [
          {
            id: '488cc5f8-a5b1-45cd-8d3a-47e690f9298e',
            title: 'English for Beginners',
            description: null,
            key: 'BEGINNER',
            createdAt: '2021-09-05T13:06:10.836Z',
            updatedAt: '2021-09-05T13:06:10.836Z',
          },
        ],
      },
      {
        id: '97a70ae0-a095-412c-b0c6-1e127420240c',
        name: 'Intermediate Conversation Topics (New)',
        description: 'Express your ideas and opinions',
        imageUrl:
          'https://camblycurriculumicons.s3.amazonaws.com/5e2b99d0c4288f294426b643?h=d41d8cd98f00b204e9800998ecf8427e',
        level: '4',
        level1: 'Intermediate',
        reason:
          'Looking for some variety in your lesson topics? Immerse yourself in English discussion with this set of engaging topics.',
        purpose:
          'This course covers vocabulary at the CEFR B1-B2 levels. You will work on improving fluency and comprehension by discussing a variety of topics. In addition, you will receive corrections from a native English speaker to help improve your grammatical accuracy.',
        other_details: '',
        default_price: 0,
        course_price: 0,
        courseType: null,
        sectionType: null,
        visible: true,
        createdAt: '2021-09-03T04:45:27.609Z',
        updatedAt: '2021-09-03T04:45:27.609Z',
        topics: [
          {
            id: 'f89b2b04-2d1e-4761-8843-4990b8411a0d',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 7,
            name: 'The Importance of Family',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-8_-the-importance-of-familypdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:47:18.237Z',
            updatedAt: '2021-09-03T04:47:18.237Z',
          },
          {
            id: '909f5611-6b36-483b-bb4f-64c66092d512',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 9,
            name: 'Online Shopping',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-10_-shopping-onlinepdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:47:41.670Z',
            updatedAt: '2021-09-03T04:47:41.670Z',
          },
          {
            id: '31ae4102-9bd0-4938-8158-08daf7d40444',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 0,
            name: 'Cooking',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-1_cookingpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:45:56.933Z',
            updatedAt: '2021-09-03T04:45:56.933Z',
          },
          {
            id: 'f25b9763-f0e0-4280-9a47-05ccfbe74a3f',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 1,
            name: 'Your Dream Job',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-2_your-dream-jobpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:46:06.474Z',
            updatedAt: '2021-09-03T04:46:06.474Z',
          },
          {
            id: '50c2f5c2-23e3-4000-8e5a-68b8b73e854f',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 2,
            name: 'Sports Fitness',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-3_-sports-fitnesspdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:46:15.929Z',
            updatedAt: '2021-09-03T04:46:15.929Z',
          },
          {
            id: '2c584a4f-7156-46a0-91bb-6296a3516f3c',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 4,
            name: 'Social Activities',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-5_-social-activitiespdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:46:38.365Z',
            updatedAt: '2021-09-03T04:46:38.365Z',
          },
          {
            id: 'c1b17334-cac2-43af-9d51-48db0ec47d77',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 5,
            name: 'Your Ideal Day',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-6_-your-ideal-daypdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:46:53.295Z',
            updatedAt: '2021-09-03T04:46:53.295Z',
          },
          {
            id: 'cbef2667-5f02-47d7-bf0d-2c2797eacbb5',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 8,
            name: 'City Life',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-9_city-lifepdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:47:29.699Z',
            updatedAt: '2021-09-03T04:47:29.699Z',
          },
          {
            id: '0cbec059-1988-4abe-9a05-91770589853a',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 3,
            name: 'Service Animals',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-4_-service-animals-pdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:46:29.010Z',
            updatedAt: '2021-09-03T04:46:29.010Z',
          },
          {
            id: 'fb710236-1c2f-49be-be83-845be8c018ad',
            courseId: '97a70ae0-a095-412c-b0c6-1e127420240c',
            orderCourse: 6,
            name: 'Childhood Friendships',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_topic-7_-childhood-friendshipspdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T04:47:03.346Z',
            updatedAt: '2021-09-03T04:47:03.346Z',
          },
        ],
        categories: [
          {
            id: '488cc5f8-a5b1-45cd-8d3a-47e690f9298e',
            title: 'English for Beginners',
            description: null,
            key: 'BEGINNER',
            createdAt: '2021-09-05T13:06:10.836Z',
            updatedAt: '2021-09-05T13:06:10.836Z',
          },
        ],
      },
      {
        id: 'ceae59f8-8327-4ad4-9eec-98e32aa8e318',
        name: 'Healthy Mind, Healthy Body (New)',
        description:
          "Let's discuss the many aspects of living a long, happy life",
        imageUrl:
          'https://camblycurriculumicons.s3.amazonaws.com/5e2b9a4c05342470fdddf8b8?h=d41d8cd98f00b204e9800998ecf8427e',
        level: '4',
        level1: 'Intermediate',
        reason: '',
        purpose:
          'Discuss topics related to physical, mental, and emotional health. Learn about other cultures along the way in friendly conversations with tutors.',
        other_details: '',
        default_price: 0,
        course_price: 0,
        courseType: null,
        sectionType: null,
        visible: true,
        createdAt: '2021-09-03T05:00:27.687Z',
        updatedAt: '2021-09-03T05:00:27.687Z',
        topics: [
          {
            id: '0b45178e-2236-4d4a-9e12-0b678b433906',
            courseId: 'ceae59f8-8327-4ad4-9eec-98e32aa8e318',
            orderCourse: 0,
            name: 'You Are What You Eat',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_you-are-what-you-eat_intermediate-conversation_lettutorpptxpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T05:01:02.525Z',
            updatedAt: '2021-09-03T05:01:02.525Z',
          },
          {
            id: 'fca9a578-380f-45d2-b587-19c77a713043',
            courseId: 'ceae59f8-8327-4ad4-9eec-98e32aa8e318',
            orderCourse: 2,
            name: 'Drink Up',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_drink-up_intermediate-conversation_lettutorpptxpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T05:01:34.256Z',
            updatedAt: '2021-09-03T05:01:34.256Z',
          },
          {
            id: 'e56fae06-e009-4d82-b360-efb9acec2ab0',
            courseId: 'ceae59f8-8327-4ad4-9eec-98e32aa8e318',
            orderCourse: 4,
            name: 'Calm and RnB',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_calm-and-rnb-_intermediate-conversation_lettutorpptxpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T05:02:03.088Z',
            updatedAt: '2021-09-03T05:02:03.088Z',
          },
          {
            id: 'fc92b0ec-9fc7-4a3b-8d89-e1f33e11f339',
            courseId: 'ceae59f8-8327-4ad4-9eec-98e32aa8e318',
            orderCourse: 3,
            name: 'Getting Some Zizz',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_getting-some-zizz-_intermediate-conversation_lettutorpptxpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T05:01:46.872Z',
            updatedAt: '2021-09-03T05:01:46.872Z',
          },
          {
            id: '347d9cca-0c97-4821-ab71-3368b6560a06',
            courseId: 'ceae59f8-8327-4ad4-9eec-98e32aa8e318',
            orderCourse: 5,
            name: 'Look On The Bright Side',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_look-on-the-bright-side-_intermediate-conversation_lettutorpptxpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T05:02:18.123Z',
            updatedAt: '2021-09-03T05:02:18.123Z',
          },
          {
            id: '3aead084-333b-44ae-921e-e748e47852fc',
            courseId: 'ceae59f8-8327-4ad4-9eec-98e32aa8e318',
            orderCourse: 1,
            name: 'Health and Fitness',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_health-and-fitness_intermediate-conversation_lettutorpptxpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T05:01:14.913Z',
            updatedAt: '2021-09-03T05:01:14.913Z',
          },
        ],
        categories: [
          {
            id: 'd95b69f7-b810-4cdf-b11d-49faaa71ff4b',
            title: 'Conversational English',
            description: null,
            key: 'CONVERSATIONAL',
            createdAt: '2021-09-05T13:06:10.836Z',
            updatedAt: '2021-09-05T13:06:10.836Z',
          },
        ],
      },
      {
        id: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
        name: 'Movies and Television (New)',
        description:
          "Let's discuss our preferences and habits surrounding movies and television shows",
        imageUrl:
          'https://camblycurriculumicons.s3.amazonaws.com/5eab4979c920a20f93071fdd?h=d41d8cd98f00b204e9800998ecf8427e',
        level: '1',
        level1: 'Beginner',
        reason:
          "Movies and television shows are common topics of conversation among friends and coworkers. In this course, you will practice discussing the movies and television shows you've seen and sharing your opinions about them.",
        purpose:
          'You will learn vocabulary related to movies and television.  In addition, you will practice the grammatical structures that help you tell a story, and share and explain your likes and dislikes.',
        other_details: '',
        default_price: 0,
        course_price: 0,
        courseType: null,
        sectionType: null,
        visible: true,
        createdAt: '2021-09-03T06:24:24.534Z',
        updatedAt: '2021-09-03T06:24:24.534Z',
        topics: [
          {
            id: '5300a5d5-3738-4868-80db-b2bc1fae70c0',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 8,
            name: 'Movies Around the World',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_movies-around-the-worldpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:26:32.541Z',
            updatedAt: '2021-09-03T06:26:32.541Z',
          },
          {
            id: 'c896fe92-976a-449d-85a6-ff2b823a10b4',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 2,
            name: 'Film Production',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_copy-of-film-productionpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:25:23.295Z',
            updatedAt: '2021-09-03T06:25:23.295Z',
          },
          {
            id: '374c144f-598d-4842-95bc-946bf58e0368',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 3,
            name: 'The World of Streaming',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_copy-of-the-world-of-streaming-1pdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:25:33.767Z',
            updatedAt: '2021-09-03T06:25:33.767Z',
          },
          {
            id: '02d7a748-9fbd-4b64-a342-cc9910422832',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 1,
            name: 'Your Favorite TV shows',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_lettutor---your-favorite-tv-showspdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:25:03.861Z',
            updatedAt: '2021-09-03T06:25:03.861Z',
          },
          {
            id: 'b58de55e-9120-4015-8619-b5d28e7fc20c',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 0,
            name: 'Your Favorite Movie',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_lettutor---your-favorite-moviepdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:24:50.763Z',
            updatedAt: '2021-09-03T06:24:50.763Z',
          },
          {
            id: 'd4e908b4-aea0-4250-adcc-8fc475435cdd',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 6,
            name: 'TV And Movie Characters ',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_tv-and-movie-characterspdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:26:06.808Z',
            updatedAt: '2021-09-03T06:26:06.808Z',
          },
          {
            id: 'e5ee7a64-6548-426c-afd5-ec806a4a5aa1',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 4,
            name: 'Competition Shows',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_competition-showspdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:25:45.063Z',
            updatedAt: '2021-09-03T06:25:45.063Z',
          },
          {
            id: '90f038e9-d03f-4a20-8db3-b4fa520450d8',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 7,
            name: 'Animated Movies And TV Series',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_animated-movies-and-tv-seriespdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:26:20.257Z',
            updatedAt: '2021-09-03T06:26:20.257Z',
          },
          {
            id: '87e69500-8303-4cc0-addf-7c8b58688395',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 5,
            name: 'Reality TV',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_reality-tvpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:25:55.418Z',
            updatedAt: '2021-09-03T06:25:55.418Z',
          },
          {
            id: 'a442c8d3-cfd9-4a8d-ad26-c0261ba64bdd',
            courseId: 'c96645b3-5e85-4619-bfec-5f0f7164edc7',
            orderCourse: 9,
            name: 'The Future of Entertainment',
            nameFile:
              'https://api.app.lettutor.com/file/be4c3df8-3b1b-4c8f-a5cc-75a8e2e6626a_file_movies-around-the-worldpdf.pdf',
            description: '',
            videoUrl: null,
            createdAt: '2021-09-03T06:26:46.643Z',
            updatedAt: '2021-09-03T06:26:46.643Z',
          },
        ],
        categories: [
          {
            id: 'd95b69f7-b810-4cdf-b11d-49faaa71ff4b',
            title: 'Conversational English',
            description: null,
            key: 'CONVERSATIONAL',
            createdAt: '2021-09-05T13:06:10.836Z',
            updatedAt: '2021-09-05T13:06:10.836Z',
          },
        ],
      },
    ],
  },
};

export const searchApi = {
  /*
    page: 1
    size: 100
    level[]: 1
    categoryId[]: 255c96b6-fd6f-4f43-8dbd-fec766e361e0
    q: (chuỗi)
      */
  search: payload => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (1 == 1) {
          // let result = {
          //     message: 'Success',
          //     data: {
          //         count: 0,
          //         rows: []
          //     }
          // }
          let arrRows = response.data.rows.filter(function (i) {
            if (
              i.name.includes(payload.q) &&
              payload.levelArr.includes(i.level) && // Nhớ level là chuỗi
              payload.categoryIdArr.includes(i.categories[0].id)
            ) {
              return true;
            }else {return false;}
          });
          let result = {
              message: 'Success',
              data: {
                  count: arrRows.length,
                  rows: arrRows
              }
          }

          resolve({
            result: result,
          });
        } else {
          alert('login fail rồi');
          reject({
            isLogging: false,
            email: null,
            name: null,
          });
        }
      }, 100);
    });
  },
};
