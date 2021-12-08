/* eslint-disable */
/* 
https://api.app.lettutor.com/booking/next?dateTime=
(dateTime = new Date().getTime())
*/

const response = {
    message: "Get booking list for student successful",
    data: [
      {
        createdAtTimeStamp: 1638969967120,
        updatedAtTimeStamp: 1638969967178,
        id: "80c3a545-d50b-4e53-90df-db8addba90dc",
        userId: "37264873-797b-473d-bf4c-fb017fec076f",
        scheduleDetailId: "43b81d9e-91b5-47e5-aaf9-073d68062b63",
        tutorMeetingLink: "/call/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJuZ3V5ZW5oYW5oZGw5NkBnbWFpbC5jb20iLCJuYW1lIjoiSGFubmFoIE5ndXllbiJ9fSwicm9vbSI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2Zi1jNjMwMzAwNi1kNWQwLTQ1ZjYtYTBlZS04OTE0OGE1MWI2OWUiLCJyb29tTmFtZSI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2Zi1jNjMwMzAwNi1kNWQwLTQ1ZjYtYTBlZS04OTE0OGE1MWI2OWUiLCJ1c2VyQ2FsbCI6eyJpZCI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2ZiIsImVtYWlsIjoicGhoYWkuZml0QGdtYWlsLmNvbSIsIm5hbWUiOiJIYXJpIiwiYXZhdGFyIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dwQ19fanMxRGhJOXluc0JjSzJLTjZQYk00N0Q1WjBlaXZNdV9WS1E9czk2LWMiLCJjb3VudHJ5IjoiVk4iLCJwaG9uZSI6Ijg0OTMzMjEwNzg2IiwibGFuZ3VhZ2UiOm51bGwsImJpcnRoZGF5IjoiMTk4Ni0wNy0yMSIsImlzQWN0aXZhdGVkIjp0cnVlLCJyZXF1aXJlTm90ZSI6bnVsbCwibGV2ZWwiOiJJTlRFUk1FRElBVEUiLCJpc1Bob25lQWN0aXZhdGVkIjp0cnVlLCJ0aW1lem9uZSI6N30sInVzZXJCZUNhbGxlZCI6eyJpZCI6ImM2MzAzMDA2LWQ1ZDAtNDVmNi1hMGVlLTg5MTQ4YTUxYjY5ZSIsImVtYWlsIjoibmd1eWVuaGFuaGRsOTZAZ21haWwuY29tIiwibmFtZSI6Ikhhbm5haCBOZ3V5ZW4iLCJhdmF0YXIiOiJodHRwczovL2FwaS5hcHAubGV0dHV0b3IuY29tL2F2YXRhci9jNjMwMzAwNi1kNWQwLTQ1ZjYtYTBlZS04OTE0OGE1MWI2OWVhdmF0YXIxNjMxMTA4OTY4MzA3LmpwZyIsImNvdW50cnkiOiJWTiIsInBob25lIjpudWxsLCJsYW5ndWFnZSI6bnVsbCwiYmlydGhkYXkiOiIxOTk2LTA3LTI3IiwiaXNBY3RpdmF0ZWQiOnRydWUsInR1dG9ySW5mbyI6eyJpZCI6ImZlMDRlMjA3LTVmNDYtNGE4My1hNzg5LWFjODhiNWE4ZTYyNyIsInVzZXJJZCI6ImM2MzAzMDA2LWQ1ZDAtNDVmNi1hMGVlLTg5MTQ4YTUxYjY5ZSIsInZpZGVvIjoiaHR0cHM6Ly9hcGkuYXBwLmxldHR1dG9yLmNvbS92aWRlby9jNjMwMzAwNi1kNWQwLTQ1ZjYtYTBlZS04OTE0OGE1MWI2OWV2aWRlbzE2MzExMDg5NjgzMTUubXA0IiwiYmlvIjoiSSBoYXZlIGJlZW4gdGVhY2hpbmcgRW5nbGlzaCBhcyBhIHNlY29uZCBsYW5ndWFnZSBmb3Iga2lkcywgdGVlbmFnZXJzIGFuZCBhZHVsdHMgZm9yIDUgeWVhcnMuIEkgY2FuIGhlbHAgeW91IGdhaW4gYSBzdHJvbmdlciBmb3VuZGF0aW9uIGluIEVuZ2xpc2ggYmVmb3JlIGZ1cnRoZXJpbmcgeW91ciBzdHVkaWVzLiBJJ20gcGF0aWVudCwgd2lsbCBzcGVhayBzbG93bHkgYW5kIGNsZWFybHkgc28gZG9uJ3QgaGVzaXRhdGUgdG8gYXNrIGZvciBnb29kIHVuZGVyc3RhbmRpbmcuICIsImVkdWNhdGlvbiI6IkJhY2hlbG9yIGZyb20gVW5pdmVyc2l0eSBvZiBUZWNobm9sb2d5LCBURVNPTCBjZXJ0aWZpY2F0ZSIsImV4cGVyaWVuY2UiOiI1IHllYXJzIG9mIEVuZ2xpc2ggdGVhY2hpbmcgZXhwZXJpZW5jZSAiLCJwcm9mZXNzaW9uIjoiVGVhY2hpbmcgQXNzaXN0YW50IGF0IElMQSBWaWV0bmFtLCBFbmdsaXNoIFRlYWNoZXIgYXQgUGF0aHdheSBTY2hvb2wgIiwiYWNjZW50IjpudWxsLCJ0YXJnZXRTdHVkZW50IjoiQmVnaW5uZXIiLCJpbnRlcmVzdHMiOiJGaW5hbmNlLCBnYXJkZW5pbmcsIHRyYXZlbGxpbmciLCJsYW5ndWFnZXMiOiJFbmdsaXNoIiwic3BlY2lhbHRpZXMiOiJjb252ZXJzYXRpb25hbC1lbmdsaXNoLGVuZ2xpc2gtZm9yLWtpZHMsdG9laWMsbW92ZXJzLHN0YXJ0ZXJzLGZseWVycyxrZXQscGV0IiwicmVzdW1lIjpudWxsLCJpc0FjdGl2YXRlZCI6dHJ1ZSwiaXNOYXRpdmUiOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIxLTA5LTA4VDAwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTExLTAxVDEzOjI3OjU4LjYwOVoifSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjpudWxsLCJpc1Bob25lQWN0aXZhdGVkIjpmYWxzZSwidGltZXpvbmUiOjd9LCJpc1R1dG9yIjp0cnVlLCJzdGFydFRpbWUiOjE2MzkzMTc2MDAwMDAsImVuZFNlc3Npb24iOjE2MzkzMTkxMDAwMDAsInRpbWVJblJvb20iOjE4MDAsImJvb2tpbmdJZCI6IjgwYzNhNTQ1LWQ1MGItNGU1My05MGRmLWRiOGFkZGJhOTBkYyIsImlhdCI6MTYzODk2OTk2NywiZXhwIjoxNjM5MzMzNDk5LCJhdWQiOiJsaXZldHV0b3IiLCJpc3MiOiJsaXZldHV0b3IiLCJzdWIiOiJodHRwczovL21lZXQudHV0b3JpbmcubGV0c3R1ZHkuaW8ifQ.xAx2ck2KzkJOHJSBQYg_EItTbvqkQhgZ6KPNLGu2gN0",
        studentMeetingLink: "/call/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJwaGhhaS5maXRAZ21haWwuY29tIiwibmFtZSI6IkhhcmkifX0sInJvb20iOiIzNzI2NDg3My03OTdiLTQ3M2QtYmY0Yy1mYjAxN2ZlYzA3NmYtYzYzMDMwMDYtZDVkMC00NWY2LWEwZWUtODkxNDhhNTFiNjllIiwicm9vbU5hbWUiOiIzNzI2NDg3My03OTdiLTQ3M2QtYmY0Yy1mYjAxN2ZlYzA3NmYtYzYzMDMwMDYtZDVkMC00NWY2LWEwZWUtODkxNDhhNTFiNjllIiwidXNlckNhbGwiOnsiaWQiOiIzNzI2NDg3My03OTdiLTQ3M2QtYmY0Yy1mYjAxN2ZlYzA3NmYiLCJlbWFpbCI6InBoaGFpLmZpdEBnbWFpbC5jb20iLCJuYW1lIjoiSGFyaSIsImF2YXRhciI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdncENfX2pzMURoSTl5bnNCY0syS042UGJNNDdENVowZWl2TXVfVktRPXM5Ni1jIiwiY291bnRyeSI6IlZOIiwicGhvbmUiOiI4NDkzMzIxMDc4NiIsImxhbmd1YWdlIjpudWxsLCJiaXJ0aGRheSI6IjE5ODYtMDctMjEiLCJpc0FjdGl2YXRlZCI6dHJ1ZSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjoiSU5URVJNRURJQVRFIiwiaXNQaG9uZUFjdGl2YXRlZCI6dHJ1ZSwidGltZXpvbmUiOjd9LCJ1c2VyQmVDYWxsZWQiOnsiaWQiOiJjNjMwMzAwNi1kNWQwLTQ1ZjYtYTBlZS04OTE0OGE1MWI2OWUiLCJlbWFpbCI6Im5ndXllbmhhbmhkbDk2QGdtYWlsLmNvbSIsIm5hbWUiOiJIYW5uYWggTmd1eWVuIiwiYXZhdGFyIjoiaHR0cHM6Ly9hcGkuYXBwLmxldHR1dG9yLmNvbS9hdmF0YXIvYzYzMDMwMDYtZDVkMC00NWY2LWEwZWUtODkxNDhhNTFiNjllYXZhdGFyMTYzMTEwODk2ODMwNy5qcGciLCJjb3VudHJ5IjoiVk4iLCJwaG9uZSI6bnVsbCwibGFuZ3VhZ2UiOm51bGwsImJpcnRoZGF5IjoiMTk5Ni0wNy0yNyIsImlzQWN0aXZhdGVkIjp0cnVlLCJ0dXRvckluZm8iOnsiaWQiOiJmZTA0ZTIwNy01ZjQ2LTRhODMtYTc4OS1hYzg4YjVhOGU2MjciLCJ1c2VySWQiOiJjNjMwMzAwNi1kNWQwLTQ1ZjYtYTBlZS04OTE0OGE1MWI2OWUiLCJ2aWRlbyI6Imh0dHBzOi8vYXBpLmFwcC5sZXR0dXRvci5jb20vdmlkZW8vYzYzMDMwMDYtZDVkMC00NWY2LWEwZWUtODkxNDhhNTFiNjlldmlkZW8xNjMxMTA4OTY4MzE1Lm1wNCIsImJpbyI6IkkgaGF2ZSBiZWVuIHRlYWNoaW5nIEVuZ2xpc2ggYXMgYSBzZWNvbmQgbGFuZ3VhZ2UgZm9yIGtpZHMsIHRlZW5hZ2VycyBhbmQgYWR1bHRzIGZvciA1IHllYXJzLiBJIGNhbiBoZWxwIHlvdSBnYWluIGEgc3Ryb25nZXIgZm91bmRhdGlvbiBpbiBFbmdsaXNoIGJlZm9yZSBmdXJ0aGVyaW5nIHlvdXIgc3R1ZGllcy4gSSdtIHBhdGllbnQsIHdpbGwgc3BlYWsgc2xvd2x5IGFuZCBjbGVhcmx5IHNvIGRvbid0IGhlc2l0YXRlIHRvIGFzayBmb3IgZ29vZCB1bmRlcnN0YW5kaW5nLiAiLCJlZHVjYXRpb24iOiJCYWNoZWxvciBmcm9tIFVuaXZlcnNpdHkgb2YgVGVjaG5vbG9neSwgVEVTT0wgY2VydGlmaWNhdGUiLCJleHBlcmllbmNlIjoiNSB5ZWFycyBvZiBFbmdsaXNoIHRlYWNoaW5nIGV4cGVyaWVuY2UgIiwicHJvZmVzc2lvbiI6IlRlYWNoaW5nIEFzc2lzdGFudCBhdCBJTEEgVmlldG5hbSwgRW5nbGlzaCBUZWFjaGVyIGF0IFBhdGh3YXkgU2Nob29sICIsImFjY2VudCI6bnVsbCwidGFyZ2V0U3R1ZGVudCI6IkJlZ2lubmVyIiwiaW50ZXJlc3RzIjoiRmluYW5jZSwgZ2FyZGVuaW5nLCB0cmF2ZWxsaW5nIiwibGFuZ3VhZ2VzIjoiRW5nbGlzaCIsInNwZWNpYWx0aWVzIjoiY29udmVyc2F0aW9uYWwtZW5nbGlzaCxlbmdsaXNoLWZvci1raWRzLHRvZWljLG1vdmVycyxzdGFydGVycyxmbHllcnMsa2V0LHBldCIsInJlc3VtZSI6bnVsbCwiaXNBY3RpdmF0ZWQiOnRydWUsImlzTmF0aXZlIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMS0wOS0wOFQwMDowMDowMC4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMS0xMS0wMVQxMzoyNzo1OC42MDlaIn0sInJlcXVpcmVOb3RlIjpudWxsLCJsZXZlbCI6bnVsbCwiaXNQaG9uZUFjdGl2YXRlZCI6ZmFsc2UsInRpbWV6b25lIjo3fSwiaXNUdXRvciI6ZmFsc2UsInN0YXJ0VGltZSI6MTYzOTMxNzYwMDAwMCwiZW5kU2Vzc2lvbiI6MTYzOTMxOTEwMDAwMCwidGltZUluUm9vbSI6MTgwMCwiYm9va2luZ0lkIjoiODBjM2E1NDUtZDUwYi00ZTUzLTkwZGYtZGI4YWRkYmE5MGRjIiwiaWF0IjoxNjM4OTY5OTY3LCJleHAiOjE2MzkzMzM0OTksImF1ZCI6ImxpdmV0dXRvciIsImlzcyI6ImxpdmV0dXRvciIsInN1YiI6Imh0dHBzOi8vbWVldC50dXRvcmluZy5sZXRzdHVkeS5pbyJ9.pDVLPGzZENu8aqHfl7HwIZi-RZkbFpPu7kwqFosWgQI",
        studentRequest: null,
        tutorReview: null,
        scoreByTutor: null,
        createdAt: "2021-12-08T13:26:07.120Z",
        updatedAt: "2021-12-08T13:26:07.178Z",
        recordUrl: null,
        isDeleted: false,
        scheduleDetailInfo: {
          startPeriodTimestamp: 1639317600000,
          endPeriodTimestamp: 1639319100000,
          id: "43b81d9e-91b5-47e5-aaf9-073d68062b63",
          scheduleId: "6c5fc457-ef6d-4329-8135-1abe7b3035ad",
          startPeriod: "14:00",
          endPeriod: "14:25",
          createdAt: "2021-12-04T00:57:58.608Z",
          updatedAt: "2021-12-04T00:57:58.608Z",
          scheduleInfo: {
            date: "2021-12-12",
            startTimestamp: 1639317600000,
            endTimestamp: 1639319100000,
            id: "6c5fc457-ef6d-4329-8135-1abe7b3035ad",
            tutorId: "c6303006-d5d0-45f6-a0ee-89148a51b69e",
            startTime: "14:00",
            endTime: "14:25",
            createdAt: "2021-12-04T00:57:58.603Z",
            updatedAt: "2021-12-04T00:57:58.603Z",
            tutorInfo: {
              id: "c6303006-d5d0-45f6-a0ee-89148a51b69e",
              level: null,
              email: "nguyenhanhdl96@gmail.com",
              google: null,
              facebook: null,
              apple: null,
              avatar: "https://api.app.lettutor.com/avatar/c6303006-d5d0-45f6-a0ee-89148a51b69eavatar1631108968307.jpg",
              name: "Hannah Nguyen",
              country: "VN",
              phone: null,
              language: null,
              birthday: "1996-07-27",
              requestPassword: false,
              isActivated: true,
              isPhoneActivated: false,
              requireNote: null,
              timezone: 7,
              phoneAuth: null,
              isPhoneAuthActivated: false,
              createdAt: "2021-09-08T12:48:34.545Z",
              updatedAt: "2021-09-12T06:02:07.696Z",
              deletedAt: null
            }
          }
        }
      }
    ]
  }


export const nextApi = {
    getNext: (payload) => {    //payload: {dateTime: }
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    if (1 == 1) {
                        resolve(
                            {
                                data: response.data//response.tutors.rows.forEach(item => item.userId)
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
