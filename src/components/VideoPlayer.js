import React, { useState,useEffect } from "react";
import { ActivityIndicator } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { View, TouchableOpacity } from "react-native";
import Video from "react-native-video";
function VideoPlayer({ video, }) {
  const [isPlay, setPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [link,setLink]=useState(video.link)
  useEffect(() => {
    if (video) {
      const timer = setTimeout(() => {
        setPlay(true)
      }, 100);
     
    }
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={() => setPlay(!isPlay)}>
        <Video
          onBuffer={({ isBuffering }) => {
            setLoading(isBuffering);
          }}
          playInBackground={false}
          paused={isPlay}
          resizeMode={"contain"}
          repeat
          source={{uri:link}}
          style={{ width: "100%", height: 250, borderRadius: 8 }}
        />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator
          style={{
            position: "absolute",
            bottom: "40%",
            alignSelf: "center",
            padding: 15,
          }}
          color="#24bdaf"
          size={"large"}
        />
      ) : (
        isPlay && (
          <TouchableOpacity
            onPress={() => setPlay(!isPlay)}
            style={{
              position: "absolute",
              bottom: "40%",
              alignSelf: "center",
              backgroundColor: "white",
              padding: 15,
              borderRadius: 200,
            }}
          >
            <Entypo name={"controller-play"} size={45} />
          </TouchableOpacity>
        )
      )}
    </View>
  );
}
export default VideoPlayer;
