
const Shortener = require("@studiohyperdrive/shortener");
//add node module
var url = require('url');

class URLShortener {
    constructor (originalURL) {
        this.originalURL = originalURL;
        this.clickCount = 0;
    }

	// Returns Short URL
    shorten() {
        // TODO parse out protocol from this.originalURL, then use that as the target below
        const myURL = new URL(this.originalURL);
        let protocol = myURL.protocol;

        const shortener = new Shortener({
            target: `${protocol}//localhost:3000`,
            length: 6,
            alphabet: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        });
        
        return shortener.shorten(this.originalURL).target;
    }

	// Returns Expanded URL
    expand() {
        const myURL = new URL(this.originalURL);
        let protocol = myURL.protocol;
    }

	// Updates Click count
    updateClickCount() {
    }
}


module.exports = URLShortener;
