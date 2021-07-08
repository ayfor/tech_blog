const handleCommentClick = async (event) => {
    event.preventDefault();

    const description = $('#comment-description').val();

    console.log(description);

    let id = $(event.target).find('.btn').attr('id');
    
    //Create a new comment
    const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({description,id}),
        headers: { 'Content-Type': 'application/json' },
    })
    

    document.location.replace('/viewpost/'+id);
}



$('.comment-form').on('submit', handleCommentClick);