import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Completedtask from "../components/completed_task";
import CustomDate from "../components/date_time";
import Modalview from "../components/modal";
import NotCompletedtask from "../components/notcompleted_task";
export default function Homepage() {
    const router = useRouter()
    const [showmodal, setshowmodal] = useState(false)
    const [tasksarray, settasksarray] = useState([

    ])

    function opengraph() {
        router.push('/graph')
    }
    function openmodal() {
        setshowmodal(!showmodal)
    }

    const [task, settask] = useState("")
    function handletask(response) {
        settask(response)
    }


    const [time, settime] = useState("")
    function handletime(value) {
        settime(value)
    }




    function addtask() {
        if (task.trim().length == 0) {
            Alert.alert("Task is not empty");
            return
        }
        if (!(time.trim() < 24 && time.trim() > 0) || time.trim() == "") {
            Alert.alert("Wrong time");
            return
        }
        let newarray = [...tasksarray];
        newarray.push({
            title: task.trim(),
            iscompleted: false,
            targettime: time.trim()
        });
        settasksarray(newarray);

        AsyncStorage.getItem('tasksdays')
            .then(function (response) {
                const data = JSON.parse(response);
                data[data.length - 1] = newarray;
                AsyncStorage.setItem('tasksdays', JSON.stringify(data));
            })

        settask("");
        settime("");

    }

    useEffect(function () {
        AsyncStorage.getItem('tasksdays')
            .then(function (response) {
                if (response != null) {
                    const data = JSON.parse(response);
                    settasksarray(data[data.length - 1]);
                } else {
                    const arr = [[]];
                    AsyncStorage.setItem('tasksdays', JSON.stringify(arr))
                }
            })
    }, [])


    function newday() {
        const nextday = [...tasksarray];
        const temparr = [...nextday];
        AsyncStorage.getItem('tasksdays')
            .then(function (response) {
                const data = JSON.parse(response);
                data[data.length - 1] = temparr;
                AsyncStorage.setItem('tasksdays', JSON.stringify(data));
            })
        nextday.forEach(function (elem) {
            elem.iscompleted = false;
        });
        settasksarray(nextday);
        AsyncStorage.getItem('tasksdays')
            .then(function (response) {
                const data = JSON.parse(response);
                data.push(nextday);
                AsyncStorage.setItem('tasksdays', JSON.stringify(data));

            })
    }



    let remaining = 0
    let notremaining = 0

    tasksarray?.filter(function (item, index) {
        if (item?.iscompleted)
            notremaining += 1
        else
            remaining += 1
    })

    let l = tasksarray.length
    if (tasksarray.length == 0)
        l = 1

    let percentage = (notremaining / l) * 100
    let colorchange = "white"

    let quotes
    if (percentage == 0) {
        quotes = "Ignite 💪",
            colorchange = "#FF4C4C"
    }
    else if (percentage <= 25) {
        colorchange = "#FF4C4C"
        quotes = "Keep Going 😊"
    }
    else if (percentage <= 50) {
        colorchange = "#FFA500"
        quotes = "Stay Strong 🔥"
    }
    else if (percentage <= 75) {
        colorchange = "#C3E000"
        quotes = "Almost There 👍"
    }
    else if (percentage <= 100) {
        colorchange = "#4CAF50"
        quotes = "Congratulations 🎉"
    }


    return (

        <View>

            <View style={{
                padding: 20,
                height: "100%",
                backgroundColor: "#dbd7e6"
            }}>
                {
                    <Text style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginVertical: 10,
                        marginTop: 30
                    }}>{quotes}</Text>
                }

                <CustomDate></CustomDate>

                {(remaining || notremaining) ?
                    (<View style={{
                        height: 25,
                        borderWidth: 2,
                        borderRadius: 100,
                        marginTop: 50,
                        marginBottom: 15,
                        overflow: "hidden"
                    }}>


                        <View style={{
                            width: `${percentage}%`,
                            height: "100%",
                            borderRadius: 100,
                            backgroundColor: `${colorchange}`
                        }}>
                            <View style={{
                                height: "90%",
                                aspectRatio: 1,
                                backgroundColor: "white",
                                position: "absolute",
                                right: 3,
                                borderRadius: 100,
                                top: "5%"
                            }}>

                            </View>
                        </View>


                    </View>) : null

                }
                {(remaining || notremaining) ?
                    (<View style={{
                        alignItems: "flex-end",
                    }}>
                        <Text>{percentage}% completed</Text>
                    </View>) : null
                }
                {
                    (!remaining && !notremaining) ?
                        (<View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: "70%",
                            marginHorizontal: 50
                        }}>
                            <Text style={{ fontSize: 32, textAlign: "center", fontStyle: "italic" }}>Success doesn't come from what you do occasionally, it comes from what you do consistently."</Text>
                        </View>) : null
                }

   {remaining ?
                    (<Text style={{ fontSize: 20 }}>Not Completed tasks</Text>) : null}
                {
                    remaining ? (
                        <View style={{
                            maxHeight:300
                        }}>

                        <ScrollView style={{
                            backgroundColor: "white",
                            padding: "10",
                            marginVertical: "20",
                            borderRadius: 40,
                        
                        }}>
                            {
                                tasksarray?.map(function (item, index) {
                                    if (!item?.iscompleted)
                                        return <NotCompletedtask index={index} key={index} items={item} setarray={settasksarray} array={tasksarray} ></NotCompletedtask>
                                    
                                })
                            }
                        </ScrollView>
                                </View>

                    ) : null
                }

                {notremaining ?
                    (<Text style={{ fontSize: 20 }}>Completed tasks</Text>) : null}
                {
                    notremaining ?
                        (
                            
                            <ScrollView style={{
                                padding: "10",
                                marginVertical: "20",
                                borderRadius: 10,
                                marginBottom:90
                            }}>
                                {
                                    tasksarray?.map(function (item, index) {
                                        if (item?.iscompleted)
                                            return <Completedtask key={index} index={index} items={item} setarray={settasksarray} array={tasksarray}></Completedtask>
                                    })
                                }
                            </ScrollView>
                            

                        ) : null
                }

                <TouchableOpacity onPress={openmodal}
                    style={{
                        height: 80,
                        aspectRatio: 1,
                        backgroundColor: "#AFA6E6",
                        position: "absolute",
                        borderRadius: 100,
                        bottom: 20,
                        left: "51%",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: [{
                            translateX: -20
                        }]
                    }}>
                    <Text style={{
                        fontSize: 44,
                        color: "white"
                    }}>+</Text>

                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: "#AFA6E6",
                    position: "absolute",
                    borderRadius: 10,
                    bottom: 40,
                    right: "5%",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10
                }} onPress={newday}>
                    <Text style={{
                        fontWeight: "bold",
                        color: "white"
                    }}>Start new day  🗓️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: "#AFA6E6",
                    position: "absolute",
                    borderRadius: 10,
                    bottom: 40,
                    left: "5%",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10
                }} onPress={opengraph}>
                    <Text style={{
                        fontWeight: "bold",
                        color: "white"
                    }}>Progress Graph 📊</Text>
                </TouchableOpacity>

                <Modalview showmodal={showmodal} handletask={handletask} task={task} addtask={addtask} openmodal={openmodal} handletime={handletime} time={time}
                />
            </View>
        </View>
    )
}