import { useState } from 'react';
import AsyncSelect from 'react-select/async';
 
export default function SelectCity() {
    const [inputValue, setValue] = useState("");

    const capitalizeWords = (str) => {
        return str
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

    const loadOptions = (inputValue, callback) => {
        let filter = {
            limit: 5,
            q: `{"שם_ישוב_לועזי": "${inputValue}"}`
        }
        fetch("https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&" +
            new URLSearchParams(filter))
            .then((response) => response.json())
            .then((data) => callback(data.result.records));
    }

    return (
        <AsyncSelect
            name="city"
            getOptionValue={(value) => capitalizeWords(value["שם_ישוב_לועזי"])}
            getOptionLabel={(value) => capitalizeWords(value["שם_ישוב_לועזי"])}
            loadOptions={loadOptions}
        />
    );
}
