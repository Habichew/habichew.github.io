import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import TopBar from '@/components/bottomBar';
import { Ionicons } from '@expo/vector-icons';
import {useUser} from "@/app/context/UserContext";
import BottomBar from "@/components/bottomBar";
import {ScaledSheet} from 'react-native-size-matters';
import {Button} from "@react-navigation/elements";
import {placeholder} from "@babel/types";

export default function PetScreen() {
  const router = useRouter();
  const { pet, loadPet, user } = useUser(); // use user data
  const [ petPostcards, setPetPostcards ] = useState([]);
  const postCardImgs = [
    {unlockScore: 50, url: "https://picsum.photos/200/300"},
    {unlockScore: 150, url: "https://picsum.photos/200/300"},
    {unlockScore: 500, url: "https://picsum.photos/200/300"},
    {unlockScore: 1000, url: "https://picsum.photos/200/300"},
    {unlockScore: 2000, url: "https://picsum.photos/200/300"},
    {unlockScore: 5000, url: "https://picsum.photos/200/300"},
    {unlockScore: 10000, url: "https://picsum.photos/200/300"},
    {unlockScore: 25000, url: "https://picsum.photos/200/300"},
    {unlockScore: 50000, url: "https://picsum.photos/200/300"}
  ]
  useState(() => {
    console.log("load user pet");
    loadPet();
    console.log('PetScreen', pet);
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Pet Postcards</Text>
      </View>

      <View style={styles.scrollContainer}>
        {/* Pet Info */}
        <View style={styles.petInfoContainer}>
          <View style={styles.petInfo}>
            <Image source={require('@/assets/images/pet profile.png')} style={styles.avatar} />
            <View style={styles.avatarDescription}>
              <Text style={styles.petName}>{pet?.name}</Text>
              <Text style={styles.personality}>{pet?.personality}</Text>
              <Text style={styles.textLine}>{pet?.hunger}</Text>
              <Text style={styles.level}>{pet?.level}</Text>
              {/*<Text style={styles.textLine}>Pet's Working Style</Text>
              <Text style={styles.textLine}>Pet's Current Planet</Text>*/}
            </View>
          </View>
        </View>

        {/*/!* Hall of Fame *!/*/}
        {/*<View style={styles.sectionBox}>*/}
        {/*  <Text style={styles.sectionTitle}>Hall of Fame</Text>*/}
        {/*  <Text style={styles.subText}>this will have all badges, from travel et</Text>*/}
        {/*  <TouchableOpacity style={styles.rowEnd} onPress={() => router.push('./(tabs)/insights')}>*/}
        {/*    <Text style={styles.linkText}>View Insights</Text>*/}
        {/*    <Ionicons name="arrow-forward" size={16} />*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}

        {/* Tip of the Day */}
        {/*<View style={styles.sectionBox}>*/}
        {/*  <Text style={styles.sectionTitle}>Tip of the day</Text>*/}
        {/*</View>*/}

        {/* Mood Tracker */}
        {/*<View style={styles.sectionBox}>*/}
        {/*  <Text style={styles.sectionTitle}>Mood Tracker</Text>*/}
        {/*  <View style={styles.grid}>*/}
        {/*    {Array.from({ length: 30 }).map((_, idx) => (*/}
        {/*        <View key={idx} style={styles.dotBox}>*/}
        {/*          <View style={styles.dot} />*/}
        {/*        </View>*/}
        {/*    ))}*/}
        {/*  </View>*/}
        {/*</View>*/}

        {/* Travel Unlock */}
        {/*<View style={styles.sectionBox}>*/}
        {/*  <Text style={styles.sectionTitle}>Unlock something by travelling</Text>*/}
        {/*  <TouchableOpacity style={styles.rowEnd} onPress={() => router.push('../Travel')}>*/}
        {/*    <Text style={styles.linkText}>Travel</Text>*/}
        {/*    <Ionicons name="arrow-forward" size={16} />*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}

        <View style={styles.postcards}>
          <Text style={styles.postcardsTitle}>Postcards</Text>
          <FlatList
              data={postCardImgs}
              renderItem={(item) => (
                  <>
                    {user?.credits !== undefined && user?.credits >= item.item.unlockScore ?
                        (
                            <Image style={styles.postcardsImg} source={{uri: item.item.url}} key={"postcard-"+item.index}></Image>
                        )
                        :
                        (<Image style={styles.postcardsImg} source={require('@/assets/images/placeholder.png')} key={"postcard-"+item.index}></Image>)
                    }
                  </>
                )
              }
              numColumns={3}
              keyExtractor={(item) => item.unlockScore.toString()}
          >
          </FlatList>
          <Button style={styles.postcardsButton} color={"black"} ><Text style={{fontWeight: "700"}}>View Habits</Text></Button>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  headerContainer: {backgroundColor: 'white', paddingTop: 20},
  title: {
    fontSize: 15,
    fontFamily: 'Poppins',
    fontWeight: '900',
    letterSpacing: 0,
    alignSelf: 'center',
    marginVertical: 8,
    marginBottom: 20
  },
  container: { flex: 1, backgroundColor: '#D7B5FC' },
  petInfoContainer: {
    width: '100%',
    height: "auto",
    backgroundColor: 'white',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingVertical: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  sectionBox: {
    backgroundColor: '#fdfdfe',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  petInfo: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 12,
    paddingHorizontal: "30@ms",
    paddingBottom: "10@ms",
  },
  avatar: {
    width: '120@ms',
    height: '120@ms',
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  textLine: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  dotBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  petName: {
    fontSize: 32,
    color: '#1CC282',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  personality: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  avatarDescription: {
    paddingHorizontal: 10
  },
  level: {
    fontSize: 15,
    fontWeight: '600',
  },
  postcards: {
    paddingTop: 50,
    paddingHorizontal: "40@ms",
  },
  postcardsTitle: {
    fontSize: 24, fontWeight: 'bold', fontFamily: "Poppins", alignSelf: "flex-start", marginBottom: 15
  },
  postcardsButton: {
    backgroundColor: '#1CC282',
    fontWeight: 'bold',
    minWidth: '175@ms',
    marginHorizontal: "auto",
    marginVertical: 30
  },
  postcardsImgs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '16@ms',
    gap: 12,
    marginHorizontal: "auto",
  },
  postcardsImg: {
    alignContent: 'center',
    maxWidth: "30%",
    margin: 8,
    marginHorizontal: "auto",
    maxHeight: 100,
    borderRadius: 12,
  }
});
