import toast from 'react-hot-toast';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
    email: '',
    password: '',
    accessToken: localStorage.getItem('accessToken'),
    isVerified: false,
    isVerifyCodeResetPassword: false,
    isReset: false,
    isLogined: false,
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'REGISTER_SUCCESS': {
            return {
                ...state,
                email: payload,
            };
        }
        case 'REGISTER_FAIL': {
            toast.error('Nieprawidłowe dane!');
            return {
                ...state,
            };
        }
        case 'VERIFY_EMAIL_SUCCESS': {
            return {
                ...state,
                isVerified: payload,
            };
        }
        case 'VERIFY_EMAIL_FAIL': {
            toast.error('Nieprawidłowy kod!');
            return {
                ...state,
            };
        }
        case 'VERIFY_CODE_RESET_PASSWORD_SUCCESS': {
            return {
                ...state,
                isVerifyCodeResetPassword: payload,
            };
        }
        case 'VERIFY_CODE_RESET_PASSWORD_FAIL': {
            toast.error('Nieprawidłowy kod!');
            return {
                ...state,
            };
        }
        case 'RESET_PASSWORD_SUCCESS': {
            return {
                ...state,
                isReset: payload,
            };
        }
        case 'RESET_PASSWORD_FAIL': {
            toast.error('Nieprawidłowe hasło!');
            return {
                ...state,
            };
        }
        case 'CHANGE_PASSWORD_SUCCESS': {
            toast.success('Hasło zmienione pomyślnie!');
            return {
                ...state,
            };
        }
        case 'CHANGE_PASSWORD_FAIL': {
            toast.error('Aktualne hasło jest niepoprawne!');
            return {
                ...state,
            };
        }
        case 'FORGOT_PASSWORD_SUCCESS': {
            return {
                ...state,
                email: payload,
            };
        }
        case 'FORGOT_PASSWORD_FAIL': {
            toast.error('Adres email nie istnieje!');
            return {
                ...state,
            };
        }
        case 'LOGIN_SUCCESS': {
            localStorage.setItem('user', JSON.stringify(payload.user));
            localStorage.setItem('accessToken', payload.accessToken);
            return {
                ...state,
                user: payload.user,
                accessToken: payload.accessToken,
                isLogined: true,
            };
        }
        case 'LOGIN_FAIL': {
            toast.error('Konto nie istnieje!');
            return {
                ...state,
            };
        }
        case 'GET_USER_INFO_SUCCESS': {
            localStorage.setItem('user', JSON.stringify(payload.user));
            return {
                ...state,
                user: payload.user,
            };
        }
        case 'GET_USER_INFO_FAIL': {
            return {
                ...state,
            };
        }
        case 'UPDATE_PROFILE_SUCCESS': {
            toast.success('Aktualizacja przeprowadzona pomyślnie!');
            localStorage.setItem('user', JSON.stringify(payload.user));
            return {
                ...state,
                user: payload.user,
            };
        }
        case 'UPDATE_PROFILE_FAIL': {
            toast.error('Aktualizacja nie powiodła się!');
            return {
                ...state,
            };
        }
        case 'LOGOUT': {
            localStorage.clear();
            return {
                ...state,
                user: null,
                accessToken: null,
                isLogined: false,
            };
        }
        default:
            return state;
    }
};

export default authReducer;