import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import {React, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch('http://aurora-django-app.herokuapp.com/feed?feed_count=0')
      .then(res => res.json())
      .then(data => {
        setFeed(data.response);
        console.log(data.response);
      });
  }, []);
  return (
    <View style={styles.mainView}>
      <Text style={styles.Heading}>Colors Show</Text>
      <View style={styles.TextInputView}>
        <TextInput
          value={searchInput}
          onChangeText={search => setEmail(search)}
          placeholder={'Search a song or Artsist'}
          placeholderTextColor={'#000 '}
          style={styles.TextInput}
        />
      </View>
      <View style={styles.mainPostView}>
        {feed.lenth < 1 ? (
          <ActivityIndicator size={'large'} color={'blue'} />
        ) : (
          <FlatList
            data={feed}
            keyExtractor={(item, index) => {
              return item.post_id.toFixed();
            }}
            renderItem={({item, index}) => (
              <View style={styles.PostView}>
                <View style={styles.PostTitle}>
                  <View style={styles.ImageView}>
                    <Image
                      style={styles.ArtistPhoto}
                      source={{uri: item.artist_photo}}
                    />
                    <View style={styles.TitleView}>
                      <Text style={styles.ArtistName}>{item.post_artist}</Text>
                      <Text style={styles.ArtistTitle}>{item.post_title}</Text>
                    </View>
                  </View>
                  <View>
                    <Icon
                    name="options-vertical"
                    color="#989898"
                    />
                  </View>
                </View>
                <Image style={styles.coverPhoto} source={{uri:item.cover_poto}}/>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // marginTop: 40,
    flex: 1,
    
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:"gray"
  },
  Heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
    marginLeft: 15,
  },
  TextInput: {
    height: 44,
    width: '90%',
    backgroundColor: '#EBEBEB',
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 10,
    
  },
  TextInputView: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20
  },
  mainPostView: {
    width: '100%',
    marginBottom:200
    //  display: 'flex',
    //  alignItems:"center"
    // flexDirection:'row',
  },
  PostView: {
    width: '90%',
    alignItems: 'center',
    marginTop: 30,
  },
  PostTitle: {
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems:"center"
  },
  ArtistPhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  ImageView: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent:"space-between",
     alignItems:"center",
  },
  ArtistName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ArtistTitle: {
    fontSize: 11,
    color: '#989898',
  },
  TitleView:{
    marginLeft:15,

  },
  coverPhoto:{
    width:"90%",
    height:200,
    backgroundColor:'rgba(0,0,0,0.06)',
    marginTop: 20, 
    borderRadius:10,
    marginLeft: 35,


  }
});
export default Home;
