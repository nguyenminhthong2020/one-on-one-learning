/* eslint-disable */
import React, {Suspense, useState, useRef, useEffect, useMemo} from 'react';
import {
  ScrollView,
  // StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  //Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
  FlatList,
  //TextInput,
  Alert,
} from 'react-native';
import {MAIN_COLOR} from '../../../../../globals/constant';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {getScheduleBooking} from '../../../../../api/booking/bookingApi';

const ReportAlert = tutorName =>
  Alert.alert(
    `Report ${tutorName} for some reasons:`,
    `1) This tutor is annoying me. \n2) This profile is pretending be someone or is fake \n3) Inappropriate profile photo \n\n Please check he/she...`,
    [
      {
        text: 'OK',
        onPress: () => alert('Complete'),
        style: 'default',
      },
      {
        text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
        style: 'destructive',
      },
    ],
    {cancelable: true},
  );

const BookingDetailAlert = (student, tutor, date, time, price, balance) =>
  price > balance
    ? Alert.alert(
        `BOOKING DETAILS: FAIL`,
        `1) Student: ${student}, tutor: ${tutor}. \n2) ${date}, ${time} \n3) Balance: ${balance}, Price: ${price}`,
        [
          {
            text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
            style: 'Cancel',
          },
        ],
        {cancelable: true},
      )
    : Alert.alert(
        `BOOKING DETAILS: `,
        `1) Student: ${student}, tutor: ${tutor}. \n2) ${date}, ${time} \n3) Balance: ${balance}, Price: ${price}`,
        [
          {
            text: 'Book',
            onPress: () => {
              console.log('Complete Book'), BookingSuccess();
            },
            style: 'Cancel',
          },
          {
            text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
            style: 'Cancel',
          },
        ],
        {cancelable: true},
      );

const BookingSuccess = () =>
  Alert.alert(
    `Booking details`,
    `Bokking success !`,
    [
      {
        text: 'Done',
        //onPress: () => alert('Complete'),
        style: 'default',
      },
      // {
      //   text: 'Cancel', //onPress: () => {alert("Cancel");console.log(123);},
      //   style: 'destructive',
      // },
    ],
    {cancelable: true},
  );

// Modal Time
const ModalTime = props => {
  //props: student, tutor, arrayDateTime, id, isVisible
  const [isModalVisibleTime, setModalVisibleTime] = useState(props.isVisible);
  const toggleModalTime = () => {
    setModalVisibleTime(!isModalVisibleTime);
  };
  onPressHandler = (student, tutor, arrayDateTime, id, time) => {
    //alert("OK nè");
    //alert(`Student ${student}, Tutor ${tutor}, Date ${props.arrayDateTime[props.id].date}, Time ${time}`)
    BookingDetailAlert(
      student,
      tutor,
      props.arrayDateTime[props.id].date,
      time,
      2,
      2,
    );
    //toggleModalTime();
    //props.setIsClick(false);
  };
  return isModalVisibleTime ? (
    <View style={{backgroundColor: 'white'}}>
      <Modal isVisible={isModalVisibleTime}>
       {/* <ScrollView> */}
        <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
          <Text
            style={{
              color: 'black',
              marginLeft: 5,
              marginBottom: 10,
              fontWeight: 'bold',
              marginTop: 5,
              fontSize: 18,
              textAlign: 'center',
            }}>
            {`Picking your time\n(${props.arrayDateTime[props.id].date})`}
          </Text>
          {props.arrayDateTime[props.id].time.map((time, index) => (
            <View style={{marginHorizontal: 80, marginBottom: 6}} key={index}>
              <Pressable
                style={{
                  borderRadius: 40,
                  backgroundColor: time.isBooked ? 'grey' : MAIN_COLOR,
                  paddingVertical: 10,
                }}
                onPress={() => {
                  if(time.isBooked == false)
                  {onPressHandler(
                    props.student,
                    props.tutor,
                    props.arrayDateTime,
                    props.id,
                    time.startEnd,
                  )}else{
         
                  }
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  {time.isBooked == true ? 'Reserved': time.startEnd}
                </Text>
              </Pressable>
            </View>
          ))}
          <View style={{alignItems: 'center', marginTop: 25}}>
            <TouchableOpacity
              style={{
                width: '50%',
                borderRadius: 40,
                backgroundColor: '#e54594',
                paddingVertical: 10,
                marginBottom: 5,
              }}
              onPress={toggleModalTime}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView> */}
      </Modal>
    </View>
  ) : (
    <View></View>
  );
};

const Booking = props => {
  const [arrayDateTime, setArrayDateTime] = useState([]);

  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleBooking, setModalVisibleBooking] = useState(false);
  const langState = useSelector(state => state.lang);

  useEffect(() => {
    let cancel = false;
    getScheduleBooking({tutorId: props.route.params.tutorId}).then(data => {

      const now = new Date().getTime();
      // console.log(data[0]);
      const schedule = data.filter(function (item) {
        const start = item.scheduleDetails[0].startPeriodTimestamp;
        //const end = item.scheduleDetails[0].endPeriodTimestamp;
        //const now = new Date().getTime();
        //const now7 = new Date(now + 7 * 24 * 60 * 60 * 1000);
        // if (now <= start && end <= now7) {
        //   return item;
        // }
        if (now <= start) {
          return item;
        }
      });

    //   let tg;
    // for(let i = 0; i < schedule.length - 1; i++){
    //     for(let j = i + 1; j < schedule.length; j++){
    //         if((schedule[i].scheduleDetails[0].startPeriodTimestamp/100000) > (schedule[j].scheduleDetails[0].endPeriodTimestamp/100000)){
    //             // Hoan vi 2 so a[i] va a[j]
    //             tg = schedule[i];
    //             schedule[i] = schedule[j];
    //             schedule[j] = tg;        
    //         }
    //     }
    // }
    // schedule.forEach(item => {
    //   console.log((new Date(item.scheduleDetails[0].startPeriodTimestamp)).toLocaleDateString().slice(0, 5))
    // })
     
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(now + i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        // console.log(day)
        let arrTime  = [];
        for(let j = 0; j < schedule.length; j ++ )
        {
          if((new Date(schedule[j].scheduleDetails[0].startPeriodTimestamp)).toISOString().slice(0, 10) == day){
            //console.log((new Date(schedule[j].scheduleDetails[0].startPeriodTimestamp)).toLocaleTimeString());
            //console.log((new Date(schedule[j].scheduleDetails[0].startPeriodTimestamp)).toISOString().slice(0, 10))
            arrTime.push({
              isBooked: schedule[j].scheduleDetails[0].isBooked,
              // startPeriodTimestamp: schedule[j].scheduleDetails[0].startPeriodTimestamp,
              // endPeriodTimestamp: schedule[j].scheduleDetails[0].endPeriodTimestamp,
              startEnd: (new Date(schedule[j].scheduleDetails[0].startPeriodTimestamp)).toLocaleTimeString().slice(0, 5) + "-" + (new Date(schedule[j].scheduleDetails[0].endPeriodTimestamp)).toLocaleTimeString().slice(0, 5)
            });
          }
        } 
        arrDate.push({
          date: day,
          time: arrTime
          // startPeriodTimestamp: schedule[j].scheduleDetails[0].startPeriodTimestamp,
          // endPeriodTimestamp: schedule[j].scheduleDetails[0].endPeriodTimestamp,
        });
      }
      // arrDate.forEach(function(item){
      //   console.log(item.date)
      //   item.time.forEach(time => console.log(time.startEnd))
      // })
      if (cancel) return;
      setArrayDateTime(arrDate);

    });
    return () => { 
      cancel = true;
    }
  }, []);

  // const arrayDateTime = [
  //   {
  //     id: 0,
  //     date: '2021-10-16',
  //     time: [
  //       '19:30 - 19:55',
  //       '20:00 - 20:25',
  //       '20:30 - 20:55',
  //       '21:00 - 21:25',
  //     ],
  //   },
  //   {
  //     id: 1,
  //     date: '2021-10-17',
  //     time: [
  //       '19:30 - 19:55',
  //       '20:00 - 20:25',
  //       '20:30 - 20:55',
  //       '21:00 - 21:25',
  //     ],
  //   },
  //   {
  //     id: 2,
  //     date: '2021-10-18',
  //     time: [
  //       '19:30 - 19:55',
  //       '20:00 - 20:25',
  //       '20:30 - 20:55',
  //       '21:00 - 21:25',
  //       '21:30 - 21:55',
  //     ],
  //   },
  //   {
  //     id: 3,
  //     date: '2021-10-20',
  //     time: [
  //       '19:30 - 19:55',
  //       '20:00 - 20:25',
  //       '20:30 - 20:55',
  //       '21:00 - 21:25',
  //     ],
  //   },
  //   {
  //     id: 4,
  //     date: '2021-10-23',
  //     time: [
  //       '19:30 - 19:55',
  //       '20:00 - 20:25',
  //       '20:30 - 20:55',
  //       '21:00 - 21:25',
  //     ],
  //   },
  //   {
  //     id: 5,
  //     date: '2021-10-24',
  //     time: [
  //       '19:30 - 19:55',
  //       '20:00 - 20:25',
  //       '20:30 - 20:55',
  //       '21:00 - 21:25',
  //     ],
  //   },
  //   {
  //     id: 6,
  //     date: '2021-10-25',
  //     time: [
  //       '19:30 - 19:55',
  //       '20:00 - 20:25',
  //       '20:30 - 20:55',
  //       '21:00 - 21:25',
  //     ],
  //   },
  // ];
  const arrayIsClick = arrayDateTime.map((v, i) => false);
  const [isClick, setIsClick] = useState(arrayIsClick);
  //console.log(isClick);

  const setIsClickHandler = value =>
    setIsClick(arrayIsClick.map((v, i) => (i === value ? false : v)));

  //console.log('Render booking');
  return (
    <View style={{marginTop: 0}}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              marginLeft: 5,
              marginBottom: 15,
              fontWeight: 'bold',
              marginTop: 15,
              fontSize: 18,
              textAlign: 'center',
            }}>
            Picking your date
          </Text>
          {arrayDateTime.length > 0 ? arrayDateTime.map((datetime, index) => (
            <View style={{marginBottom: 6, width: 120}} key={index}>
              <Pressable
                style={{
                  borderRadius: 40,
                  backgroundColor: MAIN_COLOR,
                  paddingVertical: 10,
                }}
                onPress={() =>
                  setIsClick(
                    arrayIsClick.map((v, i) => (i === index ? true : v)),
                  )
                }>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  {datetime.date}
                </Text>
              </Pressable>
              {isClick[index] == true ? (
                <ModalTime
                  setIsClick={setIsClickHandler}
                  student={'Nguyễn Minh Thông'}
                  tutor={props.route.params.name}
                  arrayDateTime={arrayDateTime}
                  id={index}
                  isVisible={true}
                />
              ) : (
                <View></View>
              )}
            </View>
          )): <View>
            <Text style={{textAlign: 'center', marginTop: 30, fontSize: 25, color: MAIN_COLOR}}>Loading...</Text>
          </View>}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 200,
    marginBottom: 30,
  },
  buttonControl: {
    width: '40%',
    left: '30%',
  },
});

export default Booking;
