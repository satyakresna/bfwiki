const path = require('path');
const fs = require('fs');

let result = '';
const search = '</head>';
const GA_TRACKER_ID = process.env.GA_TRACKER_ID;
const str = `<link rel="preconnect" href="https://www.google-analytics.com">
<!-- Google Analytics -->
<script defer>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.defer=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', '${GA_TRACKER_ID}', 'auto');
    ga('send', 'pageview');
</script>`;

var readStream = fs.createReadStream(path.join(__dirname, 'src', 'index.html'), 'utf8');

readStream.on('data', function (chunk) {
    var index, start, end;
    index = chunk.indexOf(search);
    if (index > -1) {
        start = chunk.substr(0, index);
        end = chunk.substr(index);
        if (GA_TRACKER_ID !== undefined) {
            result += start + str + end;
        } else {
            result += chunk;
        }
    } else {
        result += chunk;
    }
}).on('end', function () {
    console.log(result);
    const writeStream = fs.createWriteStream(path.join(__dirname, 'dist', 'index.html'));
    writeStream.write(result);
})