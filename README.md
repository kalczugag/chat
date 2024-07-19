# Chat App

Welcome to the Chat App repository! This application is a real-time chat platform designed to facilitate seamless communication between users. It's built with scalability, security, and user-friendliness in mind, making it ideal for both personal and professional use.

## Features

- **Real-time Messaging**: Send and receive messages instantly with our real-time messaging system.
- **User Authentication**: Secure user login and registration using modern authentication protocols.
- **Private and Group Chats**: Engage in one-on-one conversations or create group chats with multiple participants.

## Technology Stack

- **Frontend**: React.js for a responsive and dynamic user interface.
- **Backend**: Node.js and Express for a robust and scalable server-side architecture.
- **Database**: MongoDB for efficient data storage and retrieval.
- **WebSockets**: Socket.io for real-time communication.
- **Authentication**: Google OAuth 2.0 for secure user authentication.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/kalczugag/chat
    cd chat
    ```

2. **Install backend dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `dev.ts` file in the config directory and add the following:
    ```env
    export default {
        mongoURI: "your-mongodb-uri",
        secretKey: "your-secret-key",
        cookieKey: "your-cookie-key",
    };
    ```

4. **Start the application**:
    ```sh
    npm run dev
    ```

5. **Access the application**:
    Open your browser and go to `http://localhost:3000`

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```sh
    git checkout -b origin/main
    ```
3. **Make your changes and commit them**:
    ```sh
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```sh
    git push origin main
    ```
5. **Open a pull request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact us at [kalczugag@gmail.com](mailto:kalczugag@gmail.com).

---

Thank you for using Chat App! We hope it enhances your communication experience. Happy chatting!
