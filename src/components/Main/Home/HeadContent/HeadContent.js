/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {MAIN_COLOR} from '../../../../globals/constant';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

import {useSelector} from 'react-redux';
import axios from 'axios';

const HeadContent = props => {
  const langState = useSelector(state => state.lang);
  const current = useSelector(state => state.auth.current);
  const axiosInstance1 = axios.create({
    baseURL: 'https://api.app.lettutor.com/',
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + current.tokens.access.token,
    },
  });

  const [dataHeader, setDataHeader] = useState({
    total: 0,
    date: '',
    startTime: '',
    endTime: '',
    arrScheduleClass: {}
  })
  
  useEffect(() => {
      axiosInstance1
      .get(`call/total`)
      .then(res => {
        (async () => {
          try{
          const dateTimeLte = new Date().getTime();
          const res1 = await axiosInstance1.get(`booking/next?dateTime=${dateTimeLte}`);
          if (res1.data.data.length > 0) {
            const newArray = res1.data.data.sort((x, y) => (x.scheduleDetailInfo.scheduleInfo.startTimestamp - y.scheduleDetailInfo.scheduleInfo.startTimestamp))
            setDataHeader({
              total: res.data.total,
              arrScheduleClass: newArray[0],
              date: newArray[0].scheduleDetailInfo.scheduleInfo.date,
              startTime: (new Date(newArray[0].scheduleDetailInfo.scheduleInfo
                .startTimestamp)).toLocaleTimeString().substring(0, 5),
              endTime: (new Date(newArray[0].scheduleDetailInfo.scheduleInfo
                .endTimestamp)).toLocaleTimeString().substring(0, 5),
            })
          }else{
            setDataHeader({
              ...dataHeader,
              total: res.data.total,
              arrScheduleClass: {},
              date: "",
              startTime: "",
              endTime: ""
            })
          }
        }catch(err){
          console.log('Error: \n' + err.response.data.message);
        }
        })();
      })
      .catch(err => {
        alert('Error: \n' + err.response.data.message);
      }
    , []);
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      axiosInstance1
      .get(`call/total`)
      .then(res => {
        (async () => { 
          try{
          const dateTimeLte = new Date().getTime();
          const res1 = await axiosInstance1.get(`booking/next?dateTime=${dateTimeLte}`);
          if (res1.data.data.length > 0) {
            const newArray = res1.data.data.sort((x, y) => (x.scheduleDetailInfo.scheduleInfo.startTimestamp - y.scheduleDetailInfo.scheduleInfo.startTimestamp))
            setDataHeader({
              total: res.data.total,
              arrScheduleClass: newArray[0],
              date: newArray[0].scheduleDetailInfo.scheduleInfo.date,
              startTime: (new Date(newArray[0].scheduleDetailInfo.scheduleInfo
                .startTimestamp)).toLocaleTimeString().substring(0, 5),
              endTime: (new Date(newArray[0].scheduleDetailInfo.scheduleInfo
                .endTimestamp)).toLocaleTimeString().substring(0, 5),
            })
          }else{
            setDataHeader({
              ...dataHeader,
              arrScheduleClass: {},
              total: res.data.total,
              date: "",
              startTime: "",
              endTime: ""
            })
          }
        }catch(err){
          console.log('Error: \n' + err.response.data.message);
        }
        })();
      })
      .catch(err => {
        alert('Error: \n' + err.response.data.message);
      });
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={styles.headContent}>
      <View style={{marginBottom: 10, marginTop: 10}}>
        {langState.currentLang == 'en' ? (
          <Text style={{fontSize: 18, color: 'white'}}>
            Total lesson time is {Math.floor(dataHeader.total / 60)} hours {dataHeader.total % 60}{' '}
            minutes
          </Text>
        ) : (
          <Text style={{fontSize: 18, color: 'white'}}>
            Tổng thời gian học là {Math.floor(dataHeader.total / 60)} giờ {dataHeader.total % 60} phút
          </Text>
        )}
      </View>
      {dataHeader.date != '' ? (
        <>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 17, color: 'white'}}>
              {langState[langState.currentLang].Upcoming_Lesson}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 17, color: 'white'}}>
              {new Date(dataHeader.date).toUTCString().substring(0, 16)}{' '}
              {dataHeader.startTime} - {dataHeader.endTime}
            </Text>
          </View>
        </>
      ) : (
        <View style={{marginBottom: 34, marginTop: 20}}>
          <Text style={{fontSize: 17, color: 'white'}}>
            {langState[langState.currentLang].No_Upcoming_Lesson}
          </Text>
        </View>
      )}
      {dataHeader.date != '' && (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 8,
            marginBottom: 25,
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor: 'white',
          }}>
          <Pressable onPress={() => props.navigation.navigate('VideoCall', {
            arrScheduleClass: dataHeader.arrScheduleClass
          })}>
            <Text style={{fontSize: 16, color: MAIN_COLOR}}>
              {langState[langState.currentLang].Enter_lesson_room}
            </Text>
          </Pressable>
        </View>
      )}
      <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 8,
            marginBottom: 25,
            borderRadius: 20,
            borderWidth: 1,
            backgroundColor: 'white',
          }}>
          <Pressable onPress={() => props.navigation.navigate('VideoCall', {
            arrScheduleClass: {
      createdAtTimeStamp: 1640610050046,
      updatedAtTimeStamp: 1640610050081,
      id: "7fb7f7a4-00ab-446e-af32-8a7c6c757a8a",
      userId: "37264873-797b-473d-bf4c-fb017fec076f",
      scheduleDetailId: "485cdc79-12b1-4926-ae3e-af61ad734735",
      tutorMeetingLink: "/call/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJsZWFub2ppbGwwNEBnbWFpbC5jb20iLCJuYW1lIjoiSmlsbCBMZWFubyJ9fSwicm9vbSI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2Zi1lOWUzZWVhYS1hNTg4LTQ3YzQtYjRkMS1lY2ZhMTkwZjYzZmEiLCJyb29tTmFtZSI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2Zi1lOWUzZWVhYS1hNTg4LTQ3YzQtYjRkMS1lY2ZhMTkwZjYzZmEiLCJ1c2VyQ2FsbCI6eyJpZCI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2ZiIsImVtYWlsIjoicGhoYWkuZml0QGdtYWlsLmNvbSIsIm5hbWUiOiJIYXJpIFBoYW0iLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ3BDX19qczFEaEk5eW5zQmNLMktONlBiTTQ3RDVaMGVpdk11X1ZLUT1zOTYtYyIsImNvdW50cnkiOiJWTiIsInBob25lIjoiODQ5MzMyMTA3ODYiLCJsYW5ndWFnZSI6bnVsbCwiYmlydGhkYXkiOiIxOTg2LTA2LTAxVDAwOjAwOjAwLjAwMFoiLCJpc0FjdGl2YXRlZCI6dHJ1ZSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjoiSU5URVJNRURJQVRFIiwiaXNQaG9uZUFjdGl2YXRlZCI6dHJ1ZSwidGltZXpvbmUiOjd9LCJ1c2VyQmVDYWxsZWQiOnsiaWQiOiJlOWUzZWVhYS1hNTg4LTQ3YzQtYjRkMS1lY2ZhMTkwZjYzZmEiLCJlbWFpbCI6ImxlYW5vamlsbDA0QGdtYWlsLmNvbSIsIm5hbWUiOiJKaWxsIExlYW5vIiwiYXZhdGFyIjoiaHR0cHM6Ly9hcGkuYXBwLmxldHR1dG9yLmNvbS9hdmF0YXIvZTllM2VlYWEtYTU4OC00N2M0LWI0ZDEtZWNmYTE5MGY2M2ZhYXZhdGFyMTYzMjEwOTkyOTY2MS5qcGciLCJjb3VudHJ5IjoiUEgiLCJwaG9uZSI6bnVsbCwibGFuZ3VhZ2UiOm51bGwsImJpcnRoZGF5IjoiMTk4MS0wNy0wNCIsImlzQWN0aXZhdGVkIjpmYWxzZSwidHV0b3JJbmZvIjp7ImlkIjoiZTkxYTEzZDAtOWMyZi00YTdhLWIxMWUtZWYzY2JiYzJiNmQ1IiwidXNlcklkIjoiZTllM2VlYWEtYTU4OC00N2M0LWI0ZDEtZWNmYTE5MGY2M2ZhIiwidmlkZW8iOiJodHRwczovL2FwaS5hcHAubGV0dHV0b3IuY29tL3ZpZGVvL2U5ZTNlZWFhLWE1ODgtNDdjNC1iNGQxLWVjZmExOTBmNjNmYXZpZGVvMTYzMjEwOTkyOTY2My5tcDQiLCJiaW8iOiJIaSwgTXkgbmFtZSBpcyBKaWxsIEkgYW0gYW4gZXhwZXJpZW5jZWQgRW5nbGlzaCBUZWFjaGVyIGZyb20gUGhpbGlwcGluZS4gSSB3b3VsZCBsaWtlIHNoYXJlIG15IGVudGh1c2lhc20gd2l0aCB0aGUgbGVhcm5lcnMgaW4gdGhpcyBwbGF0Zm9ybS4gSSd2ZSBiZWVuIHdvcmtpbmcgd2l0aCBkaXZlcnNlIGxlYXJuZXJzIG9mIGFsbCBsZXZlbHMgZm9yIG1hbnkgeWVhcnMuIEkgYW0gZ3JlYXRseSBwYXNzaW9uYXRlIGFib3V0IGFib3V0IHByb2Zlc3Npb24uIEkgbG92ZSB0ZWFjaGluZyBiZWNhdXNlIEkgY2FuIGhlbHAgb3RoZXJzIGltcHJvdmUgdGhlaXIgc2tpbGxzIGFuZCBpdCBnaXZlcyBtZSBqb3kgYW5kIGV4Y2l0ZW1lbnQgbWVldGluZyBkaWZmZXJlbnQgbGVhcm5lcnMgYXJvdW5kIHRoZSB3b3JsZC4gSW4gbXkgY2xhc3MgSSB3b3JrZWQgd2l0aCB3b25kZXJmdWwgZW50aHVzaWFzbSBhbmQgcG9zaXRpdml0eSwgYW5kIEknbSBoYXBweSB0IGZvY3VzIG9uIG15IGxlYXJuZXIncyBnb2FsLiIsImVkdWNhdGlvbiI6IkkgYW0gZ3JhZHVhdGUgb2YgQmFjaGVsb3Igb2YgU2NpZW5jZSBpbiBDb21tZXJjZSBtYWpvciBpbiBtYW5hZ2VtZW50IGFjY291bnRpbmcgaW4gQ2Fub3NzYSBDb2xsZWdlIFNhbiBQYWJsbyBDaXR5IGFuZCBJIHRvb2sgIDM4IHVuaXRzIGluIGVkdWNhdGlvbiBpdCBpcyBDZXJ0aWZpY2F0ZSBvZiBUZWFjaGluZyBQcm9maWNpZW5jeSBpbiBMYWd1bmEgUG9seXRlY2huaWMgIFVuaXZlcnNpdHkgaW4gU2FuIFBhYmxvIENpdHkuIiwiZXhwZXJpZW5jZSI6IkkgYW0gYSBsaWNlbnNlIHRlYWNoZXIgSSB3b3JrZWQgYXMgYW4gRVNMIFRlYWNoZXIgZm9yIGEgeWVhciBub3csIEkgYW0gdHV0b3IgZm9yIGVsZW1lbnRhcnkgdG8gU2VuaW9yIEhpZ2ggU2Nob29sIHN0dWRlbnQuIEkgYWxzbyB0ZWFjaCBCdXNpbmVzcyBFbmdsaXNoIGZvciBzb21lIFByb2Zlc3Npb25hbCBTdHVkZW50cyAuIiwicHJvZmVzc2lvbiI6IkknbSBhbiBBc3Npc3RhbnQgSW5zdHJ1Y3RvciBpbiBBQ0xDIENvbGxlZ2Ugd2VyZSBJIHRlYWNoIFNlbmlvciBoaWdoIHNjaG9vbCBzdHVkZW50IGFuZCBJIGhhbmRsZSBzdWJqZWN0cyBsaWtlIEVuZ2xpc2ggZm9yIEFjYWRlbWljIGFuZCBQcm9mZXNzaW9uYWwgcHVycG9zZXMsIGVudHJlcHJlbmV1cnNoaXAsICBQcmluY2lwbGVzIG9mIEFjY291bnRpbmcsIE9yZ2FuaXphdGlvbiBhbmQgbWFuYWdlbWVudCwgYW5kIEJpb2xvZ3kiLCJhY2NlbnQiOm51bGwsInRhcmdldFN0dWRlbnQiOiJJbnRlcm1lZGlhdGUiLCJpbnRlcmVzdHMiOiJMaXN0ZW5pbmcgdG8gbXVzaWMgLCBXYXRjaGluZyBFbmdsaXNoIG1vdmllcywgR2FyZGVuaW5nLCBCYWtpbmcsIENvb2tpbmcgLGNyYWZ0IG1ha2luZyAsIEFkdWx0IGNvbG9yaW5nLCBHbyBoaWtpbmcgd2l0aCBteSBmYW1pbHkgLHN3aW1taW5nIGFuZCBmaXNoaW5nLiIsImxhbmd1YWdlcyI6IkVuZ2xpc2giLCJzcGVjaWFsdGllcyI6ImVuZ2xpc2gtZm9yLWtpZHMsYnVzaW5lc3MtZW5nbGlzaCxjb252ZXJzYXRpb25hbC1lbmdsaXNoLHN0YXJ0ZXJzIiwicmVzdW1lIjpudWxsLCJpc0FjdGl2YXRlZCI6dHJ1ZSwiaXNOYXRpdmUiOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIxLTA5LTIwVDAwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA5LTIwVDAwOjAwOjAwLjAwMFoifSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjpudWxsLCJpc1Bob25lQWN0aXZhdGVkIjpmYWxzZSwidGltZXpvbmUiOjh9LCJpc1R1dG9yIjp0cnVlLCJzdGFydFRpbWUiOjE2NDA2NjIyMDAwMDAsImVuZFNlc3Npb24iOjE2NDA2NjM3MDAwMDAsInRpbWVJblJvb20iOjE4MDAsImJvb2tpbmdJZCI6IjdmYjdmN2E0LTAwYWItNDQ2ZS1hZjMyLThhN2M2Yzc1N2E4YSIsImlhdCI6MTY0MDYxMDA1MCwiZXhwIjoxNjQwNjc4MDk5LCJhdWQiOiJsaXZldHV0b3IiLCJpc3MiOiJsaXZldHV0b3IiLCJzdWIiOiJodHRwczovL21lZXQudHV0b3JpbmcubGV0c3R1ZHkuaW8ifQ.9mO0NxRYjHUfPzz1w5jdhUA78Vp69liymVUAIarJPms",
      studentMeetingLink: "/call/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiZW1haWwiOiJwaGhhaS5maXRAZ21haWwuY29tIiwibmFtZSI6IkhhcmkgUGhhbSJ9fSwicm9vbSI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2Zi1lOWUzZWVhYS1hNTg4LTQ3YzQtYjRkMS1lY2ZhMTkwZjYzZmEiLCJyb29tTmFtZSI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2Zi1lOWUzZWVhYS1hNTg4LTQ3YzQtYjRkMS1lY2ZhMTkwZjYzZmEiLCJ1c2VyQ2FsbCI6eyJpZCI6IjM3MjY0ODczLTc5N2ItNDczZC1iZjRjLWZiMDE3ZmVjMDc2ZiIsImVtYWlsIjoicGhoYWkuZml0QGdtYWlsLmNvbSIsIm5hbWUiOiJIYXJpIFBoYW0iLCJhdmF0YXIiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ3BDX19qczFEaEk5eW5zQmNLMktONlBiTTQ3RDVaMGVpdk11X1ZLUT1zOTYtYyIsImNvdW50cnkiOiJWTiIsInBob25lIjoiODQ5MzMyMTA3ODYiLCJsYW5ndWFnZSI6bnVsbCwiYmlydGhkYXkiOiIxOTg2LTA2LTAxVDAwOjAwOjAwLjAwMFoiLCJpc0FjdGl2YXRlZCI6dHJ1ZSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjoiSU5URVJNRURJQVRFIiwiaXNQaG9uZUFjdGl2YXRlZCI6dHJ1ZSwidGltZXpvbmUiOjd9LCJ1c2VyQmVDYWxsZWQiOnsiaWQiOiJlOWUzZWVhYS1hNTg4LTQ3YzQtYjRkMS1lY2ZhMTkwZjYzZmEiLCJlbWFpbCI6ImxlYW5vamlsbDA0QGdtYWlsLmNvbSIsIm5hbWUiOiJKaWxsIExlYW5vIiwiYXZhdGFyIjoiaHR0cHM6Ly9hcGkuYXBwLmxldHR1dG9yLmNvbS9hdmF0YXIvZTllM2VlYWEtYTU4OC00N2M0LWI0ZDEtZWNmYTE5MGY2M2ZhYXZhdGFyMTYzMjEwOTkyOTY2MS5qcGciLCJjb3VudHJ5IjoiUEgiLCJwaG9uZSI6bnVsbCwibGFuZ3VhZ2UiOm51bGwsImJpcnRoZGF5IjoiMTk4MS0wNy0wNCIsImlzQWN0aXZhdGVkIjpmYWxzZSwidHV0b3JJbmZvIjp7ImlkIjoiZTkxYTEzZDAtOWMyZi00YTdhLWIxMWUtZWYzY2JiYzJiNmQ1IiwidXNlcklkIjoiZTllM2VlYWEtYTU4OC00N2M0LWI0ZDEtZWNmYTE5MGY2M2ZhIiwidmlkZW8iOiJodHRwczovL2FwaS5hcHAubGV0dHV0b3IuY29tL3ZpZGVvL2U5ZTNlZWFhLWE1ODgtNDdjNC1iNGQxLWVjZmExOTBmNjNmYXZpZGVvMTYzMjEwOTkyOTY2My5tcDQiLCJiaW8iOiJIaSwgTXkgbmFtZSBpcyBKaWxsIEkgYW0gYW4gZXhwZXJpZW5jZWQgRW5nbGlzaCBUZWFjaGVyIGZyb20gUGhpbGlwcGluZS4gSSB3b3VsZCBsaWtlIHNoYXJlIG15IGVudGh1c2lhc20gd2l0aCB0aGUgbGVhcm5lcnMgaW4gdGhpcyBwbGF0Zm9ybS4gSSd2ZSBiZWVuIHdvcmtpbmcgd2l0aCBkaXZlcnNlIGxlYXJuZXJzIG9mIGFsbCBsZXZlbHMgZm9yIG1hbnkgeWVhcnMuIEkgYW0gZ3JlYXRseSBwYXNzaW9uYXRlIGFib3V0IGFib3V0IHByb2Zlc3Npb24uIEkgbG92ZSB0ZWFjaGluZyBiZWNhdXNlIEkgY2FuIGhlbHAgb3RoZXJzIGltcHJvdmUgdGhlaXIgc2tpbGxzIGFuZCBpdCBnaXZlcyBtZSBqb3kgYW5kIGV4Y2l0ZW1lbnQgbWVldGluZyBkaWZmZXJlbnQgbGVhcm5lcnMgYXJvdW5kIHRoZSB3b3JsZC4gSW4gbXkgY2xhc3MgSSB3b3JrZWQgd2l0aCB3b25kZXJmdWwgZW50aHVzaWFzbSBhbmQgcG9zaXRpdml0eSwgYW5kIEknbSBoYXBweSB0IGZvY3VzIG9uIG15IGxlYXJuZXIncyBnb2FsLiIsImVkdWNhdGlvbiI6IkkgYW0gZ3JhZHVhdGUgb2YgQmFjaGVsb3Igb2YgU2NpZW5jZSBpbiBDb21tZXJjZSBtYWpvciBpbiBtYW5hZ2VtZW50IGFjY291bnRpbmcgaW4gQ2Fub3NzYSBDb2xsZWdlIFNhbiBQYWJsbyBDaXR5IGFuZCBJIHRvb2sgIDM4IHVuaXRzIGluIGVkdWNhdGlvbiBpdCBpcyBDZXJ0aWZpY2F0ZSBvZiBUZWFjaGluZyBQcm9maWNpZW5jeSBpbiBMYWd1bmEgUG9seXRlY2huaWMgIFVuaXZlcnNpdHkgaW4gU2FuIFBhYmxvIENpdHkuIiwiZXhwZXJpZW5jZSI6IkkgYW0gYSBsaWNlbnNlIHRlYWNoZXIgSSB3b3JrZWQgYXMgYW4gRVNMIFRlYWNoZXIgZm9yIGEgeWVhciBub3csIEkgYW0gdHV0b3IgZm9yIGVsZW1lbnRhcnkgdG8gU2VuaW9yIEhpZ2ggU2Nob29sIHN0dWRlbnQuIEkgYWxzbyB0ZWFjaCBCdXNpbmVzcyBFbmdsaXNoIGZvciBzb21lIFByb2Zlc3Npb25hbCBTdHVkZW50cyAuIiwicHJvZmVzc2lvbiI6IkknbSBhbiBBc3Npc3RhbnQgSW5zdHJ1Y3RvciBpbiBBQ0xDIENvbGxlZ2Ugd2VyZSBJIHRlYWNoIFNlbmlvciBoaWdoIHNjaG9vbCBzdHVkZW50IGFuZCBJIGhhbmRsZSBzdWJqZWN0cyBsaWtlIEVuZ2xpc2ggZm9yIEFjYWRlbWljIGFuZCBQcm9mZXNzaW9uYWwgcHVycG9zZXMsIGVudHJlcHJlbmV1cnNoaXAsICBQcmluY2lwbGVzIG9mIEFjY291bnRpbmcsIE9yZ2FuaXphdGlvbiBhbmQgbWFuYWdlbWVudCwgYW5kIEJpb2xvZ3kiLCJhY2NlbnQiOm51bGwsInRhcmdldFN0dWRlbnQiOiJJbnRlcm1lZGlhdGUiLCJpbnRlcmVzdHMiOiJMaXN0ZW5pbmcgdG8gbXVzaWMgLCBXYXRjaGluZyBFbmdsaXNoIG1vdmllcywgR2FyZGVuaW5nLCBCYWtpbmcsIENvb2tpbmcgLGNyYWZ0IG1ha2luZyAsIEFkdWx0IGNvbG9yaW5nLCBHbyBoaWtpbmcgd2l0aCBteSBmYW1pbHkgLHN3aW1taW5nIGFuZCBmaXNoaW5nLiIsImxhbmd1YWdlcyI6IkVuZ2xpc2giLCJzcGVjaWFsdGllcyI6ImVuZ2xpc2gtZm9yLWtpZHMsYnVzaW5lc3MtZW5nbGlzaCxjb252ZXJzYXRpb25hbC1lbmdsaXNoLHN0YXJ0ZXJzIiwicmVzdW1lIjpudWxsLCJpc0FjdGl2YXRlZCI6dHJ1ZSwiaXNOYXRpdmUiOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIxLTA5LTIwVDAwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA5LTIwVDAwOjAwOjAwLjAwMFoifSwicmVxdWlyZU5vdGUiOm51bGwsImxldmVsIjpudWxsLCJpc1Bob25lQWN0aXZhdGVkIjpmYWxzZSwidGltZXpvbmUiOjh9LCJpc1R1dG9yIjpmYWxzZSwic3RhcnRUaW1lIjoxNjQwNjYyMjAwMDAwLCJlbmRTZXNzaW9uIjoxNjQwNjYzNzAwMDAwLCJ0aW1lSW5Sb29tIjoxODAwLCJib29raW5nSWQiOiI3ZmI3ZjdhNC0wMGFiLTQ0NmUtYWYzMi04YTdjNmM3NTdhOGEiLCJpYXQiOjE2NDA2MTAwNTAsImV4cCI6MTY0MDY3ODA5OSwiYXVkIjoibGl2ZXR1dG9yIiwiaXNzIjoibGl2ZXR1dG9yIiwic3ViIjoiaHR0cHM6Ly9tZWV0LnR1dG9yaW5nLmxldHN0dWR5LmlvIn0.cBIyjzHKih8Z8N212y9OlPa9hoRBEYT1PU3-GGQ5EyY",
      studentRequest: null,
      tutorReview: null,
      scoreByTutor: null,
      createdAt: "2021-12-27T13:00:50.046Z",
      updatedAt: "2021-12-27T13:00:50.081Z",
      recordUrl: null,
      isDeleted: false,
      scheduleDetailInfo: {
        startPeriodTimestamp: 1640662200000,
        endPeriodTimestamp: 1640663700000,
        id: "485cdc79-12b1-4926-ae3e-af61ad734735",
        scheduleId: "076e2c18-6284-407f-861f-25f335ed08b3",
        startPeriod: "03:30",
        endPeriod: "03:55",
        createdAt: "2021-12-23T05:37:03.727Z",
        updatedAt: "2021-12-23T05:37:03.727Z",
        scheduleInfo: {
          date: "2021-12-28",
          startTimestamp: 1640662200000,
          endTimestamp: 1640663700000,
          id: "076e2c18-6284-407f-861f-25f335ed08b3",
          tutorId: "e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
          startTime: "03:30",
          endTime: "03:55",
          createdAt: "2021-12-23T05:37:03.722Z",
          updatedAt: "2021-12-23T05:37:03.722Z",
          tutorInfo: {
            id: "e9e3eeaa-a588-47c4-b4d1-ecfa190f63fa",
            level: null,
            email: "leanojill04@gmail.com",
            google: "106347686282855590838",
            facebook: null,
            apple: null,
            avatar: "https://api.app.lettutor.com/avatar/e9e3eeaa-a588-47c4-b4d1-ecfa190f63faavatar1632109929661.jpg",
            name: "Jill Leano",
            country: "PH",
            phone: null,
            language: null,
            birthday: "1981-07-04",
            requestPassword: false,
            isActivated: false,
            isPhoneActivated: false,
            requireNote: null,
            timezone: 8,
            phoneAuth: null,
            isPhoneAuthActivated: false,
            createdAt: "2021-09-18T02:27:22.301Z",
            updatedAt: "2021-09-20T03:52:09.859Z",
            deletedAt: null
          }
        }
      }
    }
          })}>
            <Text style={{fontSize: 16, color: MAIN_COLOR}}>
              Test Enter Lesson room
            </Text>
          </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headContent: {
    backgroundColor: 'rgb(12, 61, 223)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeadContent;
