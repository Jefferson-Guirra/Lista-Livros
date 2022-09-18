import styled from "styled-components/native";

type ItemText ={
  read:boolean
}

export const Container = styled.View`
  background-color: #121212;
  flex:1;
  width:333px;
`

export const ToollBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`

export const Title = styled.Text`
    flex: 1;
    font-size: 30px;
    color:#3498db;
`
export const AddButton = styled.TouchableOpacity`
  background-color: #3498db;
  align-items: center;
  justify-content: center;
  border-radius: 45px;
  width: 45px;
  height: 45px;
`

export const itemContainer = styled.View`
  margin-bottom: 30px;
  flex-direction: row;
  align-items: center;
  border-radius: 2px;
  border-top-color: #95a5a6;
  border-bottom-color: #95a5a6;
  border-right-color: #95a5a6;
  border-width: 1px;

`

export const imgContainer = styled.View`
  align-self:flex-start;
  overflow: hidden;
  border-radius: 2px;
`

export const contentItem = styled.View`
  flex-direction: column;
  flex: 1;
  align-self: flex-start;
  border-left-color: #95a5a6;
  border-width: 1px;
`
export const contentTitle = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-color: #95a5a6;
  padding-left: 10px;
  border-width: 1px;
`

export const description = styled.View`
  flex: 1;
  padding:10px;
`


export const itemButton = styled.TouchableOpacity`
 flex:1;
  
`
export const itemText = styled.Text(
  (props: ItemText) => `
  font-size: 20px;
  color: #eee;
  text-decoration: ${props.read ? 'line-through' : 'none'}
`
)

export const editButton = styled.TouchableOpacity`
  margin-right: 40px;
`

export const excludeButton = styled.TouchableOpacity`
  margin-right: 12px;
`

