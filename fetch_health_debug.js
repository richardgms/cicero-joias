
const http = require('http');

http.get('http://localhost:3000/api/admin/health', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('------- DIAGNOSTIC REPORT -------');
            console.log('Portfolio Query Status:', json.checks.portfolioQuery?.status);
            console.log('Portfolio Query Error:', json.checks.portfolioQuery?.error);

            console.log('Database Status:', json.checks.database?.status);
            console.log('Database Error:', json.checks.database?.error);
            console.log('---------------------------------');
        } catch (e) {
            console.log('Failed to parse JSON');
            console.log(data.substring(0, 500));
        }
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
