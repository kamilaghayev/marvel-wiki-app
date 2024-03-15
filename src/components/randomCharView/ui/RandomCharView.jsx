
const RandomCharView = ({character}) => {
    const {name, description, thumbnail, homepage, wiki} = character;
    const notFoundImage ='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const cssImage = {"objectFit" : thumbnail=== notFoundImage ? "contain" : "cover"}

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={`random character is ${name}`} style={cssImage} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomCharView