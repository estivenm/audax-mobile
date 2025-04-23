import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as GoogleFonts from '@expo-google-fonts/poppins';
import useLoadFonts from '@/hooks/useFonts';

// Mocks
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock('@expo-google-fonts/poppins', () => {
  return {
    useFonts: jest.fn(),
    Poppins_400Regular: 'mock-font-400',
    Poppins_500Medium: 'mock-font-500',
    Poppins_700Bold: 'mock-font-700',
  };
});

function HookTestComponent() {
  const { loaded, error } = useLoadFonts();
  return <Text>{loaded ? 'Loaded' : error ? 'Error' : 'Loading'}</Text>;
}

describe('useLoadFonts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('llama preventAutoHideAsync al montarse', () => {
    (GoogleFonts.useFonts as jest.Mock).mockReturnValue([false, null]);
    render(<HookTestComponent />);
    expect(SplashScreen.preventAutoHideAsync).toHaveBeenCalled();
  });

  it('oculta splash screen cuando las fuentes están cargadas', () => {
    (GoogleFonts.useFonts as jest.Mock).mockReturnValue([true, null]);
    const { getByText } = render(<HookTestComponent />);
    expect(getByText('Loaded')).toBeTruthy();
    expect(SplashScreen.hideAsync).toHaveBeenCalled();
  });

  it('oculta splash screen si hay error en carga de fuentes', () => {
    (GoogleFonts.useFonts as jest.Mock).mockReturnValue([false, new Error('fallo')]);
    const { getByText } = render(<HookTestComponent />);
    expect(getByText('Error')).toBeTruthy();
    expect(SplashScreen.hideAsync).toHaveBeenCalled();
  });

  it('no oculta splash si fuentes aún cargan sin error', () => {
    (GoogleFonts.useFonts as jest.Mock).mockReturnValue([false, null]);
    const { getByText } = render(<HookTestComponent />);
    expect(getByText('Loading')).toBeTruthy();
    expect(SplashScreen.hideAsync).not.toHaveBeenCalled();
  });
});
