import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Lang.css";
import Searchbar from "./Searchbar";

const ProgrammingLang = () => {
  const [name, setName] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [develolopedBy, setDevelolopedBy] = useState("");
  const [description, setDescription] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [dummayData, setDummayData] = useState("");
  const [filterYear, setFilterYear] = useState("Filter By Year");
  const [searchByInput, setSearchByInput] = useState('')
  let id = Math.floor(Math.random() * 1000) + 1;


  // get data

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get("http://localhost:5000/language");
      setJsonData(response.data);
    };
    getData();
  }, [dummayData]);

  // add data

  const addData = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/language", {
      id: id,
      name: name,
      establishedYear: establishedYear,
      develolopedBy: develolopedBy,
      description: description,
    });
    setDummayData(response.data);
    setName("");
    setDescription("");
    setDevelolopedBy("");
    setEstablishedYear("");
  };

  // filter by Column


  const filterChangeValue = (filterValue) => {
    setFilterYear(filterValue);
    console.log(filterValue);
  };

  const inputSearch = (value) => {
    setSearchByInput(value)
  }

  const render = jsonData.filter(val => {
    if (searchByInput === '') {
      return val
  }
  else if(
     filterYear == 'Name' && val.name.toLowerCase().includes(searchByInput.toLowerCase()) 
  ){
      return val
  }
  else if(
     filterYear == 'Year' && val.establishedYear.toString().includes(searchByInput.toString())
  ){
      return val
  }
  else if (
     filterYear == 'develolopedBy' && val.develolopedBy.toLowerCase().includes(searchByInput.toLowerCase())
  ){
      return val
  }
  else if (
     filterYear == 'description' && val.description.toLowerCase().includes(searchByInput.toLowerCase())
  ) {
      return val
  }
  }).map(item => (
    <tr key={item.id}>
    <td>{item.name}</td>
    <td>{item.establishedYear}</td>
    <td>{item.develolopedBy}</td>
    <td>{item.description}</td>
  </tr>
  ))


  return (
    <div className="ProgrammingLang">
      <form className="form" onSubmit={addData}>
        <label htmlFor="lang">Enter language name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          name="lang"
          required
        />

        <label htmlFor="establishedYear">Enter establishedYear</label>
        <input
          onChange={(e) => setEstablishedYear(e.target.value)}
          value={establishedYear}
          type="text"
          name="establishedYear"
          required
        />

        <label htmlFor="develolopedBy">Enter develolopedBy</label>
        <input
          onChange={(e) => setDevelolopedBy(e.target.value)}
          type="text"
          value={develolopedBy}
          name="develolopedBy"
          required
        />

        <label htmlFor="description">Description</label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          value={description}
          name="description"
          required
        />

        <button className="btn btn-primary" type="submit">
          Add New Data
        </button>
      </form>

      <div className="listLanguage">
        <Searchbar
          selected={filterYear}
          filterChangeValue={filterChangeValue}
          inputSearch={inputSearch}
        />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Year</th>
              <th scope="col">Developed By</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody key={id}>
          {render}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgrammingLang;
