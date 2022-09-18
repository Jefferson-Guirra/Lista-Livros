import * as C from './styles/Error'
type Props = {
  error: string
}



const ErrorText = ({ error }: Props) => {
  return(
    <C.errorText>
      {error}
    </C.errorText>
  )
}

export default ErrorText
