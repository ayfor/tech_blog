const cardClickHandler = async (event) => {
    event.preventDefault();

    let cardId = $(event.target).parent().attr('id');

    let url = "/posts/" + cardId;

    document.location.replace(url);
}

$('.title').on('click', cardClickHandler)

console.log("Dashboard code has loaded.");