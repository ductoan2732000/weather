import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
export default function App() {
  interface Data {
    location: {
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
      tz_id: string;
      localtime_epoch: number;
      localtime: string;
    };
    current: {
      last_updated_epoch: number;
      last_updated: string;
      temp_c: number;
      temp_f: number;
      is_day: number;
      condition: any;
      wind_mph: number;
      wind_kph: number;
      wind_degree: number;
      wind_dir: string;
      pressure_mb: number;
      pressure_in: number;
      precip_mm: number;
      precip_in: number;
      humidity: number;
      cloud: number;
      feelslike_c: number;
      feelslike_f: number;
      vis_km: number;
      vis_miles: number;
      uv: number;
      gust_mph: number;
      gust_kph: number;
      air_quality: {
        co: number;
        no2: number;
        o3: number;
        so2: number;
        pm2_5: number;
        pm10: number;
        "us-epa-index"?: number;
        "gb-defra-index"?: number;
      };
    };
  }
  const [dataWether, setDataWether] = useState({
    location: {
      name: "",
      region: "",
      country: "",
      lat: 0,
      lon: 0,
      tz_id: "",
      localtime_epoch: 0,
      localtime: "",
    },
    current: {
      last_updated_epoch: 0,
      last_updated: "",
      temp_c: 0,
      temp_f: 0,
      is_day: 0,
      condition: {
        text: "",
        icon: "",
        code: 0,
      },
      wind_mph: 0,
      wind_kph: 0,
      wind_degree: 0,
      wind_dir: "",
      pressure_mb: 0,
      pressure_in: 0,
      precip_mm: 0,
      precip_in: 0,
      humidity: 0,
      cloud: 0,
      feelslike_c: 0,
      feelslike_f: 0,
      vis_km: 0,
      vis_miles: 0,
      uv: 0,
      gust_mph: 0,
      gust_kph: 0,
      air_quality: {
        co: 0,
        no2: 0,
        o3: 0,
        so2: 0,
        pm2_5: 0,
        pm10: 0,
        "us-epa-index": 0,
        "gb-defra-index": 0,
      },
    },
  });
  const getDay = () => {
    let day = "";
    if (dataWether.current.is_day === 1) {
      day = "Chủ nhật";
    } else if (dataWether.current.is_day === 0) {
      day = "Thứ 7";
    } else {
      day = `Thứ ${dataWether.current.is_day}`;
    }
    return day;
  };
  React.useEffect(() => {
    axios
      .get(
        "https://api.weatherapi.com/v1/current.json?key=17bc6b7b0ac14c7aa5361629221404&q=Hanoi&aqi=yes"
      )
      .then((response: any) => {
        setDataWether(response.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text style={styles.text}>
            {dataWether.location.name + " - " + dataWether.location.country}
          </Text>
          <Text style={styles.location}>{getDay()}</Text>
          <Text style={styles.location}>{dataWether.location.localtime}</Text>
        </View>
        <View style={styles.body}>
          <Image
            style={styles.imageDetail}
            source={{
              uri: dataWether.current.condition.icon
                ? "https:" + dataWether.current.condition.icon
                : "",
            }}
          />
          <Text style={styles.tempeture}>
            {dataWether.current.temp_c + "°C"}
          </Text>
          <Text style={styles.status}>{dataWether.current.condition.text}</Text>
        </View>
        <View style={styles.footer}></View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 28,
  },
  location: {
    color: "#fff",
    fontSize: 15,
  },
  imageDetail: {
    width: 150,
    height: 150,
  },
  tempeture: {
    color: "#fff",
    fontSize: 40,
  },
  status: {
    color: "#fff",
    fontSize: 40,
  },
  body: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
  },
});
