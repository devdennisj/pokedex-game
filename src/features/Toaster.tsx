import { useEffect } from 'react';
import toast, {
  Toaster as ProtoToaster,
  useToasterStore,
} from 'react-hot-toast';

const TOAST_LIMIT = 5;

function Toaster() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <ProtoToaster
      position='top-right'
      containerStyle={{
        top: 55,
      }}
      reverseOrder={true}
      toastOptions={{
        duration: 1500,
      }}
    />
  );
}

export default Toaster;
