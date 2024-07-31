import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://tzyotrvtawyiirbsktlz.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6eW90cnZ0YXd5aWlyYnNrdGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyNjQ0ODksImV4cCI6MjAzNTg0MDQ4OX0.IFecEUN-JLbAnXGGINwQXZ2schBxTLoB3UnAXtlKO4o';

const supabase = createClient(url, key,{
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })

export default supabase;
