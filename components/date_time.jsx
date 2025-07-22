import { Text, View } from "react-native";
import { months, weekDays } from "../components/weekdays";
export default function CustomDate() {
    const now = new Date();
    const date = now.getDate();
    const day = weekDays[now.getDay()];
    const month = months[now.getMonth()];

    let suffix = "th";
    if (date % 10 == 1)
        suffix = "st"
    if (date % 10 == 2)
        suffix = "nd"
    if (date % 10 == 3)
        suffix = "rd"
    
    return (
        <View style={{ marginTop: 15 }}>
            <View style={{
                flexDirection: "row",
                gap: 10
            }}>
                <Text style={{
                    fontSize: 36
                }}>{date}{suffix}</Text>

                <Text style={{
                    fontSize: 36
                }}>{month}</Text>

            </View>
            <Text>{day}</Text>

        </View>
    )
}