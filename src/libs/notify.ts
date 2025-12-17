
import Swal from 'sweetalert2';

export const showError = async (title: string, text: string) => {
  await Swal.fire({ title, text, imageWidth: 75, imageHeight: 75, confirmButtonText: 'OK' });
};
