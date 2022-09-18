import { useState, useEffect, useCallback } from 'react'
import {
  Image,
  FlatList
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as C from './styles/main'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AntDesign } from '@expo/vector-icons' 
import { FontAwesome5 } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { RootStackParamList } from '../../App'
import AsyncStorage from '@react-native-async-storage/async-storage'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>
export type Data = {
  id: string
  title: string
  description?: string
  read: boolean
  photo?: string
}
const Main: React.FC<HomeScreenProps> = props => {
  const [books, setBooks] = useState<Data[]>([])

  const [fontsLoaded] = useFonts({
    'Kalam' : require('../assets/fonts/Kalam-Regular.ttf')
  })

  


  useFocusEffect(
    useCallback(()=>{
    /*AsyncStorage.removeItem('books')*/
    AsyncStorage.getItem('books').then(data => {
      const booksStorage = JSON.parse(data || '{}')
      setBooks([...booksStorage])
    })

    },[])
  )

  const handleItem =  (bookId:string)=>{
    const book = books.find(item=> item.id === bookId)
    if(book){
    props.navigation.navigate('AddBooks', {
      book
    })
    }
  }
  const onExclude = async (id:string)=>{
    const newBooks = books.filter(item=>item.id !== id)
    setBooks(newBooks)
    await AsyncStorage.setItem('books', JSON.stringify(newBooks))


  }
  const handleRead = async (read:boolean,id:string)=>{
    const newBooks = books.map(item=>{
      if(item.id === id){
        item.read = !read ? true : false
        return item
      }
      return item
    })
    setBooks(newBooks)
    await AsyncStorage.setItem('books', JSON.stringify(newBooks))

  }
  if(fontsLoaded)
  return (
    <C.Container>
      <C.ToollBox>
        <C.Title style={{fontFamily:'Kalam'}}>
          Lista de Leitura
        </C.Title>
        <C.AddButton onPress={() => props.navigation.push('AddBooks')}>
          <Ionicons name="add" size={30} color="#ffffff" />
        </C.AddButton>
      </C.ToollBox>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <>
            <C.itemContainer>
              <C.itemButton onPress={() => handleRead(item.read, item.id)}>
                <C.itemText style={{fontFamily:'Kalam'}} read={item.read} >{item.title}</C.itemText>
              </C.itemButton>
              <C.editButton onPress={() => handleItem(item.id)}>
                <AntDesign name="edit" size={25} color="#2ecc71" />
              </C.editButton>
              <C.excludeButton onPress={() => onExclude(item.id)}>
                <FontAwesome5 name="trash-alt" size={25} color="#e74c3c" />
              </C.excludeButton>
            </C.itemContainer>
          </>
        )}
      />
    </C.Container>
  )
  else return null
}

export default Main
