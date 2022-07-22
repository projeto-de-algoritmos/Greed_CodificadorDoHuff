import { useEffect, useState } from "react";
import lodash from 'lodash'
import { Card, CardBody, CardHeader } from "reactstrap";
import EncodedLetter from "./EncodedWord";

interface IEncodedLetter {
  letter: string,
  highlight: boolean
} 

export default function EncodedText({encodedText, hashTable}: {encodedText: string, hashTable: any, search: string}) {
  const [encodedLetters, setEncodedLetters] = useState<IEncodedLetter[]>([])
  useEffect(() => {
    if (encodedText) {
      const list = encodedText.split(" ")
      setEncodedLetters(list.map(encodedWord => ({
        letter: encodedWord,
        highlight: false
      })));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[hashTable, encodedText])

  return (
  <Card>
    <CardHeader><h5>Texto codificado do arquivo</h5></CardHeader>
    <CardBody>
      {
        encodedLetters.map((letter, index) => (<EncodedLetter key={index} letter={letter.letter} highlight={letter.highlight} />))
      }
    </CardBody>
  </Card>
  )
}