import  {useEffect,useState,useCallback} from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as C from './styles/AddBooks'
import { MaterialIcons } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useFocusEffect } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Image, Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Error from '../components/Error'
import { Data } from '../pages/main'



type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'AddBooks'>


const AddBooks: React.FC<HomeScreenProps> = (props) => {
  const params = props.route.params !== undefined ? props.route.params : null
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [photo,setPhoto] = useState<string | undefined>('')
  const [error,setError] = useState(false)
  const [books,setBooks] = useState<Data[]>([])


    const [fontsLoaded] = useFonts({
      'Kalam': require('../assets/fonts/Kalam-Regular.ttf')
    })


  const pickImage = async () => {
    const galleryStatus =
    await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(galleryStatus.status === 'granted'){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setPhoto(result.uri)
    }
  }
  }
  
  useEffect(()=>{
    if(params?.book.title){
      setTitle(params?.book.title)
      setDescription(params?.book.description ? params?.book.description : '')
      setPhoto(params?.book.photo ? params.book.photo : '')
    }   
  },[params?.book.title])
  
  useFocusEffect(
    useCallback(()=>{
       AsyncStorage.getItem('books').then(bookList => {
         if (bookList) {
           setBooks(JSON.parse(bookList || '{}'))
         }
       })
    },[])
  )

  const isValid = ()=>{
    if(title) return true
    else return false
  }

  const handleError = () => {
      if (isValid()) {
        setError(false)
      } else {
        setError(true)
      }
    }
  const onSave = async ()=>{
    if (isValid() && title !== undefined) {
      const data: Data = {
        id: books.length.toString(),
        title,
        description,
        read: false,
        photo
      }
      await AsyncStorage.setItem('books', JSON.stringify([...books, data]))
      props.navigation.push('Main')
    }
  }

  const onAtt = async ()=>{
    if(isValid()){
     const bookAtt = books.map(item=>{
      if(item.id === params?.book.id){
        item.title = title 
        item.description = description
        item.id = params.book.id
        item.photo = params.book.photo
        return item
      }
      return item
     })

      await AsyncStorage.setItem('books', JSON.stringify(bookAtt))
      props.navigation.push('Main')
    }
  }
  


  return (
    <C.container>
      {params?.book.id ? (
        <C.Title style={{ fontFamily: 'Kalam' }}>{params?.book.title}</C.Title>
      ) : (
        <C.Title style={{ fontFamily: 'Kalam' }}>Adicionar Livro</C.Title>
      )}

      {photo && (
        <C.imgContainer>
          <Image source={{ uri: photo }} style={{ width: 300, height: 200 }} />
        </C.imgContainer>
      )}
      <C.photoIcon onPress={pickImage}>
        <MaterialIcons name="photo-camera" size={30} color="white" />
      </C.photoIcon>

      <C.TitleBox>
        <C.inputTitle
          style={{ fontFamily: 'Kalam' }}
          value={title}
          placeholder="título..."
          onChangeText={(newTitle: string) => setTitle(newTitle)}
          placeholderTextColor="gray"
          cursorColor="#3498db"
          onBlur={handleError}
          error={error && title === ''}
        />
        {error && title === '' && <Error error={'campo obrigatório.'} />}
      </C.TitleBox>

      <C.inputDescricao
        style={{ fontFamily: 'Kalam' }}
        value={description}
        placeholder="descrição..."
        onChangeText={(newDescricao: string) => setDescription(newDescricao)}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="gray"
        cursorColor="#3498db"
      />

      {!params && (
        <C.saveButton validate={isValid()} onPress={onSave}>
          <C.saveButtonText style={{ fontFamily: 'Kalam' }}>
            Cadastrar
          </C.saveButtonText>
        </C.saveButton>
      )}

      {params && (
        <C.saveButton validate={isValid()} onPress={onAtt}>
          <C.saveButtonText
            style={{ fontFamily: 'Kalam' }}
            validate={isValid()}
            onPress={onSave}
          >
            Atualizar
          </C.saveButtonText>
        </C.saveButton>
      )}

      <C.cancelButton
        onPress={() => {
          props.navigation.push('Main')
        }}
      >
        <C.cancelButtonText style={{ fontFamily: 'Kalam' }}>
          cancelar
        </C.cancelButtonText>
      </C.cancelButton>
    </C.container>
  )
}

export default AddBooks
