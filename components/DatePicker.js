import React, {useState} from 'react';
import {View, Button,Text, Platform,TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = () => {
  const [date, setDate] = useState();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
      
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <TouchableOpacity  onPress={showDatepicker}>
    <View>
        
      <View>

          <Text style={{marginLeft:60,color:'#FFFFFF'}}>
           DOB: {date.toDateString()}
          </Text>
       
      </View>
     
      {show && (
        <DateTimePicker
          testID="DOB"
          value={date}
          timeZoneOffsetInMinutes={0}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />

      )}
     
      
        
    </View>
    </TouchableOpacity>
   
    
  );
};


export default DatePicker;