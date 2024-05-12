let api_url: string, upload_url: string, image_url: string, socket_url: string;

if (process.env.NODE_ENV === "production") {
    api_url = "https://yingzh-kunifanse-graphql.azurewebsites.net/graphql";
    upload_url = "https://yingzh-kunifanse-upload.azurewebsites.net/api/v1/upload";
    image_url = "https://yingzh-kunifanse-upload.azurewebsites.net/uploads";
    socket_url = "https://yingzh-kunifanse-socket.azurewebsites.net/api/v1";
} else {
    api_url = "http://localhost:3000/graphql";
    upload_url = "http://localhost:3002/api/v1/upload";
    image_url = "http://localhost:3002/uploads";
    socket_url = "http://localhost:3003/api/v1";
}

export { api_url, upload_url, image_url, socket_url };
