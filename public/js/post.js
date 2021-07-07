const handlePostClick = async (event) => {
    event.preventDefault();

    const name = $('#post-title').val();
    const description = $('#post-description').val();

    console.log(name);
    console.log(description);

    let id = $('#post-id').text();

    if(id !== " "){
        let apiRoute = '/api/posts/'+id;
        //Must update the existing post
        console.log('Updating post...');
        const response = await fetch(apiRoute, {
            method: 'POST',
            body: JSON.stringify({name,description}),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(response.json());        
    }else{
        //Create a new post
        console.log('Creating post...');

        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({name,description}),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(response.json());
    }

    document.location.replace('/dashboard');
}



$('.post-form').on('submit', handlePostClick);