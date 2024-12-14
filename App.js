import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Camera } from 'expo-camera'; // For Expo


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEwzIWtgHQo8LKgfoTqLbAR0V0agLU2u4",
  authDomain: "smartfit-dd9e3.firebaseapp.com",
  projectId: "smartfit-dd9e3",
  storageBucket: "smartfit-dd9e3.firebasestorage.app",
  messagingSenderId: "619589737035",
  appId: "1:619589737035:web:9d721f39d94acbcc400bce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/Onboarding.png')} // Correct path to your image
          style={styles.homeImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.homeTitle}>Where Smart Meets Fit</Text>
        <Text style={styles.homeDescription}>
          You will have everything you need to reach your personal fitness goals - for free!
        </Text>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.homeButtonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WorkoutHomepage = ({ route }) => {
  const { userName } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleCameraPress = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setCameraOpen(true);
    } else {
      alert('Camera access denied');
    }
  };

  if (cameraOpen) {
    return (
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 5,
              alignSelf: 'center',
            }}
            onPress={() => setCameraOpen(false)}
          >
            <Text style={{ color: '#000' }}>Close Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  const recommendationClasses = [
    { id: '1', title: 'Squats', instructor: 'With Diego Espiritu' },
    { id: '2', title: 'Overhead Dumbell Press', instructor: 'With Jozette Fermin' },
    { id: '3', title: 'Deadlift', instructor: 'With Nil San Gabriel' },
    { id: '4', title: 'Dumbbell Lateral Raise', instructor: 'With Kurt Torres' },
  ];

  return (
    <View style={styles.workoutContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {userName}</Text>
        <Image source={require('./assets/Proleicon.png')} style={styles.profileImage} />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Find Your</Text>
        <Text style={[styles.title, styles.boldText]}>Workout Class</Text>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#B0B0B0"
      />

      {/* Today's Activity */}
      <View style={styles.activityCard}>
        <Text style={styles.activityTitle}>Today's activity</Text>
        <Text style={styles.activityTime}>8.00 AM - 1.30 PM</Text>
        <Image source={require('./assets/Foot.png')} style={styles.activityImage} />
      </View>

      {/* Recommendation Classes */}
      <View style={styles.recommendationHeader}>
        <Text style={styles.recommendationTitle}>Recommendation Class</Text>
        <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
      </View>

      <FlatList
        data={recommendationClasses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.classCard}>
            <Image source={require('./assets/yogo.png')} style={styles.classImage} />
            <View style={styles.classInfo}>
              <Text style={styles.classTitle}>{item.title}</Text>
              <Text style={styles.classInstructor}>{item.instructor}</Text>
            </View>
            <TouchableOpacity>
              <Image source={require('./assets/heartIcon.png')} style={styles.heartIcon} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Image source={require('./assets/home-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCameraPress}>
          <Image source={require('./assets/ios-camera-6.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./assets/notifcation-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./assets/settings-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Registration Successful! Please Sign In.");
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        alert(`Registration failed: ${error.message}`);
      });
  };

  return (
    <View style={styles.registerContainer}>
      <Image
        source={require('./assets/Bilog.png')} // Replace with the correct image for the circles
        style={styles.circles}
      />
      <Text style={styles.registerTitle}>Welcome to SmartFit!</Text>
      <Text style={styles.registerDescription}>Let's help you meet up your goals!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.signInText}
          onPress={() => navigation.navigate('SignIn')}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
};

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userName = email.split('@')[0];
        alert("Sign In Successful!");
        navigation.navigate('WorkoutHomepage', { userName });
      })
      .catch((error) => {
        alert(`Sign In failed: ${error.message}`);
      });
  };

  return (
    <View style={styles.registerContainer}>
      <Image
        source={require('./assets/Bilog.png')} // Replace with the correct image for the circles
        style={styles.circles}
      />
      <Text style={styles.registerTitle}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.forgotPassword}>Forgot Password</Text>
      <TouchableOpacity style={styles.registerButton} onPress={handleSignIn}>
        <Text style={styles.registerButtonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text
          style={styles.signInText}
          onPress={() => navigation.navigate('Register')}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="WorkoutHomepage" component={WorkoutHomepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  homeDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#69BFFF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  workoutContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  activityCard: {
    backgroundColor: '#E6F7FF',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  activityTime: {
    fontSize: 14,
    color: '#555',
  },
  activityImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#87CEFA',
  },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  classImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  classInfo: {
    flex: 1,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  classInstructor: {
    fontSize: 14,
    color: '#777',
  },
  heartIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E6E6E6',
  },
  navIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  registerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  circles: {
    position: 'absolute',
    top: 10,
    width: 150,
    height: 150,
    opacity: 0.1,
  },
  registerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  registerDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#69BFFF',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#555',
  },
  signInText: {
    color: '#69BFFF',
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#69BFFF',
    fontWeight: '600',
    marginVertical: 10,
  },
});
