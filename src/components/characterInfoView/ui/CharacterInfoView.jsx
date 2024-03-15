

const CharacterInfoView = ({char}) => {
    const {name, thumbnail, description, homepage, wiki, comics} = char;
    const comicsIsLarge = comics.length > 10 ? comics.slice(0, 10) : comics;

    const notFoundImage ='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const cssImage = {"objectFit" : thumbnail=== notFoundImage ? "contain" : "cover"}

    const renderComics = (comics) => {
        return comics.map((item, i) => {
            return (
                <li key={i} className="char__comics-item">
                    {item.name}
                </li>
            )
        })
    }
    return (
        <div className="char__info">
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={cssImage}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                    {comics.length ? renderComics(comicsIsLarge) : "There's not comics"}  
            </ul>
        </div>
    )
}

export default CharacterInfoView