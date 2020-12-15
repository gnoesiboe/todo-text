import { toast } from 'react-toastify';

export function notifyError(message: string): void {
    toast.error(message);
}

export function notifyInfo(message: string): void {
    toast.info(message);
}

export function notifySuccess(message: string): void {
    toast.success(message);
}
