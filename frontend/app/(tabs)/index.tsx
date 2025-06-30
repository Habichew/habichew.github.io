import {Image} from 'expo-image';
import {Button, Platform, StyleSheet, TextInput} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import React from 'react';

export default function HomeScreen() {
    const [habit, onChangeHabit] = React.useState("");
    const [smlResponse,  setSmlResponse] = React.useState("");

    async function sendHabit() {
        console.log('Sending Habit...', habit);
        const url = "http://localhost:8100";
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ habit: "test habit"})
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            setSmlResponse(json[0]?.generated_text[1].content);
            console.log('sml response',  json[0]?.generated_text[1].content);
        } catch(error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome to Habichew</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Insert your habit!</ThemedText>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeHabit}
                    value={habit}
                />
                <Button onPress={() => sendHabit()} title={'Chew!'}></Button>

            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="default">Recommended tasks:</ThemedText>
                <ThemedText type="default">{smlResponse}</ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    input: {
        backgroundColor: 'rgb(238, 238, 238)',
        padding: 8,
        borderRadius: 8,
    }
});
