/* eslint-disable */
import React, {useState, Suspense, useEffect} from 'react';
import {MAIN_COLOR, THIRD_COLOR} from '../../../globals/constant';
import {
  Text,
  View,
  //TextInput,
  StyleSheet,
  Pressable,
  //FlatList,
  ScrollView,
} from 'react-native';

// import {useForm, Controller} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {
  getSchedule,
  cancelBookingSchedule,
} from '../../../api/schedule/scheduleApi';
import moment from 'moment';
// import { sign, decode } from "react-native-pure-jwt";

const UpcomingNew = props => {
  const current = useSelector(state => state.auth.current);
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const [arrSchedulePagination, setArrSchedulePagination] = useState({
    arrDate: [],
    arrSchedule: [],
    arrPagination: [],
    currentPage: 1,
  });

  useEffect(() => {
    let isMounted = true;
    // sign(
    //   {
    //     "context": {
    //       "user": {
    //         "email": "phhai.fit@gmail.com",
    //         "name": "Hari Pham"
    //       }
    //     },
    //     "room": "37264873-797b-473d-bf4c-fb017fec076f-e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
    //     "roomName": "37264873-797b-473d-bf4c-fb017fec076f-e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
    //     "userCall": {
    //       "id": "37264873-797b-473d-bf4c-fb017fec076f",
    //       "email": "phhai.fit@gmail.com",
    //       "name": "Hari Pham",
    //       "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgpC__js1DhI9ynsBcK2KN6PbM47D5Z0eivMu_VKQ=s96-c",
    //       "country": "VN",
    //       "phone": "84933210786",
    //       "language": null,
    //       "birthday": "1986-06-01T00:00:00.000Z",
    //       "isActivated": true,
    //       "requireNote": null,
    //       "level": "INTERMEDIATE",
    //       "isPhoneActivated": true,
    //       "timezone": 7
    //     },
    //     "userBeCalled": {
    //       "id": "e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
    //       "email": "leanojill04@gmail.com",
    //       "name": "Jill Leano",
    //       "avatar": "https://api.app.lettutor.com/avatar/e9e3eeaa-a588-47c4-b4d1-ecfa190f63faavatar1632109929661.jpg",
    //       "country": "PH",
    //       "phone": null,
    //       "language": null,
    //       "birthday": "1981-07-04",
    //       "isActivated": false,
    //       "tutorInfo": {
    //         "id": "e91a13d0-9c2f-4a7a-b11e-ef3cbbc2b6d5",
    //         "userId": "e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
    //         "video": "https://api.app.lettutor.com/video/e9e3eeaa-a588-47c4-b4d1-ecfa190f63favideo1632109929663.mp4",
    //         "bio": "Hi, My name is Jill I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
    //         "education": "I am graduate of Bachelor of Science in Commerce major in management accounting in Canossa College San Pablo City and I took  38 units in education it is Certificate of Teaching Proficiency in Laguna Polytechnic  University in San Pablo City.",
    //         "experience": "I am a license teacher I worked as an ESL Teacher for a year now, I am tutor for elementary to Senior High School student. I also teach Business English for some Professional Students .",
    //         "profession": "I'm an Assistant Instructor in ACLC College were I teach Senior high school student and I handle subjects like English for Academic and Professional purposes, entrepreneurship,  Principles of Accounting, Organization and management, and Biology",
    //         "accent": null,
    //         "targetStudent": "Intermediate",
    //         "interests": "Listening to music , Watching English movies, Gardening, Baking, Cooking ,craft making , Adult coloring, Go hiking with my family ,swimming and fishing.",
    //         "languages": "English",
    //         "specialties": "english-for-kids,business-english,conversational-english,starters",
    //         "resume": null,
    //         "isActivated": true,
    //         "isNative": false,
    //         "createdAt": "2021-09-20T00:00:00.000Z",
    //         "updatedAt": "2021-09-20T00:00:00.000Z"
    //       },
    //       "requireNote": null,
    //       "level": null,
    //       "isPhoneActivated": false,
    //       "timezone": 8
    //     },
    //     "isTutor": false,
    //     "startTime": 1640619000000,
    //     "endSession": 1640620500000,
    //     "timeInRoom": 1800,
    //     "bookingId": "dcb36931-b277-43a9-9811-4432b9ad417c",
    //     "iat": 1640588598,
    //     "exp": 1640634899,
    //     "aud": "livetutor",
    //     "iss": "livetutor",
    //     "sub": "https://meet.tutoring.letstudy.io"
    //   }, // body
    //   "lettutor", // secret
    //   {
    //     alg: "HS256"
    //   }
    // )
    //   .then(res => console.log(res)) // token as the only argument
    //   .catch(error => console.log(error)); // possible errors

    const dateTimeLte = new Date().getTime()- 30 * 60 * 1000;;
    const str = `booking/list/student?page=1&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;
    getSchedule({str: str, accessToken: current.tokens.access.token}).then(
      data => {
        if (data.count > 0) {
          const _countPage = Math.ceil(data.count / 10);
          let arrCount = [];
          for (let i = 0; i < _countPage; i++) {
            arrCount.push(i);
          }
          // setArrPagination(arrCount);
          // setArrHistory(data.rows);
          if (isMounted) {
            setArrSchedulePagination({
              arrDate: [
                ...new Set(
                  data.rows.map(item =>
                    moment(
                      item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                    ).format('YYYY-MM-DD'),
                  ),
                ),
              ],
              currentPage: 1,
              arrSchedule: data.rows,
              arrPagination: arrCount.slice(0, 6),
            });
          }
        } else {
          if (isMounted) {
            setArrSchedulePagination({
              arrDate: [],
              currentPage: 1,
              arrSchedule: [],
              arrPagination: [0],
            });
          }
        }
      },
    );
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = props.navigation.addListener('focus', () => {
      // sign(
      //   {
      //     "context": {
      //       "user": {
      //         "email": "phhai.fit@gmail.com",
      //         "name": "Hari Pham"
      //       }
      //     },
      //     "room": "37264873-797b-473d-bf4c-fb017fec076f-e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
      //     "roomName": "37264873-797b-473d-bf4c-fb017fec076f-e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
      //     "userCall": {
      //       "id": "37264873-797b-473d-bf4c-fb017fec076f",
      //       "email": "phhai.fit@gmail.com",
      //       "name": "Hari Pham",
      //       "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgpC__js1DhI9ynsBcK2KN6PbM47D5Z0eivMu_VKQ=s96-c",
      //       "country": "VN",
      //       "phone": "84933210786",
      //       "language": null,
      //       "birthday": "1986-06-01T00:00:00.000Z",
      //       "isActivated": true,
      //       "requireNote": null,
      //       "level": "INTERMEDIATE",
      //       "isPhoneActivated": true,
      //       "timezone": 7
      //     },
      //     "userBeCalled": {
      //       "id": "e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
      //       "email": "leanojill04@gmail.com",
      //       "name": "Jill Leano",
      //       "avatar": "https://api.app.lettutor.com/avatar/e9e3eeaa-a588-47c4-b4d1-ecfa190f63faavatar1632109929661.jpg",
      //       "country": "PH",
      //       "phone": null,
      //       "language": null,
      //       "birthday": "1981-07-04",
      //       "isActivated": false,
      //       "tutorInfo": {
      //         "id": "e91a13d0-9c2f-4a7a-b11e-ef3cbbc2b6d5",
      //         "userId": "e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
      //         "video": "https://api.app.lettutor.com/video/e9e3eeaa-a588-47c4-b4d1-ecfa190f63favideo1632109929663.mp4",
      //         "bio": "Hi, My name is Jill I am an experienced English Teacher from Philippine. I would like share my enthusiasm with the learners in this platform. I've been working with diverse learners of all levels for many years. I am greatly passionate about about profession. I love teaching because I can help others improve their skills and it gives me joy and excitement meeting different learners around the world. In my class I worked with wonderful enthusiasm and positivity, and I'm happy t focus on my learner's goal.",
      //         "education": "I am graduate of Bachelor of Science in Commerce major in management accounting in Canossa College San Pablo City and I took  38 units in education it is Certificate of Teaching Proficiency in Laguna Polytechnic  University in San Pablo City.",
      //         "experience": "I am a license teacher I worked as an ESL Teacher for a year now, I am tutor for elementary to Senior High School student. I also teach Business English for some Professional Students .",
      //         "profession": "I'm an Assistant Instructor in ACLC College were I teach Senior high school student and I handle subjects like English for Academic and Professional purposes, entrepreneurship,  Principles of Accounting, Organization and management, and Biology",
      //         "accent": null,
      //         "targetStudent": "Intermediate",
      //         "interests": "Listening to music , Watching English movies, Gardening, Baking, Cooking ,craft making , Adult coloring, Go hiking with my family ,swimming and fishing.",
      //         "languages": "English",
      //         "specialties": "english-for-kids,business-english,conversational-english,starters",
      //         "resume": null,
      //         "isActivated": true,
      //         "isNative": false,
      //         "createdAt": "2021-09-20T00:00:00.000Z",
      //         "updatedAt": "2021-09-20T00:00:00.000Z"
      //       },
      //       "requireNote": null,
      //       "level": null,
      //       "isPhoneActivated": false,
      //       "timezone": 8
      //     },
      //     "isTutor": false,
      //     "startTime": 1640619000000,
      //     "endSession": 1640620500000,
      //     "timeInRoom": 1800,
      //     "bookingId": "dcb36931-b277-43a9-9811-4432b9ad417c",
      //     "iat": 1640588598,
      //     "exp": 1640634899,
      //     "aud": "livetutor",
      //     "iss": "livetutor",
      //     "sub": "https://meet.tutoring.letstudy.io"
      //   }, // body
      //   "lettutor", // secret
      //   {
      //     alg: "HS256"
      //   }
      // )
      //   .then(res => console.log(res)) // token as the only argument
      //   .catch(error => console.log(error)); // possible errors
      // decode(
      //   `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJwaGhhaS5maXRAZ21haWwuY29tIiwibmFtZSI6IkhhcmkgUGhhbSJ9fSwicm9vbSI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2Zi04NjI0ODEzNy02ZjdkLTRjZjUtYWQyZS0zNGRhNDI3MjJiMjgiLCJyb29tTmFtZSI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2Zi04NjI0ODEzNy02ZjdkLTRjZjUtYWQyZS0zNGRhNDI3MjJiMjgiLCJ1c2VyQ2FsbCI6eyJpZCI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2ZiIsImVtYWlsIjoicGhoYWkuZml0QGdtYWlsLmNvbSIsIm5hbWUiOiJIYXJpIFBoYW0iLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ3BDX19qczFEaEk5eW5zQmNLMktONlBiTTQ3RDVaMGVpdk11X1ZLUT1zOTYtYyIsImNvdW50cnkiOiJWTiIsInBob25lIjoiODQ5MzMyMTA3ODYiLCJsYW5ndWFnZSI6bnVsbCwiYmlydGhkYXkiOiIxOTg2LTA2LTAxVDAwOjAwOjAwLjAwMFoiLCJpc0FjdGl2YXRlZCI6dHJ1ZSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjoiSU5URVJNRURJQVRFIiwiaXNQaG9uZUFjdGl2YXRlZCI6dHJ1ZSwidGltZXpvbmUiOjd9LCJ1c2VyQmVDYWxsZWQiOnsiaWQiOiI4NjI0ODEzNy02ZjdkLTRjZjUtYWQyZS0zNGRhNDI3MjJiMjgiLCJlbWFpbCI6Im5oaWxhbTUyOTJAZ21haWwuY29tIiwibmFtZSI6Ik5oaSBMYW0iLCJhdmF0YXIiOiJodHRwczovL2FwaS5hcHAubGV0dHV0b3IuY29tL2F2YXRhci84NjI0ODEzNy02ZjdkLTRjZjUtYWQyZS0zNGRhNDI3MjJiMjhhdmF0YXIxNjI4MDU4MDQyMjQ2LmpwZyIsImNvdW50cnkiOiJWTiIsInBob25lIjpudWxsLCJsYW5ndWFnZSI6bnVsbCwiYmlydGhkYXkiOiIxOTkyLTAyLTA1IiwiaXNBY3RpdmF0ZWQiOnRydWUsInR1dG9ySW5mbyI6eyJpZCI6ImJhODY5ZjBiLTQ3OTAtNGZkYi1hOTkzLTNiOTFlNGM3ZjRiYyIsInVzZXJJZCI6Ijg2MjQ4MTM3LTZmN2QtNGNmNS1hZDJlLTM0ZGE0MjcyMmIyOCIsInZpZGVvIjoiaHR0cHM6Ly9hcGkuYXBwLmxldHR1dG9yLmNvbS92aWRlby84NjI0ODEzNy02ZjdkLTRjZjUtYWQyZS0zNGRhNDI3MjJiMjh2aWRlbzE2MjgwNTgwNDIyNTQubXA0IiwiYmlvIjoiSGksIEkgYW0gdGVhY2hlciBOaGkuIEkgaGF2ZSBiZWVuIHRlYWNoaW5nIEVuZ2xpc2ggZm9yIDMgeWVhcnMgbm93LiBJIHVzZWQgdG8gc3R1ZHkgYWJyb2FkIGluIFN5ZG5leSBmb3IgNyB5ZWFycy4gRHVyaW5nIG15IHRpbWUgYXMgYW4gb3ZlcnNlYXMgc3R1ZGVudCwgSSBoYWQgc3Bva2VuIHdpdGggcGVvcGxlIGZyb20gZGl2ZXJzZSBjdWx0dXJhbCBiYWNrZ3JvdW5kczsgdGhlcmVmb3JlLCBJIGhhdmUgc3Ryb25nIGxpc3RlbmluZyBhbmQgc3BlYWtpbmcgc2tpbGxzLiBJIGxvdmUgdGVhY2hpbmcgRW5nbGlzaCBhbmQgSSB3aWxsIGRldm90ZSB0byBoZWxwaW5nIHlvdSBpbXByb3ZlIHlvdXIgRW5nbGlzaCBza2lsbHMgaWYgeW91IGJvb2sgbXkgY2xhc3MuXG5JIGFtIGFsc28gcGF0aWVudCBhbmQgdW5kZXJzdGFuZGluZyBiZWNhdXNlIEkga25vdyBmb3IgbWFueSBwZW9wbGUsIEVuZ2xpc2ggaXMgYSB0b3VnaCBsYW5ndWFnZSB0byBtYXN0ZXIuIEluIG15IGNsYXNzLCBJIHdpbGwgaGVscCB5b3UgY29ycmVjdCB5b3VyIHByb251bmNpYXRpb24gYW5kIGRlbGl2ZXIgdGhlIGxlc3NvbnMgaW4gYSB3YXkgdGhhdCBpcyBlYXN5IGZvciB5b3UgdG8gdW5kZXJzdGFuZC5cbklmIHlvdSBib29rIG15IGNsYXNzLCB5b3Ugd2lsbCBoYXZlIG1hbnkgY2hhbmNlcyB0byBwcmFjdGljZSB5b3VyIHNwZWFraW5nIHNraWxscyBhbmQgYWxzbyBpbXByb3ZlIHlvdXIgcHJvbnVuY2lhdGlvbiBhbmQgZ3JhbW1hdGljYWwga25vd2xlZGdlLlxuQmVzaWRlcyB0aGF0LCBpZiB5b3UgbmVlZCBtZSB0bywgSSB3aWxsIHNoYXJlIG15IHBlcnNvbmFsIHRpcHMgdG8gc3R1ZHkgRW5nbGlzaCBtb3JlIGVmZmVjdGl2ZWx5IHdpdGggeW91IGFuZCBzaG93IHlvdSB0aGUgaW1wb3J0YW5jZSBvZiBoYXZpbmcgZnVuIGFuZCBwcmFjdGljZSB3aGlsZSBsZWFybmluZyBFbmdsaXNoLiIsImVkdWNhdGlvbiI6IlRFU09MIGNlcnRpZmljYXRlIGF3YXJkZWQgYnkgdGhlIEFtZXJpY2FuIFRFU09MIEluc3RpdHV0ZSwgSUVMVFMgOC4wIChTcGVha2luZyA4LjAsIExpc3RlbmluZzogOC41LCBSZWFkaW5nIDguNSwgV3JpdGluZyA3LjUpLCBUT0VJQyAyIHNraWxsczogOTg1Lzk5MCIsImV4cGVyaWVuY2UiOiIzIHllYXJzIiwicHJvZmVzc2lvbiI6IkVuZ2xpc2ggdGVhY2hlciIsImFjY2VudCI6bnVsbCwidGFyZ2V0U3R1ZGVudCI6IkludGVybWVkaWF0ZSIsImludGVyZXN0cyI6IlRlYWNoaW5nIEVuZ2xpc2gsIGxpc3RlbmluZyB0byBtdXNpYywgc2hvcHBpbmcsIGVhdGluZyA6KSIsImxhbmd1YWdlcyI6ImVuLHZpLGZyIiwic3BlY2lhbHRpZXMiOiJlbmdsaXNoLWZvci1raWRzLGNvbnZlcnNhdGlvbmFsLWVuZ2xpc2gsaWVsdHMsYnVzaW5lc3MtZW5nbGlzaCxzdGFydGVycyxtb3ZlcnMsZmx5ZXJzLGtldCxwZXQsdG9laWMiLCJyZXN1bWUiOm51bGwsImlzQWN0aXZhdGVkIjp0cnVlLCJpc05hdGl2ZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMS0wOC0wNFQwNjoyMDo0Mi4zMTlaIiwidXBkYXRlZEF0IjoiMjAyMS0xMS0wMVQwMzoyMzoyNS40OTRaIn0sInJlcXVpcmVOb3RlIjpudWxsLCJsZXZlbCI6bnVsbCwiaXNQaG9uZUFjdGl2YXRlZCI6bnVsbCwidGltZXpvbmUiOjd9LCJpc1R1dG9yIjpmYWxzZSwic3RhcnRUaW1lIjoxNjQwOTU5MjAwMDAwLCJlbmRTZXNzaW9uIjoxNjQwOTYwNzAwMDAwLCJ0aW1lSW5Sb29tIjoxODAwLCJib29raW5nSWQiOiI1OWVjZWMxZC0xYWFiLTQ3YmEtOTMxMC0wMmYwNTcyOTQzY2UiLCJpYXQiOjE2NDA1OTIzNTYsImV4cCI6MTY0MDk3NTA5OSwiYXVkIjoibGl2ZXR1dG9yIiwiaXNzIjoibGl2ZXR1dG9yIiwic3ViIjoiaHR0cHM6Ly9tZWV0LnR1dG9yaW5nLmxldHN0dWR5LmlvIn0.pAJQJxbamaev1_vt-sCR8LfUXBCvOuwUlX5lSUllr38`, // the token
      //   "lettutor", // the secret
      //   {
      //     skipValidation: true // to skip signature and exp verification
      //   }
      // )
      //   .then(res => console.log(res)) // already an object. read below, exp key note
      //   .catch(error => console.log(error));

      const dateTimeLte = new Date().getTime() - 30 * 60 * 1000;
      const str = `booking/list/student?page=1&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;
      getSchedule({str: str, accessToken: current.tokens.access.token}).then(
        data => {
          if (data.count > 0) {
            const _countPage = Math.ceil(data.count / 10);
            let arrCount = [];
            for (let i = 0; i < _countPage; i++) {
              arrCount.push(i);
            }
            // setArrPagination(arrCount);
            // setArrHistory(data.rows);
            if (isMounted) {
              setArrSchedulePagination({
                arrDate: [
                  ...new Set(
                    data.rows.map(item =>
                      moment(
                        item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                      ).format('YYYY-MM-DD'),
                    ),
                  ),
                ],
                currentPage: 1,
                arrSchedule: data.rows,
                arrPagination: arrCount.slice(0, 6),
              });
            }
          } else {
            if (isMounted) {
              setArrSchedulePagination({
                arrDate: [],
                currentPage: 1,
                arrSchedule: [],
                arrPagination: [0],
              });
            }
          }
        },
      );
    });
    return () => {
      isMounted = false;
      return unsubscribe;
    };
  }, [props.navigation]);

  const handleCancel = Id => {
    cancelBookingSchedule({
      scheduleDetailId: Id,
      accessToken: current.tokens.access.token,
    })
      .then(res => {
        if (res.data.message == 'Cancel booking successful') {
          alert('Deleted successfully');
          // const dateTimeLte = new Date().getTime();
          const dateTimeLte = new Date().getTime() - 30 * 60 * 1000;
          const str = `booking/list/student?page=1&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;

          getSchedule({
            str: str,
            accessToken: current.tokens.access.token,
          }).then(data => {
            if (data.count > 0) {
              const _countPage = Math.ceil(data.count / 10);
              let arrCount = [];
              for (let i = 0; i < _countPage; i++) {
                arrCount.push(i);
              }
              setArrSchedulePagination({
                arrDate: [
                  ...new Set(
                    data.rows.map(item =>
                      moment(
                        item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                      ).format('YYYY-MM-DD'),
                    ),
                  ),
                ],
                currentPage: 1,
                arrSchedule: data.rows,
                arrPagination: arrCount.slice(0, 6),
              });
            } else {
              setArrSchedulePagination({
                arrDate: [],
                currentPage: 1,
                arrSchedule: [],
                arrPagination: [0],
              });
            }
          });
        }
      })
      .catch(err => {
        if (JSON.stringify(err).includes('message')) {
          alert('FAIL:\n' + err.response.data.message);
        } else {
          alert('FAIL:\n' + err);
        }
      });
  };

  const handleGotoMeeting = arrScheduleClass => {
    if (
      new Date().toDateString() ==
      new Date(
        arrScheduleClass.scheduleDetailInfo.scheduleInfo.startTimestamp,
      ).toDateString()
    ) {
        props.navigation.navigate('VideoCallNew', {
        arrScheduleClass: arrScheduleClass,
      });
    
    } else {
      //alert("grey")
    }
  };

  const langState = useSelector(state => state.lang);
  return (
    <ScrollView style={{backgroundColor: isDarkTheme? 'black':'white'}}>
      {arrSchedulePagination.arrSchedule.length > 0 ? (
        arrSchedulePagination.arrDate.map(function (date, index1) {
          return (
            <View key={index1} style={{paddingBottom: 18}}>
              <View style={{marginLeft: '12%'}}>
                <Text
                  style={{
                    color: THIRD_COLOR,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  {date}
                </Text>
              </View>
              {arrSchedulePagination.arrSchedule
                .filter(
                  item =>
                    moment(
                      item.scheduleDetailInfo.scheduleInfo.startTimestamp,
                    ).format('YYYY-MM-DD') == date,
                )
                .map((arrScheduleClass, index) => (
                  <View
                    style={[
                      styles.container,
                      {
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      },
                    ]}
                    key={index}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View>
                        <FastImage
                          style={{width: 30, height: 30, borderRadius: 15}}
                          resizeMode={FastImage.resizeMode.cover}
                          source={{
                            uri: arrScheduleClass.scheduleDetailInfo
                              .scheduleInfo.tutorInfo.avatar,
                            priority: FastImage.priority.normal,
                          }}
                        />
                      </View>
                      <View>
                        <View style={{margin: 5}}>
                          <Text style={{fontSize: 15, color: 'black'}}>
                            {
                              arrScheduleClass.scheduleDetailInfo.scheduleInfo
                                .tutorInfo.name
                            }
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{marginHorizontal: 5}}>
                            <Text>
                              {moment(
                                arrScheduleClass.scheduleDetailInfo.scheduleInfo
                                  .startTimestamp,
                              ).format('YYYY-MM-DD')}
                            </Text>
                          </View>
                          <View style={{marginLeft: 4}}>
                            <Text style={{color: MAIN_COLOR}}>
                              {new Date(
                                arrScheduleClass.scheduleDetailInfo.scheduleInfo.startTimestamp,
                              )
                                .toLocaleTimeString()
                                .substring(0, 5)}
                            </Text>
                          </View>
                          <View>
                            <Text> - </Text>
                          </View>
                          <View>
                            <Text style={{color: 'red'}}>
                              {new Date(
                                arrScheduleClass.scheduleDetailInfo.scheduleInfo.endTimestamp,
                              )
                                .toLocaleTimeString()
                                .substring(0, 5)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        justifyContent: 'center',
                      }}>
                      <Pressable
                        // style={{width: 75}}
                        style={{width: '50%'}}
                        onPress={() =>
                          handleCancel(arrScheduleClass.scheduleDetailId)
                        }>
                        <View
                          style={{
                            // width: '100%',
                            backgroundColor: 'orange',
                            paddingVertical: 4,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              textAlign: 'center',
                              fontSize: 16,
                            }}>
                            {langState[langState.currentLang].Cancel}
                          </Text>
                        </View>
                      </Pressable>
                      <Pressable
                        style={{width: '50%'}}
                        //style={{width: 130, marginLeft: 15}}
                        onPress={() => handleGotoMeeting(arrScheduleClass)}>
                        <View
                          style={{
                            // width: '100%',
                            backgroundColor:
                              new Date().toDateString() ==
                              new Date(
                                arrScheduleClass.scheduleDetailInfo.scheduleInfo.startTimestamp
                              ).toDateString()
                              && new Date() <= arrScheduleClass.scheduleDetailInfo.scheduleInfo.endTimestamp
                                ? MAIN_COLOR
                                : 'grey',
                            paddingVertical: 4,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              textAlign: 'center',
                              fontSize: 16,
                            }}>
                            {langState[langState.currentLang].Go_to_meeting}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                ))}
            </View>
          );
        })
      ) : (
        <View style={{marginTop: 40}}>
          <Text style={{textAlign: 'center', color: MAIN_COLOR, fontSize: 25}}>
            No Data
          </Text>
        </View>
      )}
      {arrSchedulePagination.arrSchedule.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 10,
          }}>
          {arrSchedulePagination.arrPagination.map((item, index) =>
            index + 1 == arrSchedulePagination.currentPage ? (
              <View
                key={index}
                style={{
                  marginHorizontal: 5,
                  borderColor: MAIN_COLOR,
                  backgroundColor: MAIN_COLOR,
                  borderWidth: 1,
                  borderColor: MAIN_COLOR,
                  width: 30,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginBottom: 15,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {index + 1}
                </Text>
              </View>
            ) : (
              <Pressable
                key={index}
                onPress={() => {
                  //const dateTimeLte = new Date().getTime();
                  const dateTimeLte = new Date().getTime() - 30 * 60 * 1000;
                  const str = `booking/list/student?page=${
                    index + 1
                  }&perPage=10&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`;

                  getSchedule({
                    str: str,
                    accessToken: current.tokens.access.token,
                  }).then(data => {
                    if (data.count > 0) {
                      const _countPage = Math.ceil(data.count / 10);
                      let arrCount = [];
                      for (let i = 0; i < _countPage; i++) {
                        arrCount.push(i);
                      }

                      setArrSchedulePagination({
                        arrDate: [
                          ...new Set(
                            data.rows.map(item =>
                              moment(
                                item.scheduleDetailInfo.scheduleInfo
                                  .startTimestamp,
                              ).format('YYYY-MM-DD'),
                            ),
                          ),
                        ],
                        currentPage: index + 1,
                        arrSchedule: data.rows,
                        arrPagination: arrCount.slice(0, 6),
                      });
                    }
                  });
                }}
                style={{
                  marginHorizontal: 3,
                  borderColor: 'black',
                  backgroundColor: 'yellow',
                  borderWidth: 1,
                  borderColor: 'black',
                  width: 30,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginBottom: 15,
                }}>
                <Text style={{textAlign: 'center'}}>{index + 1}</Text>
              </Pressable>
            ),
          )}
        </View>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '12%',
    // borderRadius: ,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingBottom: 0,
    // borderColor: 'grey',
    // borderWidth: 0.5,
    marginBottom: 5,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});

export default UpcomingNew;
