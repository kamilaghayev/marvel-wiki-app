import { useState } from "react"
import { Field, Formik, Form } from "formik"
import * as Yup from "yup"
import useApiMarvel from "../../../shared/api/ApiMarvel"
import ErrorMessage from "../../../shared/ui/errorMessage"
import "./searchCharForm.scss"
import { Link } from "react-router-dom"

const SearchCharForm = () => {
    const [char, setChar] = useState(null);
    const { loading, error, clearError, getCharacterFromName } = useApiMarvel();

    const onCharLoaded = (res) => {
        setChar(res)
    }

    const onRequest = (input) => {
        clearError();

        getCharacterFromName(input)
            .then(onCharLoaded)
    }
    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = char !== null && char.name ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char.name} page?</div>
                        <Link to={`/characters/${char.id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{charName: ''}}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={({charName}) => onRequest(charName)}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"
                        />
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                </Form>
            </Formik>
            {char && results}
            {errorMessage}
        </div>
    )
}

export default SearchCharForm