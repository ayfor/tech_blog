const cardClickHandler = async (event) => {
    event.preventDefault();

    let cardId = $(event.target).parent().attr('id');

    let url = "/posts/" + cardId;

    document.location.replace(url);
}

const newPostButtonHandler = async (event) => {
    event.preventDefault();
    
    document.location.replace('/newpost');
}

$('.title').on('click', cardClickHandler);

$('#newPostButton').on('click', newPostButtonHandler);

console.log("Dashboard code has loaded.");