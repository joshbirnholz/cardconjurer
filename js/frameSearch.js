frameSearch = (str) => {
	if (frameNames.has(str)) loadScript("/js/frames/pack" + frameNames.get(str) + ".js");
}

//Thank you to w3schools for providing the following quick-and-easy autocomplete code :)
//(some modifications made)

autocomplete(document.getElementById("frameSearch"));

function autocomplete(inp) {
	var currentFocus;
	inp.addEventListener("input", function(e) {
		const arr = Array.from(frameNames.keys());
		var a, b, i, val = this.value;
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		for (i = 0; i < arr.length; i++) {
			if (arr[i].toUpperCase().includes(val.toUpperCase())) {
				b = document.createElement("DIV");
				b.setAttribute("class", "input")
				b.innerHTML = arr[i];
				b.addEventListener("click", function(e) {
					inp.value = this.textContent;
					frameSearch(inp.value);
              		closeAllLists();
          		});
				a.appendChild(b);
			}
		}
	});
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
        	currentFocus++;
        	addActive(x);
      	} else if (e.keyCode == 38) {
        	currentFocus--;
        	addActive(x);
    	} else if (e.keyCode == 13) {
    		e.preventDefault();
    		if (currentFocus > -1) {
    			if (x) x[currentFocus].click();
    		}
    	} else if (e.keyCode == 27) {
    		closeAllLists();
    	}
	});
	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
    	var x = document.getElementsByClassName("autocomplete-items");
    	for (var i = 0; i < x.length; i++) {
    		if (elmnt != x[i] && elmnt != inp) {
    			x[i].parentNode.removeChild(x[i]);
    		}
	    }
	}
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}
