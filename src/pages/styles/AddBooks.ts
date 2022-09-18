import styled from 'styled-components/native'

type SaveButton = {
  validate:boolean
}

type Title = {
  error:boolean
}



export const container = styled.View`
  flex: 1;
  background-color: #121212;
`

export const TitleBox = styled.View`
 margin-bottom:20px;
`

export const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  color: white;
`

export const inputTitle = styled.TextInput(
  (props: Title) => `
  background-color: transparent;
  color:#ffff;
  border-bottom-color:${props.error ? 'red' : '#2980b9'};
  border-bottom-width: 3px;
  padding:0px;
  text-align-vertical:top;
`
)

export const inputDescricao = styled(inputTitle)`
  margin-bottom: 30px;
`

export const imgContainer = styled.View`
  margin-top: 30px;
  width: 305px;
  align-self:center;
  background-color: #eee;
  padding-vertical: 2px;
  padding-horizontal: 2px;
  border-radius: 2px;
`

export const photoIcon = styled.TouchableOpacity`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  background-color: #2980b9;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-vertical: 30px;
`

export const saveButton = styled.TouchableOpacity(
  (props:SaveButton)=>`
  background-color: #2980b9;
  align-self: center;
  border-radius: 8px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  margin-bottom: 20px;
  opacity:${props.validate ? '1' : '0.5'}
`
)

export const excludeButton = styled.TouchableOpacity`
  padding-vertical: 10px;
  padding-horizontal: 20px;
  align-self:flex-end;
`

export const saveButtonText = styled.Text`
  font-size:18px;
  text-align: center;
  color: white;
  
`

export const cancelButton = styled.TouchableOpacity`
  align-self:center;
`

export const cancelButtonText = styled.Text`
  color:gray;
`

