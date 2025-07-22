import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function AddTaskModal({ modalOpen, setModalOpen, setTasks, tasks }) 
{
    const [title,setTitle]=useState("");
function close(){
    setModalOpen(false)
}

function submit(){
if(!title.trim()) return;
setTasks(function(prev){
    const newArray=[...prev];
    newArray.push({
        title:title,
        isCompleted:false
    })
           AsyncStorage.getItem("habitData")
    .then(function(data){
      const habitDatavalue=JSON.parse(data);
      habitDatavalue[habitDatavalue.length-1]=newArray;
          
      AsyncStorage.setItem("habitData",JSON.stringify(habitDatavalue))
  })
    return newArray
})
    
    setTitle("")
    close()
}
function onChange(value){
    setTitle(value)
}
   
    return(
        <Modal visible={modalOpen}transparent={true}
     >
            <View style={{height:300,width:300,borderWidth:1,margin:'auto',backgroundColor:'lightpink',
                borderRadius:7
            }} >
<TextInput placeholder='Enter Task'value={title}style={{height:50,backgroundColor:"lightgray",borderRadius:7}}
onChangeText={onChange}></TextInput>
<View style={{flexDirection:'row',gap:45,margin:'auto'}}>
<TouchableOpacity onPress={submit}>
    <View style={{backgroundColor:'aqua'}}>
    <Text style={{fontSize:20,borderWidth:2}}>Submit</Text>
    </View>
</TouchableOpacity>
<TouchableOpacity onPress={close}>
    <View style={{backgroundColor:'red'}}>
    <Text style={{fontSize:20,borderWidth:2}}>Close</Text>
    </View>
</TouchableOpacity>
</View>

            </View>

        </Modal>
    )
}