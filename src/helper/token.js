export const TOKEN_KEY = "@mp-token"
export const idUserLoggedIn = "userId"
export const UserLoggedIn = "user"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) != null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const saveIdLocal = (id) => localStorage.setItem(idUserLoggedIn, id);
export const getSavedIdLocal = () => localStorage.getItem(idUserLoggedIn);
export const leaveIdLocal = () => localStorage.removeItem(idUserLoggedIn);

export const saveUserLocal = (id) => localStorage.setItem(UserLoggedIn, id);
export const getSavedUserLocal = () => localStorage.getItem(UserLoggedIn);
export const leaveUserLocal = () => localStorage.removeItem(UserLoggedIn);


export const loginToken = token => {
        localStorage.setItem(TOKEN_KEY, token);
};
export const logoutToken = () =>{
    localStorage.removeItem(TOKEN_KEY);
};