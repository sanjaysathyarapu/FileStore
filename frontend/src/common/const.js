export const API_URL = process.env.REACT_APP_USE_PROD_BACKEND && process.env.REACT_APP_USE_PROD_BACKEND == "true" 
                        ?  "https://24tly05lg0.execute-api.us-west-1.amazonaws.com/Prod/api"
                        : "http://localhost:5000/api";
                        // : "http://54.177.43.182:5000/api";
                        // : "http://18.144.18.201:5000/api";