import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, StatusBar, Image } from 'react-native';
import tailwind from 'tailwind-rn';

import axios, { AxiosResponse } from 'axios';

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [news, setNews] = useState([])

  useEffect(() => {
    StatusBar.setTranslucent(false)
    axios
      .get('https://api.rocketlaunches.ga/api/launches')
      .then((res: AxiosResponse) => {
        setLaunches(res.data.result.slice(0, 1));
      });
    axios
      .get('https://api.rocketlaunches.ga/api/news')
      .then((res: AxiosResponse) => {
        setNews(res.data.slice(0,1));
      });
  }, []);

  return (
    <>
    <StatusBar backgroundColor="#171D2D" />
    <ScrollView style={{backgroundColor: '#171D2D', alignItems: 'center'}}>
      <View>
        <Text style={ViewTitle}>Next launch</Text>
        <View style={Card}>
          {launches.map((launch: any) => (
            <>
              <Text style={CardTitle}>{launch.name}</Text>
              <Text style={CardDate}>
                {new Date(launch.sort_date * 1000).toLocaleString()}
              </Text>
              <Text style={CardText}>{launch.launch_description}</Text>
              <Text style={CardText}>
                <Text style={{ fontWeight: 'bold' }}>Vehicle:</Text>{' '}
                {launch.vehicle.name}
              </Text>
              <Text style={CardText}>
                <Text style={{ fontWeight: 'bold' }}>Weather</Text>{'\n'}
                Condition: {launch.weather_condition+'\n'}
                Temperature: {Math.ceil(launch.weather_temp)+' °F\n'}
                Wind: {launch.weather_wind_mph} Mph
              </Text>
            </>
          ))}
        </View>
        <Text style={ViewTitle}>Breaking news</Text>
        <View style={Card}>
          {news.map((article: any) => {
            return (
              <>
                <Text style={CardTitle}>{article.title}</Text>
                <Text style={CardDate}>
                  {new Date(article.publishedAt).toLocaleString()}
                </Text>
                <Image
                  source={{
                    uri: article.imageUrl
                  }}

                  style={{
                    width: '100%',
                    height: 180,
                    resizeMode: "cover",
                    borderRadius: 5
                  }}
                />
              </>
            )
          })}
        </View>
      </View>
    </ScrollView>
    </>
  );
};

export default App;

const ViewTitle = tailwind('text-white text-3xl font-medium text-center');
const Card = tailwind('border-b border-gray-400 self-start p-2 m-5');
const CardTitle = tailwind(`text-white font-normal text-left text-2xl`);
const CardDate = tailwind(`text-white font-normal text-left font-light`);
const CardText = tailwind(`text-white font-2 text-start mt-2 text-base leading-tight`);



