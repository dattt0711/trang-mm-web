import axios from 'axios';

const API_KEY = "T34K8XK9Ji146jwgoXNLvaOAiubXYlkv";


// Hàm lấy thông tin location
export const getLocationKey = async () => {
    try {
        const url = "http://dataservice.accuweather.com/locations/v1/cities/ipaddress";
        const result = await axios.get(url, {
            params: {
                q: "118.70.170.88", // ip address
                apikey: API_KEY,
            },
        });
        return result;
    } catch (error) {
        return error;
    }
}

// Hàm lấy thông tin location thông qua search
export const getLocationKeyBySearch = async (search) => {
    try {
        const url = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
        const result = await axios.get(url, {
            params: {
                q: search, // search
                apikey: API_KEY,
            },
        });
        return result;
    } catch (error) {
        return error;
    }
}

// hàm lấy dự báo thời tiết 5 ngày
export const getFiveDaysForecasts = async (locationKey) => {
    try {
        const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`;
        const result = await axios.get(url, {
            params: {
                apikey: API_KEY,
                details: true,
            },
        });
        return result;
    } catch (error) {
        return error;
    }
}

// Lấy dự báo thời tiết 1 ngày
export const getDailyForecasts = async (locationKey) => {
    try {
        const url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}`;
        const result = await axios.get(url, {
            params: {
                apikey: API_KEY,
                details: true,
            },
        });
        return result;
    } catch (error) {
        return error;
    }
}


// Hàm đổi độ C ra độ F
export const convertToF = (min, max = 0) => {
    try {
        return Math.round((+min + +max) / 2 * 1.8 + 32, 0);
    } catch (error) {
        return error;
    }
}


// Hàm đổi từ độ F ra C
export const convertToCelsius = (min, max = 0) => {
    try {
        return Math.round(((+min + +max) / 2 - 32) / 1.8, 0);
    } catch (error) {
        return error;
    }
}