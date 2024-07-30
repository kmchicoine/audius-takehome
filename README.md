## Running Project

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Functionality
To search tracks: type in search box.

To select a genre: use the dropdown menu.

To sort by favorited tracks: check the checkbox.

To favorite track: click the heart under the displayed track information in the player header.

## Notes/Future Work
I used the open-source library ```reaact-list-player``` ([https://github.com/bouzidanas/react-list-player/]) for the player layout and playlist functionality. It can be installed as follows if necessary:
```bash
npm install react-list-player
```

Favorited tracks do not persist when a new genre is selected, due to retreiving a new set of trending tracks with the specified genre.

I attempted to get audio files working, but it was taking longer than reasonable for the estimated time limit. I left the skeleton of the idea commented out in the code.

Let me know if you have questions/problems running the code! 


