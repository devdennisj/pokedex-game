import { Toaster as ProtoToaster } from 'react-hot-toast';

function Toaster() {
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
