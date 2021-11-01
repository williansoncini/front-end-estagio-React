import { toast } from "react-toastify";

const successToast = function (text) {
    return toast.success(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export { successToast }

const errorToast = function (text) {
    return toast.error(text, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export { errorToast }

const promisseToast = function (obj) {
    return toast.promise(obj, {
        pending: '🔄 Executando',
        success: 'success',
        error: 'error',
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export { promisseToast }

const loadingToast = function (text) {
    return toast.loading(text);
}

export { loadingToast }

const updateToast = function (id, type, text) {
    toast.update(id, {
        render: text,
        type: type,
        isLoading: false,
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
}

export { updateToast }