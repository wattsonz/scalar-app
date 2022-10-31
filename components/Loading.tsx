import styled from 'styled-components'

type Props = {}

const Div = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #FFCA47;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export default function Loading({ }: Props) {
  return (
    <Div>
      <div className='loader'></div>
    </Div>
  )
}