import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'onboarding' | 'dashboard'>('splash');
  const [userData, setUserData] = useState<any>(null);

  // Load Poppins font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {currentScreen === 'splash' && (
          <SplashScreen onComplete={() => setCurrentScreen('onboarding')} />
        )}
        
        {currentScreen === 'onboarding' && (
          <OnboardingFlow 
            onComplete={(data) => {
              setUserData(data);
              setCurrentScreen('dashboard');
            }} 
          />
        )}
        
        {currentScreen === 'dashboard' && (
          <Dashboard userData={userData} />
        )}
      </div>
    </ThemeProvider>
  );
}