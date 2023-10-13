import Swal, { SweetAlertIcon } from "sweetalert2"

export const ToastComponent = (
  icon: SweetAlertIcon,
  title: string,
  text?: string,
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon,
    title,
    text
  })
}

export const MessageComponent = (
  icon: SweetAlertIcon,
  title: string,
  text?: string
) => {
  Swal.fire(
    {
      title,
      text,
      icon
    }
  )
}

export const MessageConfirmation = (
  question: string,
  confirmationText: string,
  cancellationText: string,
  onConfirm: () => void
) => {

  Swal.fire({
    title: question,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmationText,
    cancelButtonText: cancellationText,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm()
    }
  })
}