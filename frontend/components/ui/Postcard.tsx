import React, {useContext, useRef, useState} from 'react';
import { useRouter } from 'expo-router';
import { Text } from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {Animated, Dimensions, Image, View} from 'react-native';

type PostcardProps = {
    title: string;
    unlockScore: number;
    story: string;
    img: NodeRequire;
    cardsPanResponder: any;
    cardsPan: any;
    viewStyle: any;
};

export default function Postcard(props: PostcardProps) {
    const router = useRouter();
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;


    useState(() => {

    });

    return (
        <Animated.View style={[styles.postcard, props.viewStyle]} {...props.cardsPanResponder?.panHandlers}>
            <View style={styles.cardHeader}>
                <View style={styles.cardTitle}>{props.title}</View>
                <Text style={styles.score}>{props.unlockScore}</Text>
                <Image style={styles.postcardImg} source={props.img}></Image>
                <View style={styles.cardContent}>
                    <Text style={styles.story}>{props.story}</Text>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = ScaledSheet.create({
    postcard: { position: 'absolute', marginVertical: -500, backgroundColor: 'white',  borderRadius: 20},
    cardHeader: {},
    cardTitle: {},
    story: {color: 'black', fontSize: 16, height: 100},
    cardBody: {height: 100, padding: 10},
    cardContent: {height: 100},
    score: {},
    postcardImg: {objectFit: "cover", maxWidth: "100%", maxHeight: 400},
});

