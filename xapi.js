
// URL parametrelerini almak için
let queryParams = new URLSearchParams(window.location.search);
let lrsEndpoint = queryParams.get('endpoint');
let auth = queryParams.get('auth');
let actor = JSON.parse(queryParams.get('actor'));

function sendXAPIData(verb, statement) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", lrsEndpoint + "statements", true);
    xhr.setRequestHeader("Authorization", auth);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Experience-API-Version", "1.0.3");

    let xAPIData = {
        actor: {
            name: actor.name[0],
            mbox: actor.mbox[0]
        },
        verb: {
            id: `http://adlnet.gov/expapi/verbs/${verb}`,
            display: { "en-US": verb }
        },
        object: {
            id: document.location.href,
            definition: {
                name: { "en-US": "Video" },
                description: { "en-US": statement }
            }
        }
    };

    xhr.send(JSON.stringify(xAPIData));
}

function getLastVideoTime() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        // Video'nun tanımlayıcı URL'si
        let videoUrl = encodeURIComponent(window.location.href);

        // Aktör bilgilerini JSON formatında oluştur ve encode et
        let actorMail = JSON.stringify({
            mbox: `${actor.mbox[0]}`
        });

        // XAPI endpoint URL'si
        let url = `${lrsEndpoint}statements?agent=${actorMail}&activity=${videoUrl}`;

        xhr.open("GET", url, true);
        xhr.setRequestHeader("Authorization", auth);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Experience-API-Version", "1.0.3");

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = JSON.parse(xhr.responseText);
                if (response.statements && response.statements.length > 0) {
                    let lastStatement = response.statements[0];
                    if (lastStatement.verb.id === "http://adlnet.gov/expapi/verbs/paused") {
                        let match = lastStatement.object.definition.description['en-US'].match(/Video (\d+) saniyede durdu./);
                        resolve(match[1]);

                    }
                    else {
                        resolve(0);

                    }
                }
            }
            resolve(0);

        };

        xhr.send();
    });
}