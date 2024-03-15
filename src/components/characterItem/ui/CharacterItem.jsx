
const CharacterItem = ({char, onCharSelected}) => {
    let imgStyle = {'objectFit' : 'cover'};
            
    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    return (
        <li onClick={() => onCharSelected(char.id)}  className="char__item">
            <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
            <div className="char__name">{char.name}</div>
        </li>
    )
}

export default CharacterItem