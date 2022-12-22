
(function () {
    if(!window.sha1) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-sha1/0.6.0/sha1.min.js';
        script.integrity = 'sha512-q6FuE4ifzTygTD/ug8CFnAFXl+i1zXqBWP6flRAuSWjaXrFu4Cznk8Xr+VrWMyi7fSatbssh7ufobAetvXK8Pg==';
        script.crossOrigin = 'anonymous';
        script.referrerPolicy = 'no-referrer';
        document.head.appendChild(script);
    }
})();
async function verifyCompromisedPassword(password, callback) {
    if(!window.sha1) {
        console.log('SHA1 library was not loaded. Please check the library. This script [verify compromised password] will not work.');
        return;
    }
    if(sha1('password') != '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8') {
        console.log('SHA1 library is not working. Please check the library. This script [verify compromised password] will not work.');
        return;
    }

    const hash = sha1(password).toUpperCase();
    const hashSearch = hash.substring(0, 5);

    fetch(`https://api.pwnedpasswords.com/range/${hashSearch}`)
        .then(response => response.text())
        .then(response => response.split(/\r?\n/))
        .then(response => {
            for(let hashDataFromServer of response) {
                const [hashSuffixFromServer, timesDataset] = hashDataFromServer.trim().split(':');
                if (hash == `${hashSearch}${hashSuffixFromServer}`) {
                    callback(parseInt(timesDataset));
                    return;
                }
            }
            callback(0);
            return;
        });
}