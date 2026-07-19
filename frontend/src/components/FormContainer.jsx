const FormContainer = ({ children }) => {
  return (
    <div className='form-page'>
      <div className='form-card'>{children}</div>
    </div>
  );
};

export default FormContainer;
