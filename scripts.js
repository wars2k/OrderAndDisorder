
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
	var translation = select.value;
	//fetch the data
	test = verse;
    fetch('https://bible-api.com/' + book + '+' + chapter + '?translation=' + translation)
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
	if (test == '') {
		alert = document.createElement("div");
		alert.innerHTML = "<b>Error: " + data.reference + "</b>"
		alertText = document.createElement("div"); 
		alertText.innerHTML = "This line references an entire chapter. Switch to 'Verse and Chapter' in the drop-down box above to see the entire reference."
		bibleBox.append(alert);
		bibleBox.append(alertText);
	}
	else if (test.includes("-")) {

		verseArray = test.split("-");
		passageLength = parseInt(verseArray[1]) - parseInt(verseArray[0]);

		firstVerse = parseInt(verseArray[0]);

		for (i=0; i <= passageLength; i++) {
				verse = document.createElement("div");
				bibleBox.append(verse);
				
				correctedFirstVerse = firstVerse - 1; //since first verse is 0 in the JSON array.
				lineNumber = correctedFirstVerse + i;
				verse.innerHTML = lineNumber + ": " + data.verses[correctedFirstVerse + i].text;
		}
		citation = document.createElement("div");
		bibleBox.append(citation);
		citation.innerHTML = "<b>(" + data.reference + ":" + test + ")</b>";

	} else {
	test2 = test - 1;
	verse = document.createElement("div");
	bibleBox.append(verse);
	verse.innerHTML = data.verses[test2].text + " <b>(" + data.reference + ":" + test + ")</b>";

}
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

function toggleSearchWindow() {
	searchWindow = document.getElementById("searchPage");
	if (searchWindow.style.display == "block") {
		searchWindow.style.display = "none";
	} else {
		searchWindow.style.display = "block";
	}
}

function bookSearch() {
	var select = document.getElementById("books");
	var value = select.value;
	className = value;
	linesWithReference = document.getElementsByClassName("reference");
	for (i = 0; i < linesWithReference.length; i++) {
		linesWithReference[i].style.background = "";
	}
	linesWithReference = document.getElementsByClassName(className);
	for (i = 0; i < linesWithReference.length; i++) {
		linesWithReference[i].style.background = "#f6aa90";
		
	}
	bookCount = document.getElementById("bookCount");
	bookCount.innerText = "Count: " + linesWithReference.length;


}
