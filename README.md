# Data Abstraction Layer with MongoDB

This project implements a Data Abstraction Layer (DAL) for managing user accounts using MongoDB and Node.js. The system provides a RESTful API for operations such as creating accounts, logging in, updating balances, and retrieving user data.

## Project Structure

- `dal.js`: Contains database access layer functions to interact with MongoDB.
- `index.js`: Sets up an Express server and defines routes for handling API requests.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mabass2110/Data-Abstraction-Layer-with-mongodb/
    cd Data-Abstraction-Layer-with-mongodb
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your MongoDB URI and port:

    ```env
    MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>
    PORT=3000
    ```

    Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your MongoDB credentials and database information.

## Usage

1. **Start the server:**

    ```bash
    npm start
    ```

    The server will start on the port specified in the `.env` file (default: 3000).

2. **API Endpoints:**

    - **Create User Account**
      - `POST /account/create`
      - Request body: `{ "name": "string", "email": "string", "password": "string" }`
      - Response: Created user object or error message

    - **Login User**
      - `GET /account/login/:email/:password`
      - Response: User object if login is successful, or error message

    - **Find User Account**
      - `GET /account/find/:email`
      - Response: Array of user objects matching the email

    - **Find One User Account**
      - `GET /account/findOne/:email`
      - Response: Single user object matching the email

    - **Update User Balance**
      - `GET /account/update/:email/:amount`
      - Query parameter `amount` is the value to deposit (positive) or withdraw (negative)
      - Response: Updated user object or error message

    - **Get All Accounts**
      - `GET /account/all`
      - Response: Array of all user accounts

## Error Handling

- **400 Bad Request:** Returned for validation errors or if a user already exists.
- **404 Not Found:** Returned if a user is not found during login or retrieval.
- **500 Internal Server Error:** Returned for server-side errors.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact Helder Mabasso(email:hfmabasso@gmail.com).

