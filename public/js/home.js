//Home needs to navigate to posts using their id and the '/viewpost' route
const postButtonHandler = async (event) =>{
    event.preventDefault();

    const id = $(event.target).attr('id');

    document.location.replace('/viewpost/'+id)
}


$('.btn').on('click', postButtonHandler)