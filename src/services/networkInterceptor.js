import axios from "axios";

const setupInterceptors = (onRequestComplete) => {
  const requests = [];

  // Create a new instance of axios
  const instance = axios.create();

  // Request interceptor
  instance.interceptors.request.use((request) => {
    request.metadata = { startTime: new Date(), initiator: "user" };
    return request;
  });

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      const { config } = response;
      config.metadata.endTime = new Date();
      const duration = config.metadata.endTime - config.metadata.startTime;

      // Determine the type of request (img, css, js, xhr, etc.)
      const requestType = getRequestType(config.url);

      // Parse content length header
      const contentLengthHeader = response.headers["content-length"];
      const size = contentLengthHeader ? parseInt(contentLengthHeader, 10) : "N/A";

      requests.push({
        id: Date.now(), // Use a unique identifier for requests
        url: config.url,
        status: response.status,
        type: requestType,
        size: isNaN(size) ? "N/A" : size,
        time: isNaN(duration) ? "N/A" : duration,
        initiator: config.metadata.initiator || "N/A",
        response,
      });

      onRequestComplete([...requests]);
      console.log("Response:", response); // Log the response here
      return response;
    },
    (error) => {
      const { config } = error;
      const duration = Date.now() - config.metadata.startTime;

      // Determine the type of request (img, css, js, xhr, etc.)
      const requestType = getRequestType(config.url);

      // Parse content length header
      const contentLengthHeader =
        error.response && error.response.headers["content-length"];
      const size = contentLengthHeader ? parseInt(contentLengthHeader, 10) : "N/A";

      requests.push({
        id: Date.now(), // Use a unique identifier for requests
        url: config.url,
        status: error.response ? error.response.status : "Network Error",
        type: requestType,
        size: isNaN(size) ? "N/A" : size,
        time: isNaN(duration) ? "N/A" : duration,
        initiator: config.metadata.initiator || "N/A",
        response: error.response,
      });

      onRequestComplete([...requests]);
      console.error("Error:", error); // Log the error here
      return Promise.reject(error);
    }
  );

  return instance;
};

function getRequestType(url) {
  const extension = url.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension)) return "image";
  if (extension === "css") return "css";
  if (extension === "js") return "script";
  return "xhr";
}

export default setupInterceptors;
