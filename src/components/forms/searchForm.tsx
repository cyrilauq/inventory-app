import { ChangeEvent, FormEvent, useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Input from './input';
import { useStoreAuth } from '@/store/authStore';
import { useRouter } from 'next/navigation';

interface ISearchForm {
    onSubmit: (input: string) => void;
}

const SearchForm = ( props: ISearchForm ) => {
    const [value, setValue] = useState("");

    function submit() {
        if(value.length > 0) {
            props.onSubmit(value);
        }
    }

    function handleOnChange(text: string) {
        if(text.trim().length > 0 && text != value) {
            setValue(text);
        }
    }

    return(
        <div className='flex flex-row items-center'>
            <Input name='search' id='search' type='text' onChange={handleOnChange} />
            <SearchRoundedIcon onClick={submit} />
        </div>
    );
};

export default SearchForm;
