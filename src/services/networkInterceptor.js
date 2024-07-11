import axios from "axios";

const setupInterceptors = (onRequestComplete) => {
  const requests = [];

  axios.interceptors.request.use((request) => {
    request.metadata = { startTime: new Date(), initiator: "user" };
    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      const { config } = response;
      config.metadata.endTime = new Date();
      const duration = config.metadata.endTime - config.metadata.startTime;
      const size = response.data.status.content_length;

      requests.push({
        name: config.url,
        status: response.status,
        type: response.headers["content-type"] || "N/A",
        size: isNaN(size) ? "N/A" : size,
        time: isNaN(duration) ? "N/A" : duration,
        initiator: config.metadata.initiator,
        response,
      });

      onRequestComplete([...requests]);
      return response;
    },
    (error) => {
      const { config } = error;
      config.metadata.endTime = new Date();
      const duration = config.metadata.endTime - config.metadata.startTime;
      const size =
        error.response && error.response.headers["content-length"]
          ? parseInt(error.response.headers["content-length"], 10)
          : "N/A";

      requests.push({
        name: config.url,
        status: error.response ? error.response.status : "Network Error",
        type: error.response ? error.response.headers["content-type"] : "N/A",
        size: isNaN(size) ? "N/A" : size,
        time: isNaN(duration) ? "N/A" : duration,
        initiator: config.metadata.initiator,
        response: error.response,
      });

      onRequestComplete([...requests]);
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
