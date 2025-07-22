import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trash } from "phosphor-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Completedtask({ index, items, setarray, array }) {
    const [check, setcheck] = useState(true);
    function taskdone(value) {
        setcheck(!check)
        let newarray = [...array]
        newarray[value] = { ...newarray[value], iscompleted: false }
        setarray(newarray)
        AsyncStorage.getItem('tasksdays')
            .then(function (response) {
                const data = JSON.parse(response);
                data[data.length - 1] = newarray;
                AsyncStorage.setItem('tasksdays', JSON.stringify(data));
            })

    }
    function removetask(value) {

        let array1 = array?.filter(function (elem, indx) {
            if (indx == value)
                return false;
            else
                return true;
        })
       
        setarray(array1)
        AsyncStorage.getItem('tasksdays')
            .then(function (response) {
                const data = JSON.parse(response);
                data[data.length - 1] = array1;
                AsyncStorage.setItem('tasksdays', JSON.stringify(data));
            })

    }

    let result;
    const date = new Date();
    if (items?.targettime > date.getHours())
        result = "Before time"
    if (items?.targettime == date.getHours())
        result = "On time"
    if (items?.targettime < date.getHours())
        result = "Late"
    if (items?.targettime == "")
        result = ""

    return (

        <ScrollView  >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity style={{
                    height: 25,
                    aspectRatio: 1,
                    borderWidth: 3,
                    borderRadius: 100,
                    borderColor: "#AFA6E6",
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={function () {
                    taskdone(index)
                }}>
                    {check && <View style={{
                        height: 15,
                        aspectRatio: 1,
                        backgroundColor: "#AFA6E6",
                        borderRadius: 100,
                        borderColor: "grey",
                    }}></View>}
                </TouchableOpacity>
                <Text style={{ fontSize: 30, marginLeft: 5, paddingVertical: 5, fontWeight: "300" }}>{items?.title}</Text>
                <Text style={{ marginLeft: "auto", fontSize: 20, fontWeight: "bold", opacity: 0.3, marginRight: 25 }}>{result}</Text>
                <TouchableOpacity onPress={function () {
                    removetask(index)
                }}>
                    <Trash size={25} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
