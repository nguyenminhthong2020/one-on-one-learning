/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native';
import {BASE_URL, MAIN_COLOR} from '../../../../../globals/constant';
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {useDispatch, useSelector} from 'react-redux';
import {getScheduleBooking} from '../../../../../api/booking/bookingApi';

const BookingDetailAlert = (student, name, tutor, date, time, price, balance) =>
  price > balance
    ? Alert.alert(
        `BOOKING DETAILS: FAIL`,
        `1. Student: ${name}\n2. Tutor: ${tutor}\n3. ${date} (${time})\n4. Balance: You have ${balance} lessons left\n5. Price: ${price}`,
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
        `1. Student: ${name}\n2. Tutor: ${tutor}\n3.. ${date} (${time})\n4. Balance: You have ${balance} lessons left\n5. Price: ${price}`,
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

const Booking = props => {
  const current = useSelector(state => state.auth.current);

  const [arrayDateTime, setArrayDateTime] = useState([]);

  // const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  // const langState = useSelector(state => state.lang);

  useEffect(() => {
    let cancel = false;
    getScheduleBooking({tutorId: props.route.params.tutorId, accessToken: current.tokens.access.token}).then(data => {
      const now = new Date().getTime();
      const schedule = data.filter(function (item) {
        const start = item.scheduleDetails[0].startPeriodTimestamp;
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
      for (let i = 1; i <= 7; i++) {
        let day;
          day = new Date(now + i * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10);
        let arrTime = [];
        for (let j = 0; j < schedule.length; j++) {
          if (
            new Date(schedule[j].scheduleDetails[0].startPeriodTimestamp)
              .toISOString()
              .slice(0, 10) == day
          ) {
            // console.log(new Date(schedule[j].scheduleDetails[0].startPeriodTimestamp)
            // .toISOString()
            // .slice(0, 10))
            let check = false;
            if (schedule[j].scheduleDetails[0].bookingInfo.length > 0) {
              if (
                schedule[j].scheduleDetails[0].bookingInfo[0].userId ==
                '37264873-797b-473d-bf4c-fb017fec076f'
              ) {
                check = true;
              }
            }
            arrTime.push({
              isBooked: schedule[j].scheduleDetails[0].isBooked,
              isBookedByMe: check,
              // startPeriodTimestamp: schedule[j].scheduleDetails[0].startPeriodTimestamp,
              // endPeriodTimestamp: schedule[j].scheduleDetails[0].endPeriodTimestamp,
              startEnd:
                new Date(schedule[j].scheduleDetails[0].startPeriodTimestamp)
                  .toLocaleTimeString()
                  .slice(0, 5) +
                '-' +
                new Date(schedule[j].scheduleDetails[0].endPeriodTimestamp)
                  .toLocaleTimeString()
                  .slice(0, 5),
            });
          }
        }
        arrDate.push({
          date: day,
          time: arrTime,
          // startPeriodTimestamp: schedule[j].scheduleDetails[0].startPeriodTimestamp,
          // endPeriodTimestamp: schedule[j].scheduleDetails[0].endPeriodTimestamp,
        });
      }
      if (cancel) return;
        setArrayDateTime(arrDate);
    });
    return () => {
      cancel = true;
    };
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

  const setIsClickHandler = value =>
    setIsClick(arrayIsClick.map((v, i) => (i === value ? false : v)));

  // Modal Time
  const ModalTime = props => {
    //props: student, tutor, arrayDateTime, id, isVisible
    const [isModalVisibleTime, setModalVisibleTime] = useState(props.isVisible);
    
    // const [dataModalChild, setDataModalChild] = useState(
    //   {
    //     isVisible: false,
    //   }
    // )

    const toggleModalTime = () => {
      setModalVisibleTime(!isModalVisibleTime);
    };
    onPressHandler = (student, name, tutor, arrayDateTime, id, time) => {
      //alert(`Student ${student}, Tutor ${tutor}, Date ${props.arrayDateTime[props.id].date}, Time ${time}`)
      BookingDetailAlert(
        student,
        name,
        tutor,
        props.arrayDateTime[props.id].date,
        time,
        props.price,
        props.balance,
      );
    };
    

    return isModalVisibleTime ? (
      <View style={{backgroundColor: 'white'}}>
        <Modal isVisible={isModalVisibleTime}>
          <View
            style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View></View>
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
              <EvilIcons
                name={'close'}
                size={32}
                color={'gray'}
                style={{marginTop: 5, marginRight: 5}}
                onPress={toggleModalTime}
              />
            </View>

            <ScrollView showsHorizontalScrollIndicator={true}>
              {props.arrayDateTime[props.id].time.sort((x, y) => x.startEnd.localeCompare(y.startEnd)).map((time, index) => (
                <View
                  style={{marginBottom: 7, marginHorizontal: 100}}
                  key={index}>
                  <Pressable
                    style={{
                      borderRadius: 40,
                      backgroundColor:
                        time.isBooked == true
                          ? time.isBookedByMe
                            ? 'rgb(46, 204, 113)'
                            : 'grey'
                          : MAIN_COLOR,
                      paddingVertical: 5,
                    }}
                    onPress={() => {
                      if (time.isBooked == false) {
                        onPressHandler(
                          props.student,
                          props.name,
                          props.tutor,
                          props.arrayDateTime,
                          props.id,
                          time.startEnd,
                        );
                      } else {
                      }
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 16,
                      }}>
                      {time.isBooked == true && time.isBookedByMe == false
                        ? 'Reserved'
                        : time.startEnd}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
            {/* <View style={{alignItems: 'center', marginTop: 25}}>
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
              </View> */}
          </View>
        </Modal>
      </View>
    ) : (
      <View></View>
    );
  };

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
          {arrayDateTime.length > 0 ? (
            arrayDateTime.map((datetime, index) => (
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
                    name={current.user.name}
                    balance={current.user.walletInfo.amount / 100000}
                    price={props.route.params.priceBalance.price}
                    balance={props.route.params.priceBalance.balance}
                    tutor={props.route.params.name}
                    arrayDateTime={arrayDateTime}
                    id={index}
                    isVisible={true}
                  />
                ) : (
                  <View></View>
                )}
              </View>
            ))
          ) : (
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 30,
                  fontSize: 25,
                  color: MAIN_COLOR,
                }}>
                Loading...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Booking;
