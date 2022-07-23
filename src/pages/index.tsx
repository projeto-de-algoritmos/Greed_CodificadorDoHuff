import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from 'reactstrap'
import EncodedText from '../components/EncodedText'
import EncodedLetter from '../components/EncodedWord'
import HashTable from '../components/HashTable'
import { HuffmanTree, main } from '../Huffman'
const Home: NextPage = () => {
  const [arvore, setArvore] = useState<HuffmanTree>()
  const [fileContent, setFileContent] = useState<any>()
  const [search, setSearch] = useState("")
  const [encodedLetters, setEncodedLetters] = useState<any>([])

  function getFileContent(aFile?: File) {
    const reader = new FileReader()
    if (aFile) {
      reader.readAsText(aFile)
      reader.onloadend = (e: any) => {
        const content = e.target.result
        setFileContent(content)
      }
    }
  }
  function encodeText() {
    const arvore = main(fileContent)
    setSearch("")
    setArvore(arvore)
  }

  useEffect(() => {
    if (search !== undefined && arvore) {
      const letters = search.split('')
      setEncodedLetters(letters.map(aWord => arvore.map[aWord]))
    }
  }, [search, arvore])

  return (
    <>
      <Head>
        <title>Codificador do Huff</title>
        <meta name="description" content="codificador do huff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <h1 style={{textAlign: 'center', margin: '0 0 2em 0'}}>Codificador do Huff</h1>
          <Card>
            <CardHeader>
              <h5>Insira um arquivo para que possa ser codificado</h5>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label>Insira um arquivo </Label>
                <Input type='file' onChange={(e) => getFileContent(e.target.files ? e.target.files[0]: undefined)} />
              </FormGroup>
              <div style={{textAlign: 'end'}}>
                <Button color='primary' onClick={encodeText}>Codificar</Button>
              </div>
            </CardBody>
          </Card>
          
          {
            !!arvore ? (
            <>
            <h2 style={{margin: '1em 0 0.2em 0'}}>Conteúdo</h2>
            <Card style={{margin: '0.8em 0'}}>
              <CardBody>
                <Row>
                  <Col>
                  <FormGroup>
                    <Label>Insira uma palavra frase ou texto para ela ser codificada da mesma forma que seu texto</Label>
                    <Input type='textarea' onChange={(e) => setSearch(e.target.value)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  
                  <Col>
                  <h5>Seu texto codificado</h5>
                  {
                    encodedLetters.map((letter: string, index: number) => <EncodedLetter highlight letter={letter} key={index} />)
                  }
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Row>
              <Col lg={3}>
                    <HashTable hashTable={arvore.map}/>
              </Col>
              <Col>
                <EncodedText encodedText={arvore.binaryString} hashTable={arvore.map} search={search}/>
              </Col>
            </Row>
            </>
            
            ) : 
            (<>
              <h2 style={{margin: '2em 0'}}>Conteúdo</h2>
              <h5>o conteúdo e o texto do seu arquivo será mostrado aqui</h5>
            </>)
          }
        </Container>
        
      </main>
    </>
  )
}

export default Home
