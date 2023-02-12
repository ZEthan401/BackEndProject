//Ethan Zhong period 7-8 Even
// Programs communicate with each other through their route requests.
//I learned how to use postman
//This project could be further extended by adding more features to imrpove accessibility and adding more songs.


//=========== SETTING THINGS UP ==========
const express = require('express');
const app = express();
app.use(express.json());

const songs = [
    {
        id: 1, 
        genre: 'Jazz', 
        name: 'Summertime', 
        year: 1991, 
        month: 5
    },
    {
        id: 2, 
        genre: 'Blues', 
        name: 'Smokestack Lightning', 
        year: 2022, 
        month: 4
    },
    {
        id: 3, 
        genre: 'Rap', 
        name: 'Passionfruit', 
        year: 2017, 
        month: 3
    },
    {
        id: 4, 
        genre: 'Classical', 
        name: 'Mazeppa', 
        year: 1853, 
        month: 4
    },
    {
        id: 5, 
        genre: 'Hip Hop', 
        name: 'Orange Soda', 
        year: 2019, 
        month: 7
    },
    {
        id: 6, 
        genre: 'Pop', 
        name: 'Single Ladies', 
        year: 2008, 
        month: 10
    },
    {
        id: 7, 
        genre: 'Rock', 
        name: 'Comfortably Numb', 
        year: 1994, 
        month: 10
    },
    {
        id: 8, 
        genre: 'Electronic', 
        name: 'Faded', 
        year: 2015, 
        month: 12
    },
];

//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get('/', (req, res) => 
{
    res.send('By Ethan Zhong');
});
app.get('/songs', (req, res) => 
{
    res.send(songs);
});
app.get('/songs/:id', (req, res) => 
{
    const song = songs.find(c => c.id === parseInt(req.params.id));
    if (!song) 
    {
        res.status(404).send("Song(s) with the ID does not exist");
    } else 
    {
        res.send(song);
    }
});
app.get('/songs/year/:year', (req, res) => 
{
    let Year = [];
    for (let song of songs) 
    {
        if (song.year == req.params.year) 
        {
            Year.push(song);
        }
    }
    if (Year.length !== 0)
    {
        res.send(Year);
    } else 
    {
        res.status(404).send("Songs with this year are not found");
    }
});
app.get('/songs/month/:month', (req, res) => 
{
    let Months = [];
    for (let song of songs) 
    {
        if (song.month == req.params.month) 
        {
            Months.push(song);
        }
    }
    if (Months.length !== 0) 
    {
        res.send(Months);
    } else 
    {
        res.status(404).send("Song with this month are not found");
    }
});



//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/songs', (req, res) => 
{
    let song;
    if (req.body.genre.length && req.body.name.length) 
    {
        song = 
        {
            id: songs.length + 1,
            genre: req.body.genre,
            name: req.body.name,
            year: req.body.year,
            month: req.body.month
        }
        songs.push(song);
        res.send(songs);
    } 
    else 
    {
        res.send('Genre, name, year, & month are needed with at least 3 characters');
    }
});


//=========== ROUTES FOR HTTP PUT REQUESTS ==========
app.put('/songs/:id', (req, res) => 
{
    const FirstSong = songs.find(c => c.id === parseInt(req.params.id));
    let newSong;
    if (req.body.genre.length && req.body.name.length) 
    {
        newSong = 
        {
            id: FirstSong.id,
            genre: req.body.genre,
            name: req.body.name,
            year: req.body.year,
            month: req.body.month
        }
        songs[FirstSong.id - 1] = newSong;
        res.send(newSong);
    } else 
    {
        res.send('Genre, name, year, & month are needed with at least 3 characters');
    }
});

app.listen(3000, () => 
{
    console.log('Listening on port 3000 ...');
})


//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/songs', (req, res) => 
{
    FirstSong = songs[req.body.id - 1];
    index = songs.indexOf(FirstSong);
    if (FirstSong !== undefined) 
    {
        songs.splice(index, 1);
        res.send(FirstSong);
    } else 
    {
        res.status(404).send("Song with this ID does not exist");
    }
})
