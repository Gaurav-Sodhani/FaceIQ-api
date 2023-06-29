import fetch from 'node-fetch';

const handleApiCall = (req, res) =>{
    const {input} = req.body;
    const PAT = process.env.PAT_CLARIFAI;
    const USER_ID = process.env.USER_ID_CLARIFAI;       
    const APP_ID = process.env.APP_ID_CLARIFAI;
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    // const IMAGE_URL = input;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(() => res.status(400).json('Unable to get clarifai api!!'))
}

const handleImage = (req, res, db)=>{
    const { id } = req.body;
    db('users')
    .where('id', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('Unable to get entries!!'))
}

export {
    handleApiCall,
    handleImage
}