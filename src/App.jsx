import { useState } from 'react';
import CSVReader from 'react-csv-reader';
import './App.css';

function App() {
  const [tableCells, setTableCells] = useState(null);
  const [tableHeaders, setTableHeaders] = useState(null);

  const handleFileLoad = (data) => {
    console.log('data', data);
    const headers = data[0];
    setTableHeaders(headers);
    console.log('headers', headers);
    const cells = data.slice(1);
    console.log('cells', cells);
    setTableCells(cells);
  };

  return (
    <>
      <div>
        <h1>Parser</h1>
        <CSVReader onFileLoaded={handleFileLoad} />

        {tableHeaders && tableCells && (
          <div>
            <h2>The data</h2>
            <table>
              <tr>
                {tableHeaders.map((heading) => (
                  <th>{heading}</th>
                ))}
              </tr>
              {tableCells.map((row) => (
                <tr>
                  {row.map((cell) => (<td>{cell}</td>))}
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
