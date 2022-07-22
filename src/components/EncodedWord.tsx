import { useEffect, useState } from "react";
import { Badge } from "reactstrap";

export default function EncodedLetter({letter, highlight}: {letter: string, highlight: boolean}) {
  const [warning, setWarning] = useState<boolean>()

  useEffect(() => {
    if (highlight) {
      setWarning(highlight)
    }
  }, [highlight])
  return (
    <Badge style={{margin: '0 0.2em'}} color={warning ? "warning" : 'primary'}>
      {letter}
    </Badge>
  )
}