import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScrollView } from 'react-native'
import * as C from './styles'
import Main from './src/pages/main'
import AddBooks from './src/pages/AddBooks'
import {Data} from './src/pages/main'

export type RootStackParamList = {
  Main: undefined
  AddBooks: { book:Data } | undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
export default function App() {
  return (
      <C.Container>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="AddBooks" component={AddBooks} />
          </Stack.Navigator>
        </NavigationContainer>
      </C.Container>
  )
}
