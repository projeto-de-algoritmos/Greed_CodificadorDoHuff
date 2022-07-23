import { useState } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";


export default function HashTable({hashTable}: {hashTable: any}) {
  const [tableKeys] = useState(Object.keys(hashTable))
  return (
    <Card>
      <CardHeader>
        <h5>
        Tabela dos códigos
        </h5>
      </CardHeader>
      <CardBody>
        <Table>
          <thead>
            <tr className="table-light">
              <th>Simbolo</th>
              <th>Valor Codificado</th>
            </tr>
          </thead>
          <tbody>
          { tableKeys.map((tableKey: string, index: number) => {
          return (
            <tr key={index} className="table-info">
              <td>{tableKey}</td>
              <td>{hashTable[tableKey]}</td>
            </tr>
          )
        })}
          </tbody>
        </Table>
        
      </CardBody>
    </Card>
  )
}