import { useState } from 'react'
import {BsSearch} from 'react-icons/bs'


const SearchBar = ({searchItems}) => {
    const [value, setValue] = useState('')

    const onSubmit = evt => {
        evt.preventDefault()
        searchItems(value)
    }
    return (
        <form onSubmit={onSubmit} className="search flex-fill d-flex align-items-center">
            <div className="input-group">
                <input
                    className="form-control rounded-end pe-5 border-success"
                    type="text"
                    placeholder="جستجوی فست فود ..."
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                {/* top-50 translate-middle-y used for middle a content in a box */}
                <BsSearch className='position-absolute top-50 translate-middle-y text-muted me-3' />
            </div>
        </form>
    )
}


export default SearchBar