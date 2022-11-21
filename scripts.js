
function getVerse(book,chapter,verse) {
	var highlightClass = document.getElementsByClassName("permanentHighlight");
	while (highlightClass.length)
		highlightClass[0].classList.remove("permanentHighlight");
	highlight = event.target
	highlight.classList.add("permanentHighlight");
	console.log(event.target);
	test = verse;
    fetch('https://bible-api.com/' + book + '+' + chapter + '?translation=kjv')
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    displayChapter(data);

  })
    .catch(function() {
    // catch any errors
  });
}

function displayChapter(data) {
	bibleBox = document.getElementById("bibleBox");
	bibleBox.innerHTML = "";
	title = document.getElementById("titleRight");
	title.innerHTML = "<h1>" + data.reference + ":" + test + "</h1>";

	for (i = 0; i < data.verses.length; i++) {
		number = i+1;
		verse = document.createElement("div")
		bibleBox.append(verse)
		if (number == test) {
			 verse.classList.add("exactReference");
		}
		verse.innerHTML = number + ": " + data.verses[i].text;
	}
}

