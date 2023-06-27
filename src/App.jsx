import { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { array, object, string, number } from 'yup';
import './App.css';

function App() {
  const [tableCells, setTableCells] = useState(null);
  const [tableHeaders, setTableHeaders] = useState(null);

  const mappingSchema = object({
    department_id: number().required().positive().integer(),
    market: string().required(),
    provider_id: number().required().positive().integer(),
    npi: number().required().positive().integer(),
    reason_id: number().required().positive().integer(),
    appointment_type_ids: array().of(number().positive().integer()).required(),
    book_as_appointment_type_id: number().required().positive().integer(),
  });

  const bulkSchema = array().of(mappingSchema);

  const arrayify = (string) => {
    const formattedString = string.replace('{', '').replace('}', '');
    const list = formattedString.split(' ,');

    const listOfNumbers = list.map((entry) => Number(entry));

    return listOfNumbers;
  };

  const objectify = (data) =>
    data.map((row) => ({
      department_id: Number(row[0]),
      market: row[1],
      provider_id: Number(row[2]),
      npi: Number(row[3]),
      reason_id: Number(row[4]),
      appointment_type_ids: arrayify(row[5]),
      book_as_appointment_type_id: Number(row[6]),
    }));

  const handleFileLoad = async (data) => {
    const headers = data[0];
    setTableHeaders(headers);
    console.log('data', data);

    const cells = data.slice(1);
    const objectifiedCells = objectify(cells);
    console.log('objectifiedCells', objectifiedCells);

    const validatedCells = await bulkSchema.validate(['feelings']);

    console.log('validatedCells', validatedCells);
    setTableCells(objectifiedCells);
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
                  {Object.values(row).map((cell) => (
                    <td>{cell}</td>
                  ))}
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
