
const Shortener = require("@studiohyperdrive/shortener");
//add node module
var url = require('url');

class URLShortener {    
    constructor (originalURL) {
        this.protocol = this.protocol;
        this.originalURL = originalURL;
        this.shortURL = '';
        this.clickCount = 0;

        url = new URL(this.originalURL);
        this.protocol = url.protocol;
        this.domain = this.domain;
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
        
        this.shortURL = shortener.shorten(this.originalURL).target;        

        return this.shortURL;
    }

	// Returns Expanded URL
    expand() {
        return this.originalURL;
    }

	// Updates Click count
    updateClickCount() {
        this.clickCount++;
    }
}


module.exports = URLShortener;
