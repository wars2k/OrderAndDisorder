
function getVerse(book,chapter,verse) {
	//remove any already present permanent highlights
	var highlightClass = document.getElementsByClassName("permanentHighlight");
	while (highlightClass.length)
		highlightClass[0].classList.remove("permanentHighlight");
	//add a permanent highlight to the line just clicked
	highlight = event.target
	highlight.classList.add("permanentHighlight");
	//get the requested translation
	var select = document.getElementById("translationSelection");
	var value = select.value;
	//fetch the data
	test = verse;
    fetch('https://bible-api.com/' + book + '+' + chapter + '?translation=' + value)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
    displayBible(data);

  })
    .catch(function() {
    // catch any errors
  });
}
function displayBible(data) {
	var select = document.getElementById("referenceSelection");
	var value = select.value;
	if(value == "chapter") {
		displayChapter(data);
	} else if (value == "verse") {
		displayVerse(data);
	} else {
		displayVerseInContext(data);
	}
}
function displayChapter(data) {
	bibleBox = document.getElementById("referencePageContent");
	bibleBox.innerHTML = "";
	title = document.createElement("div");
	title.innerHTML = "<b>" + data.reference + ":" + test + "</b>";
	bibleBox.append(title);

	for (i = 0; i < data.verses.length; i++) {
		number = i+1;
		verse = document.createElement("div")
		bibleBox.append(verse)
		if (number == test) {
			 verse.classList.add("permanentHighlight");
		}
		verse.innerHTML = number + ": " + data.verses[i].text;
	}
}

function displayVerse(data) {
	bibleBox = document.getElementById("referencePageContent");
	bibleBox.innerHTML = "";
	test = test - 1;
	verse = document.createElement("div");
	bibleBox.append(verse);
	verse.innerHTML = data.verses[test].text + " <b>(" + data.reference + ":" + test + ")</b>";


}



function LineNumbers() {
	var wrapper = document.getElementsByClassName("lineWrapper")
	for (i=0; i < wrapper.length; i++) {
		counter = document.createElement("div");
		counter.classList.add("lineNumber");
		counter.innerText = i+1;
		wrapper[i].prepend(counter);
	}
}
//this function only needs to run once when the page opens. 
LineNumbers()

function changeLineNumbers() {
	var select = document.getElementById("lineNumbers");
	var value = select.value;
	console.log(value);
	if (value == "true") {
		const lineNumbers = document.querySelectorAll('.lineNumber');
		lineNumbers.forEach(lineNumber => {
			lineNumber.style.display = "inline";
		});
	} else {
		const lineNumbers = document.querySelectorAll('.lineNumber');
		lineNumbers.forEach(lineNumber => {
			lineNumber.style.display = "none";
		});
	}
}
