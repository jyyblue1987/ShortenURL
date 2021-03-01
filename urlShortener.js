
const Shortener = require("@studiohyperdrive/shortener");

class URLShortener {
    constructor (originalURL) {
        this.originalURL = originalURL;
        this.clickCount = 0;
    }

	// Returns Short URL
    shorten() {
        // TODO parse out protocol from this.originalURL, then use that as the target below
        let protocol = 'http';

        const shortener = new Shortener({
            target: `${protocol}://localhost:3000`,
            length: 6,
            alphabet: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        });
        
        return shortener.shorten(this.originalURL).target;
    }

	// Returns Expanded URL
    expand() {
    }

	// Updates Click count
    updateClickCount() {
    }
}


module.exports = URLShortener;
