import { Stack, useRouter } from 'expo-router';
import {
  useFonts,
  FrankRuhlLibre_800ExtraBold,
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_900Black,
} from '@expo-google-fonts/frank-ruhl-libre';
import { useColorScheme, TouchableOpacity, Appearance, Platform } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Logo from '@/assets/images/nyt-logo.svg';
import { Colors } from '@/constants/Colors';
import { useAsyncStorageBoolean } from '@/utils/storage';

// Load the fonts first before hiding the splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [dark] = useAsyncStorageBoolean('dark-mode', false);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Appearance.setColorScheme(dark ? 'dark' : 'light');
    }
  }, [dark]);

  let [fontsLoaded] = useFonts({
    FrankRuhlLibre_800ExtraBold,
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="game"
              options={{
                headerBackTitle: 'Wordle',
                headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
                headerBackTitleStyle: {
                  fontFamily: 'FrankRuhlLibre_800ExtraBold',
                  fontSize: 26,
                },
                title: '',
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                presentation: 'modal',
                headerTitle: () => <Logo width={150} height={40} />,
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={26} color={Colors.light.gray} />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="end"
              options={{
                presentation: 'fullScreenModal',
                title: '',
                headerShadowVisible: false,
                // headerStyle: {
                //   backgroundColor: '#fff',
                // },
                // headerTransparent: true,
                // headerShown: false,
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
