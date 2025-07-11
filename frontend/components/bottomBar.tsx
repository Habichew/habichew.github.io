import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

export default function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (name: string) => pathname.includes(name);

  return (
    <View style={styles.container}>
{/* left buttons */}
      <View style={styles.sideGroup}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/pet')}>
          <Image
            source={require('@/assets/images/home.png')}
            style={[styles.icon, isActive('/Pet') && styles.activeIcon]}
          />
          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/Tasks')}>
          <Image
            source={require('@/assets/images/tasks.png')}
            style={[styles.icon, isActive('/Tasks') && styles.activeIcon]}
          />
          <Text style={styles.label}>Tasks</Text>
        </TouchableOpacity>
      </View>
      
      {/* middle cat */}
      <TouchableOpacity style={styles.centerIconContainer} onPress={() => router.push('/pet')}>
        <Image
          source={require('@/assets/images/catWhiteCircle.png')}
          style={styles.centerIcon}
        />
      </TouchableOpacity>


      <View style={styles.sideGroup}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
          <Image
            source={require('@/assets/images/travel.png')}
            style={[styles.icon, isActive('/Explore') && styles.activeIcon]}
          />
          <Text style={styles.label}>Travel</Text>
        </TouchableOpacity>
{/* right buttons */}
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
          <Image
            source={require('@/assets/images/profile.png')}
            style={[styles.icon, isActive('/Profile') && styles.activeIcon]}
          />
          <Text style={styles.label}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
    backgroundColor: '#ECECEC',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  sideGroup: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    opacity: 0.6,
  },
  activeIcon: {
    opacity: 1,
  },
  label: {
    fontSize: 12,
    color: '#000',
    marginTop: 4,
  },
  centerIconContainer: {
    position: 'absolute',
    top: -34,
    left: '50%',
    transform: [{ translateX: -34 }],
    backgroundColor: '#ECECEC',
    borderRadius: 50,
    padding: 6,
    elevation: 6,
  },
  centerIcon: {
    width: 68,
    height: 68,
    resizeMode: 'contain',
  },
});
