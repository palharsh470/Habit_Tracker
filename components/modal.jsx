import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Modalview({ showmodal, handletask, task, addtask, openmodal, handletime, time }) {
    return (
        <Modal visible={showmodal} transparent={true}>
            <View style={{
                width: "70%",
                height: "50%",
                backgroundColor: "white",
                margin: "auto",
                borderRadius : 10,
                padding: 5
            }}>
                <TouchableOpacity onPress={openmodal} style={{
                    alignItems: "flex-end",
                   
                }}>
                    <Text style={{
                        fontSize: 20,
                        margin: 5
                    }}>❌</Text>
                </TouchableOpacity>
                <TextInput style={{
                    margin: 10,
                    borderRadius: 10,
                    borderWidth: 2
                }} placeholder="Add your task..." value={task} onChangeText={handletask} />
                <TextInput style={{
                    margin: 10,
                    borderRadius: 10,
                    borderWidth: 2
                }} placeholder="Add time..." value={time} onChangeText={handletime} />

                <TouchableOpacity style={{
                    width: 70,
                    height: 30,
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: "auto",
                    borderRadius: 10
                }} onPress={addtask}
                ><Text style={{
                    fontSize: 15
                }}>Submit</Text></TouchableOpacity>
            </View>
        </Modal>
    )
}