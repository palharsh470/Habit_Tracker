import AsyncStorage from "@react-native-async-storage/async-storage";
import { Article } from "phosphor-react-native";
import { useState } from "react";
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function NotCompletedtask({ index, items, setarray, array }) {
    const [updatetask,setupdatetask]=useState()
    const [updatetime,setupdatetime]=useState()
    const [check, setcheck] = useState(false);
    function handleupdatetask(data){
        setupdatetask(data)
    }
    function handleupdatetime(data){
        setupdatetime(data)
    }
    function taskdone(value) {

        setcheck(!check)
        let newarray = [...array]
        newarray[value] = { ...newarray[value], iscompleted: true }
        setarray(newarray)
        AsyncStorage.getItem('tasksdays')
            .then(function (response) {
                const data = JSON.parse(response);
                data[data.length - 1] = newarray;
                AsyncStorage.setItem('tasksdays', JSON.stringify(data));
            })
    }
    const [showmodal,setshowmodal]=useState(false);
    function openmodal(value) {
      setshowmodal(true)
      
     setupdatetask(array[value]?.title)
     setupdatetime(array[value]?.targettime)

    }
    function updatetitle(i){
         let newarray=[...array]
         newarray[i]={...array[i], title : updatetask , targettime : updatetime}
        setarray(newarray)
        AsyncStorage.getItem('tasksdays')
            .then(function (response) {
                const data = JSON.parse(response);
                data[data.length - 1] = newarray;
                AsyncStorage.setItem('tasksdays', JSON.stringify(data));
            })
        setshowmodal(false)
    }

    function close(){
        setshowmodal(false)
    }
    return (
        <ScrollView key={index}>
            <View style={{ padding: 5, flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity style={{
                    height: 30,
                    aspectRatio: 1,
                    borderWidth: 3,
                    borderRadius: 100,
                    borderColor: "#dbd7e6",
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={function () {
                    taskdone(index);
                }}>
                    {check && <View style={{
                        height: 15,
                        aspectRatio: 1,
                        backgroundColor: "#AFA6E6",
                        borderRadius: 100,
                        borderColor: "grey"
                    }}></View>}
                </TouchableOpacity>
                <Text style={{ fontSize: 30, marginLeft: 5, fontWeight: "300" }}>{items?.title}</Text>
                <Text style={{ marginLeft: "auto", fontSize: 20, fontWeight: "bold", opacity: 0.3, marginRight: 25 }}>{items?.targettime}:00</Text>
                <TouchableOpacity onPress={function (){
                    openmodal(index)
                }} >
                    <Article size={25} />
                </TouchableOpacity>
           <Modal visible={showmodal} transparent={true}>
            <View style={{
                height : 200,
                width : "70%",
                borderWidth : 2,
                borderRadius : 10,
                margin : "auto",
                backgroundColor : "lightgrey",
                padding : 10,
                alignItems : "center",
            }}>
                <TouchableOpacity onPress={close}>

                <Text style={{
                    marginLeft : 245
                }}>❌</Text>
                </TouchableOpacity>
             <TextInput style={{
                width : "100%",
                height : 50,
                borderRadius : 10,
                margin : 5,
                borderWidth : 2 ,
             }} value={updatetask} placeholder="Update Task..." onChangeText={handleupdatetask}></TextInput>
             <TextInput style={{
                width : "100%",
                height : 50,
                borderRadius : 10,
                borderWidth : 2 ,
             }} value={updatetime} placeholder="Update Time..." onChangeText={handleupdatetime}></TextInput>
             <TouchableOpacity style={{
                backgroundColor : "grey",
                margin : 10,
                padding : 5,
                borderRadius : 10
             }} onPress={function (){
                updatetitle(index)
             }}><Text style={{
                fontSize : 20
             }}>Update</Text></TouchableOpacity>
            </View>
           </Modal>
            </View>
            <View style={{
                borderWidth: 0.5,
                borderColor: "grey",
                opacity: 0.4,
                marginVertical: 10,
                marginHorizontal: 10
            }}></View>
        </ScrollView>
    )
}
