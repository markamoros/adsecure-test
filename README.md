<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a>
    <img src="https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/she3wanxaq73r28jpcff" alt="logo" width="300">
  </a>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This is my technical test for AdSecure.

### Built With

[![Node][Nodejs.org]][Nodejs-url]

### Exercise 1:

Task: Implement a utility function that accepts an array of objects and returns a deep copy of
the input array. The input objects may contain nested objects, arrays, or primitive data types.
Use TypeScript to ensure the function is type-safe.

Resolution:

The exercise implementation can be found under ./src/utils/data.utils.ts

### Exercise 2:

Task: Design a schema for a DynamoDB table that stores metadata about web pages crawled
by our solution. The schema should support efficient querying for a given URL, date range, or a
specific attribute (e.g., page title or word count). Provide examples of how to insert and query
data using the AWS SDK for JavaScript.

A document with an overview of the problem can be found under ./documentation/exercise2.pdf.
The document provides the design for the DynamoDB table. Example queries can be found in the exercise 3 implementation.

### Exercise 3:

Task: Design a GraphQL schema for the web page metadata stored in the DynamoDB table.
Implement a GraphQL server in TypeScript using AWS AppSync or any other preferred library
that exposes the schema, allowing clients to fetch data using custom queries and mutations.
Provide example queries and mutations for typical use cases.
<br>
<br>
A document with an overview of the problem can be found under ./documentation/exercise3.pdf.
The document provides the design of the GraphQL schema. Example queries can be found under ./example-queries.graphql

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Marc Amorós - mark.amoros@gmail.com

Project Link: [https://github.com/markamoros/adsecure-test](https://github.com/markamoros/adsecure-test)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Nodejs.org]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Nodejs-url]: https://nodejs.org
[Express.com]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com

