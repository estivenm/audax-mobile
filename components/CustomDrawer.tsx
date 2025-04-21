import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const handleLogout = () => {
  Alert.alert('Log out', 'Are you sure you want to log out?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Log out',
      style: 'destructive',
      onPress: () => {
        router.replace('/auth/login');
      },
    },
  ]);
};

export default function CustomDrawer() {
  const activeColor = '#FDB813';
  const inactiveColor = '#333';
  const bgColor = '#fff';

  return (
    <Drawer
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#FDB813',
        drawerActiveBackgroundColor: '#FFF5E5',
        drawerActiveTintColor: activeColor,
        drawerInactiveTintColor: inactiveColor,
        drawerStyle: { backgroundColor: bgColor },
        drawerLabelStyle: { marginLeft: -10, fontSize: 15 },
        drawerType: 'slide',
        swipeEnabled: true,
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
          <View style={styles.userHeader}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?u=user' }}
              style={styles.avatar}
            />
            <Text style={styles.username}>Hello, User!</Text>
          </View>

          <DrawerItemList {...props} />

          <View style={styles.separator} />
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={18}
              color={inactiveColor}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.logoutText, { color: inactiveColor }]}>Log out</Text>
          </Pressable>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="dashboardScreen"
        options={{
          title: 'Home',
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={18}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={18}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  userHeader: {
    padding: 20,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 'auto',
  },
  logoutText: {
    fontSize: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
    marginTop: 8,
  },
});
