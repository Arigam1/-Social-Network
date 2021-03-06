import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "349d41a8-bede-4423-bc93-d8a5409e9908",
  },
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        // ЭТО ПРОМИС! ! ! ! сокращает путь) чтоб компонента не брала лишнюю инфу
        return response.data;
      });
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },

  follow(userId) {
    return instance.post(`follow/${userId}`);
  },

  getProfile(userId) {
    console.warn('Obsolete method. Please profileAPI object.')
    return profileAPI.getProfile(userId);
  }
};


export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId);
  },

  getStatus(userId) {
    return instance.get(`profile/status/` + userId)
  },

  updateStatus(status) {
    return instance.put(`profile/status`, { status: status })
  },

  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);

    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  saveProfile(profile) {
    return instance.put(`profile`, profile)
  }
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`);
  },

  login(email, password, rememberMe = false, captcha = null) {
    return instance.post('auth/login', { email, password, rememberMe, captcha })
  },

  logout() {
    return instance.delete('auth/login')
  }
};

export const securityAPI = {
  captchaURL() {
    return instance.get(`security/get-captcha-url`);
  }
}