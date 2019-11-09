# Webux Query

This module is a wrapper around mongo-qp to parse and validate query parameters.

## Installation

```bash
npm i --save @studiowebux/query
```

## Usage

you have to define two arrays,

- blacklist : this one contains the blacklisted words
- select : this one contains the default projection

for more details about the structure of the request or the way to configure this, refer to the official documentation of mongo-qp:  
https://www.npmjs.com/package/mongo-qp

```
const express = require("express");
const app = express();

const webuxQuery = require("../index");

const blacklist = ["password", "birthday"];
const select = ["username", "email"];

app.get("/", webuxQuery(blacklist, select), (req, res, next) => {
  res.status(200).json({
    query: req.query,
    status: "Valid !"
  });
});

app.use("*", (error, req, res, next) => {
  return res.status(error.code).json({ error: error });
});

app.listen(1337);

```

### Tests

should return 400  
`http://127.0.0.1:1337?filter=password eq 'abc' OR somenumber gt 1&limit=10&sort=name asc,created desc&projection=_id,name,somenumber`
`http://127.0.0.1:1337?filter=password eq 'abc' OR birthday gt 1&limit=10&sort=name asc,created desc&projection=_id,name,somenumber`
`http://127.0.0.1:1337?filter=username eq 'abc' OR birthday gt 1&limit=10&sort=name asc,created desc&projection=_id,name,somenumber`

should return 200  
`http://127.0.0.1:1337?filter=username eq 'abc' OR other gt 1&limit=10&sort=name asc,created desc&projection=_id,name,somenumber`

the projection should be the default one:  
`http://127.0.0.1:1337?filter=username eq 'abc' OR other gt 1&limit=10&sort=name asc,created desc`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

SEE LICENSE IN license.txt

https://www.npmjs.com/package/mongo-qp
