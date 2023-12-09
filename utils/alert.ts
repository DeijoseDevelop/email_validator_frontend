import Swal, { SweetAlertOptions } from "sweetalert2";

export class SwalAlert {
    public static showAlert({icon, title}: SweetAlertOptions) {
        Swal.fire({
            icon: icon,
            title: title,
            showConfirmButton: false,
            // timer: 4000,
        });
    }

    public static showOptionAlert({icon, title, preConfirm}: SweetAlertOptions) {
        Swal.fire({
            icon: icon,
            title: title,
            confirmButtonText: "Continuar",
            preConfirm: preConfirm,
        });
    }
}
