# React-Network

A React-based network monitoring application that mimics the network panel of Chrome DevTools. This application captures and displays network requests, including their headers, payload, response, initiator, and timing.

## Features

- **Request Monitoring**: Captures all network requests made by the application.
- **Detailed Information**: Displays detailed information for each request including URL, status, type, initiator, size, and timing.
- **Filtering**: Filter requests by type (e.g., image, script, xhr).
- **Details Panel**: View detailed information including headers, payload, response, initiator, and timing for each request.
- **Service Worker**: Utilizes a service worker to intercept and log network requests.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/DevnandanRaj/react-network.git
    cd react-network
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm start
    ```

4. **Open your browser**:
    - Visit `https://sunny-monstera-33c7f9.netlify.app/` to see the application in action.

## Project Structure

- `src/`: Contains the main source code for the application.
  - `components/`: Reusable React components.
    - `NetworkTable.js`: Displays the list of network requests.
    - `DetailsPanel.js`: Shows detailed information about a selected request.
  - `interceptors/`: Axios interceptor to capture network requests.
    - `setupInterceptors.js`: Sets up request and response interceptors.
  - `serviceWorker.js`: Service worker script to intercept network requests.
