// /* eslint-disable */

// import React, {useState, useCallback} from 'react';
// import {Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
// //import { TouchableOpacity } from 'react-native-gesture-handler';

// //let store = new Set();

// function Counter(props) {
//   console.log(`13:06, ${props.title}`);
//   const [count, setCount] = useState(props.startcount);
//   const increase = () => setCount(count + 1);
//   const decrease = () => setCount(count - 1);

//   return (
//     <View>
//       <Text>
//         {props.title}: {count}
//       </Text>
//       <View style={{width: 100, height: 50, marginBottom: 20}}>
//         <Button onPress={increase} title="+"></Button>
//       </View>
//       <View style={{width: 100, height: 50, marginBottom: 20}}>
//         <Button onPress={decrease} title="-"></Button>
//       </View>
//     </View>
//   );
// }

// function InputText(props)
// {
//   console.log("13:06, TextInput");
//   const [text, setText] = useState("");
//    return (
//      <View style={{marginTop: 30, borderWidth: 1}}>
//          <TextInput value={text} onChangeText={(value)=>setText(value)}></TextInput>
//      </View>
//    )
// }

// const TestCounter = () => {
//   console.log('13:06, Anh cả');
//   function hamF(x){
//     return x;
//   }
//   return (
//     <View>
//       <Counter startcount={9} title={'Số 9'} />
//       <Counter startcount={2021} title={'Số 2021'} />
//       <InputText hamF={hamF}/>
//       <View style={{borderWidth: 1, borderRadius: 1, left: '30%', width: '40%', borderColor: 'blue'}}>
//         <TouchableOpacity onPress={()=>alert(`counter9: , counter2021:`)}>
//           <Text>Submit</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default TestCounter;
