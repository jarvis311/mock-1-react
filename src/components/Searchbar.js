import React from 'react'

const Searchbar = (props) => {

  const filterChange = (e) => {
    props.filterChangeValue(e.target.value)
  }

  const searchByInput = (e) => {
    props.inputSearch(e.target.value)
  }

  return (
    <div className='d-flex' style={{ width: '60vw', flexDirection:'column',gap:'20px' }}>
      <select className="form-select" defaultValue={'SELECT THE COLUMN'} onChange={filterChange} aria-label="Default select example">
        <option value={'Filter By Year'}>SELECT THE COLUMN</option>
        <option value={'Name'} >Name</option>
        <option value={'Year'} >Year</option>
        <option value={'develolopedBy'} >develolopedBy</option>
        <option value={'description'} >Description</option>
      </select>
      <input className="form-control me-2" onChange={searchByInput} type="search" placeholder="Search" aria-label="Search" />
    </div>
  )
}

export default Searchbar