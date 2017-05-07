// Get the form and wait for submission
document.getElementById('enterForm').addEventListener('submit', saveBookmark);

// Save bookmark function
function saveBookmark(e)
{
    e.preventDefault(); // Prevent default form submission
    var siteName = document.getElementById('siteName').value; // Get the site name
    var siteUrl = document.getElementById('siteUrl').value; // Get the site url

    if (!siteName) {
        alert("Please enter the name of the website");
    }else if(!siteUrl){
        alert("Please enter the url of the website");
    }else{

        // Regular expression for url
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (!siteUrl.match(regex)) {
            alert("Please enter a correct url format (https://www.example.com)");
            return false;
        }

        // Make an object outta values from forms
        var bookmark = {
            name: siteName,
            url: siteUrl
        }

        /* CRD with localStorage
        localStorage.setItem('test', 'heheheee');
        localStorage.getItem('test');
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
        */

        if (localStorage.getItem('bookmarks')===null) {
            // Initialize empty array of bookmarks
            var bookmarks = [];
            bookmarks.push(bookmark); // Add the object created above to bookmarks array
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // Take json array and
        }else{
            var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // Fetch bookmarks from localstorage as string and parse into json
            bookmarks.push(bookmark); // Add bookmark (the object) to array
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // Add again the string version
        }

        // Clean the form
        document.getElementById('enterForm').reset();
    }

    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks()
{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // Get the JSON array
    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>' + name +
                                      ' <a class="btn btn-success" target="_blank" href="'+url+'">'+
                                      ' Visit </a>'+
                                      ' <a class="btn btn-danger" href="#" onclick="deleteBookmark(\'' + url + '\')">'+
                                      ' Delete </a>'+
                                      '</h3>'+
                                      '</div>'
    }
}


// Delete Bookmark
function deleteBookmark(url)
{
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(1, i); // Remove from array
        }
    }
    // Reset
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Refetch
    fetchBookmarks();
}
