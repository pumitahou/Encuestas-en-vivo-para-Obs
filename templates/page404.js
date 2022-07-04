module.exports = class Page404{
    constructor(url="null",error="404"){
        this.url = url;
        this.error = error
    }
    render(){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../../css/error404.css">
            <title>${this.error}</title>
        </head>
        <body>
            <header>
            <div class="container">
                <div>
                    <a href="#home">Home</a>
                </div>
                <div>
                <a href="#news">News</a>    
                </div>
            </div>
            </header>
            <main>
                <p><span>${this.url}</span> dont exist</p>
            </main>
        </body>
        </html>
        `
    }

}