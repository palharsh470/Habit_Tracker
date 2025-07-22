import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ArrowLeft } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#7a2424ff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "grey",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(70, 25, 16, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};
export default function Graph() {
  const [alldaysdata, setalldaysdata] = useState([]);
  const [alldaysvalue, setalldaysvalue] = useState([]);

  const router = useRouter()
  function goindex() {
    router.back()
  }
  useEffect(function () {
    AsyncStorage.getItem('tasksdays')
      ?.then(function (response) {
        const values = JSON.parse(response);
        const daysdata = [];
        const daysvalue = [];



        values?.forEach(function (day, index) {
          let taskdone = 0;
          day?.forEach(function (elem) {
            if (elem?.iscompleted == true)
              taskdone++;
          })
          
          const percent = day.length?Number(((taskdone / day.length) * 100).toFixed(0)):0
          daysdata.push(percent);
          daysvalue.push("Day" + (index + 1));


        });

        setalldaysdata(daysdata);
        setalldaysvalue(daysvalue)


      })

  }, [])


  const data = {
    labels: alldaysvalue?alldaysvalue:"",
    datasets: [
      {
        data: alldaysdata?alldaysdata:"",
        color: (opacity = 1) => `rgba(144, 55, 244, ${opacity})`, // optional

      }
    ],
    legend: ["Growth Chart"]
  };
  return (
    <View>
      <View style={{
        marginTop: 50,
        flexDirection: "row",
        gap: 140
      }}>
        <TouchableOpacity style={{
        }} onPress={goindex}>
          <ArrowLeft size={32} />
        </TouchableOpacity>

        <Text style={{
          fontWeight: "bold",
          fontSize: 25,

        }}>Graph</Text>
      </View>
      <View style={{
        marginTop: 30
      }}>
        {alldaysdata.length > 0 &&
          <LineChart

            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />}
      </View>
    </View>
  )
}